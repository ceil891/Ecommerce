import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private logger = new Logger('MailService');

  async sendVerification(email: string, link: string) {
    this.logger.log(`Send verification to ${email}: ${link}`);
  }

  async sendReset(email: string, link: string) {
    this.logger.log(`Send password reset to ${email}: ${link}`);
  }
}
