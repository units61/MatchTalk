import nodemailer from 'nodemailer';
import {readFileSync} from 'fs';
import {join} from 'path';
import {config} from '../config';
import {logger} from '../logger';
import {HttpError} from '../errors';

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    try {
      // SMTP configuration from environment variables
      const smtpConfig = {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
      };

      if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
        logger.warn('SMTP credentials not configured. Email service will not work.');
        return;
      }

      this.transporter = nodemailer.createTransport(smtpConfig);
      logger.info('Email service initialized');
    } catch (error) {
      logger.error('Failed to initialize email service:', error);
    }
  }

  /**
   * Load email template
   */
  private loadTemplate(templateName: string, data: Record<string, any>): string {
    try {
      const templatePath = join(__dirname, '../templates/email', `${templateName}.html`);
      let template = readFileSync(templatePath, 'utf-8');

      // Replace placeholders with data
      Object.keys(data).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, data[key]);
      });

      return template;
    } catch (error) {
      logger.error(`Failed to load email template ${templateName}:`, error);
      throw new HttpError(500, 'Failed to load email template');
    }
  }

  /**
   * Send email
   */
  async sendEmail(
    to: string,
    subject: string,
    html: string,
    text?: string,
  ): Promise<void> {
    if (!this.transporter) {
      throw new HttpError(500, 'Email service not configured');
    }

    try {
      const mailOptions = {
        from: `${process.env.FROM_NAME || 'MatchTalk'} <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent to ${to}:`, info.messageId);
    } catch (error) {
      logger.error(`Failed to send email to ${to}:`, error);
      throw new HttpError(500, 'Failed to send email');
    }
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(userEmail: string, userName: string): Promise<void> {
    const html = this.loadTemplate('welcome', {
      userName,
      appName: 'MatchTalk',
    });

    await this.sendEmail(
      userEmail,
      'Hoş Geldiniz - MatchTalk',
      html,
    );
  }

  /**
   * Send invite email
   */
  async sendInviteEmail(
    inviterName: string,
    inviteeEmail: string,
    roomId: string,
  ): Promise<void> {
    const html = this.loadTemplate('invite', {
      inviterName,
      roomId,
      appName: 'MatchTalk',
    });

    await this.sendEmail(
      inviteeEmail,
      `${inviterName} sizi bir odaya davet etti`,
      html,
    );
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(userEmail: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    
    const html = this.loadTemplate('passwordReset', {
      resetUrl,
      appName: 'MatchTalk',
    });

    await this.sendEmail(
      userEmail,
      'Şifre Sıfırlama - MatchTalk',
      html,
    );
  }

  /**
   * Send room invite email
   */
  async sendRoomInviteEmail(
    inviterName: string,
    inviteeEmail: string,
    roomName: string,
    roomId: string,
  ): Promise<void> {
    const roomUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/rooms/${roomId}`;
    
    const html = this.loadTemplate('roomInvite', {
      inviterName,
      roomName,
      roomUrl,
      appName: 'MatchTalk',
    });

    await this.sendEmail(
      inviteeEmail,
      `${inviterName} sizi "${roomName}" odasına davet etti`,
      html,
    );
  }
}

export const emailService = new EmailService();



