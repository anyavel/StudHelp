import EmailTemplate from 'email-templates';
import nodemailer from 'nodemailer';
import path from 'path';

import { allTemplates } from '../constants/email-constants.js';

class EmailServices {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'klymochkoo@gmail.com',
                pass: 'fary wbrt axjb voqi',
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        this.templateParser = new EmailTemplate({
            views: {
                root: path.join(process.cwd(), "src", "templates"),
                options: {
                    extension: "hbs",
                },
            },
            juice: true,
            juiceResources: {
                webResources: {
                    relativeTo: path.join(process.cwd(), "src", "templates", "styles"),
                },
            },
        });
    }

    async sendMail(email, emailAction, locals = {}) {
        const templateInfo = allTemplates[emailAction];
        locals.frontUrl = "http://localhost:3000";

        const html = await this.templateParser.render(
            templateInfo.templateName,
            locals
        );

        return this.transporter.sendMail({
            from: "No reply",
            to: email,
            subject: templateInfo.subject,
            html,
        });
    }
}

export const emailService = new EmailServices();
