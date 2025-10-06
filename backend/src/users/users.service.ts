import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  userModel: any;
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(
    email: string,
    password: string,
    fullName?: string,
    role = 'customer',
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const existing = await this.userModel.findOne({ email });
    if (existing) throw new BadRequestException('Email đã tồn tại');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const passwordHash = await bcrypt.hash(password, 12);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const created = new this.userModel({ email, passwordHash, fullName, role });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return created.save();
  }

  findByEmail(email: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.userModel.findOne({ email: email.toLowerCase() });
  }

  findById(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return this.userModel.findById(id);
  }

  async saveRefreshToken(userId: string, jti: string, expiresAt: Date) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await this.userModel.updateOne(
      { _id: userId },
      { $push: { refreshTokens: { jti, expiresAt, revoked: false } } },
    );
  }

  async revokeRefreshToken(userId: string, jti: string) {
    await this.userModel.updateOne(
      { _id: userId, 'refreshTokens.jti': jti },
      { $set: { 'refreshTokens.$.revoked': true } },
    );
  }

  async isRefreshTokenValid(userId: string, jti: string) {
    const user = await this.userModel.findOne(
      { _id: userId, 'refreshTokens.jti': jti },
      { 'refreshTokens.$': 1 },
    );
    if (!user || !user.refreshTokens || user.refreshTokens.length === 0)
      return false;
    const token = user.refreshTokens[0];
    if (token.revoked) return false;
    if (new Date() > new Date(token.expiresAt)) return false;
    return true;
  }

  async removeAllRefreshTokens(userId: string) {
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { refreshTokens: [] } },
    );
  }

  async updatePassword(userId: string, newPassword: string) {
    const passwordHash = await bcrypt.hash(newPassword, 12);
    return this.userModel.updateOne(
      { _id: userId },
      { $set: { passwordHash } },
    );
  }

  async markEmailVerified(userId: string) {
    return this.userModel.updateOne(
      { _id: userId },
      { $set: { isEmailVerified: true } },
    );
  }

  async blockUser(userId: string) {
    return this.userModel.updateOne(
      { _id: userId },
      { $set: { isActive: false } },
    );
  }
}
function InjectModel(name: any): (target: typeof UsersService, propertyKey: undefined, parameterIndex: 0) => void {
    throw new Error('Function not implemented.');
}

