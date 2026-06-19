import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    const host = this.config.get('MAIL_HOST');
    const user = this.config.get('MAIL_USER');

    if (host && user) {
      this.transporter = nodemailer.createTransport({
        host,
        port: this.config.get<number>('MAIL_PORT', 587),
        secure: false,
        auth: { user, pass: this.config.get('MAIL_PASS') },
      });
    }
  }

  async sendNewLeadNotification(lead: { name: string; phone: string; email?: string; company?: string; message?: string; service?: string }) {
    if (!this.transporter) {
      this.logger.warn('Mail transporter not configured, skipping email');
      return;
    }

    try {
      await this.transporter.sendMail({
        from: this.config.get('MAIL_FROM'),
        to: this.config.get('MAIL_ADMIN'),
        subject: `[GESE] Lead mới: ${lead.name} - ${lead.phone}`,
        html: `
          <h2>Lead mới từ website GESE</h2>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
            <tr><td><strong>Họ tên</strong></td><td>${lead.name}</td></tr>
            <tr><td><strong>SĐT</strong></td><td>${lead.phone}</td></tr>
            <tr><td><strong>Email</strong></td><td>${lead.email || '-'}</td></tr>
            <tr><td><strong>Công ty</strong></td><td>${lead.company || '-'}</td></tr>
            <tr><td><strong>Dịch vụ</strong></td><td>${lead.service || '-'}</td></tr>
            <tr><td><strong>Nội dung</strong></td><td>${lead.message || '-'}</td></tr>
          </table>
        `,
      });
      this.logger.log(`Lead notification sent for ${lead.name}`);
    } catch (err) {
      this.logger.error('Failed to send lead notification', err);
    }
  }
}
