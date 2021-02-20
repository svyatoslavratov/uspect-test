import path from "path";
import nodemailer from "nodemailer";
import EmailTemplates from "email-templates";
import Mail from "nodemailer/lib/mailer";

import config from "config";

export class MailerService {
  public rootViews = path.join(__dirname, "../email-templates");
  private transport: Mail;
  private emailTempaltes: EmailTemplates<unknown>;

  constructor() {
    this.transport = nodemailer.createTransport({
      auth: {
        user: config.email.user,
        pass: config.email.pass
      },
      host: config.email.host,
      port: 465
    });

    this.emailTempaltes = new EmailTemplates({
      views: {
        root: this.rootViews
      },
      message: {
        from: config.email.user
      },
      transport: this.transport,
      send: config.email.send
    });
  }

  public async sendWelcomeEmail(email: string): Promise<void> {
    await this.emailTempaltes.send({
      template: "welcome",
      message: {
        to: email
      }
    });
  }
}
