import nodemailer from 'nodemailer';

async function start() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'selina.weissnat@ethereal.email',
      pass: '8nmdv9GM9GnWBEEbR1'
    }
  });
  try {
    const info = await transporter.sendMail({
      from: '"Example Team" <team@example.com>', // sender address
      to: "alice@example.com, bob@example.com", // list of recipients
      subject: "Hello", // subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // HTML body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Verification failed:", err);
  }
}
start()