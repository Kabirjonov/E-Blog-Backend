const nodemailer = require("nodemailer");
class MailService {
	constructor() {
		this.transport = nodemailer.createTransport({
			host: process.env.SMTP_Host,
			port: process.env.SMTP_Port,
			secure: false,
			auth: {
				user: process.env.SMTP_User,
				pass: process.env.SMTP_Pass,
			},
		});
	}
	async sendMail(email, resetUrl) {
		try {
			const result = await this.transport.sendMail({
				from: `"E-Blog" <${process.env.SMTP_User}>`,
				to: email,
				html: `<div><a href="${resetUrl}">Click to reset your password</a></div>`,
			});
			console.log("Email sent:", result.messageId);
		} catch (error) {
			console.error("Email sending failed:", error);
		}
	}
}
module.exports = new MailService();
