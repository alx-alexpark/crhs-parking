import nodemailer from 'nodemailer';

async function sendEmail(
  to: string,
  subject: string,
  { text, html }: { text: string; html: string }
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER || '',
    port: 587,
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2',
    },
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  });

  const info = await transporter.sendMail({
    // sender address
    from: `"CRHS Parking" <${process.env.SMTP_USER}>`,
    // list of receivers
    to,
    // Subject line
    subject,
    // plain text body
    text,
    // html body
    html,
  });

  console.log('Message sent: %s', info.messageId);
}

export default sendEmail;
