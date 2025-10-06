import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(
    email: string,
    password: string,
    fullName?: string,
    role = 'customer',
  ) {
    const user = await this.usersService.createUser(
      email,
      password,
      fullName,
      role,
    );
    const token = this.jwtService.sign(
      { sub: user._id.toString(), type: 'verify' },
      { secret: process.env.JWT_SECRET, expiresIn: '1d' },
    );
    const link = `${process.env.APP_URL}/api/auth/verify-email?token=${token}`;
    await this.mailService.sendVerification(user.email, link);
    return { id: user._id, email: user.email, role: user.role };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const bcrypt = await import('bcrypt');
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return null;
    if (!user.isActive) throw new UnauthorizedException('Tài khoản bị khóa');
    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id.toString(), role: user.role };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    const jti = uuidv4();
    const refreshToken = this.jwtService.sign(
      { sub: user._id.toString(), jti, type: 'refresh' },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d' },
    );
    const expiresAt = new Date(Date.now() + 30 * 24 * 3600 * 1000);
    await this.usersService.saveRefreshToken(user._id, jti, expiresAt);
    return {
      accessToken,
      refreshToken,
      user: { id: user._id, email: user.email, role: user.role },
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload: any = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      if (payload.type !== 'refresh') throw new UnauthorizedException();
      const userId = payload.sub;
      const jti = payload.jti;
      const ok = await this.usersService.isRefreshTokenValid(userId, jti);
      if (!ok) throw new UnauthorizedException();
      await this.usersService.revokeRefreshToken(userId, jti);
      const newJti = uuidv4();
      const newRefresh = this.jwtService.sign(
        { sub: userId, jti: newJti, type: 'refresh' },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d' },
      );
      const newExpires = new Date(Date.now() + 30 * 24 * 3600 * 1000);
      await this.usersService.saveRefreshToken(userId, newJti, newExpires);
      const user = await this.usersService.findById(userId);
      const newAccess = this.jwtService.sign(
        { sub: userId, role: user.role },
        { secret: process.env.JWT_SECRET, expiresIn: '15m' },
      );
      return { accessToken: newAccess, refreshToken: newRefresh };
    } catch (e) {
      throw new UnauthorizedException('Refresh token invalid');
    }
  }

  async logout(userId: string, refreshToken?: string) {
    if (!refreshToken) {
      await this.usersService.removeAllRefreshTokens(userId);
      return;
    }
    try {
      const payload: any = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      await this.usersService.revokeRefreshToken(payload.sub, payload.jti);
    } catch (e) {
      /* ignore */
    }
  }

  async verifyEmail(token: string) {
    try {
      const payload: any = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (payload.type !== 'verify')
        throw new BadRequestException('Invalid token');
      await this.usersService.markEmailVerified(payload.sub);
    } catch (e) {
      throw new BadRequestException('Token không hợp lệ hoặc hết hạn');
    }
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return; // don't reveal
    const token = this.jwtService.sign(
      { sub: user._id.toString(), type: 'reset' },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
    const link = `${process.env.APP_URL}/reset-password?token=${token}`;
    await this.mailService.sendReset(user.email, link);
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload: any = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (payload.type !== 'reset')
        throw new BadRequestException('Invalid token');
      await this.usersService.updatePassword(payload.sub, newPassword);
      // revoke all refresh tokens for safety
      await this.usersService.removeAllRefreshTokens(payload.sub);
    } catch (e) {
      throw new BadRequestException('Token reset không hợp lệ hoặc hết hạn');
    }
  }
}
