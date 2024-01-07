import nodemailer from "nodemailer";

async function sendEmail(to: string, subject: string, text: string, html: string) {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER || "",
        port: 587,
        tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2"
        },
        auth: {
          user: process.env.SMTP_USER || "",
          pass: process.env.SMTP_PASS || "",
        },
    });

    const info = await transporter.sendMail({
        from: `"CRHS Parking" <${process.env.SMTP_USER}>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
}

export default sendEmail;