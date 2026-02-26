const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

exports.sendVerificationEmail = async (to, verifyUrl) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"DSA Visualiser" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Verify your DSA Visualiser account',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Confirm your email</h2>
          <p>Click the button below to verify your account. This link expires in 24 hours.</p>
          <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </div>
      `
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

exports.sendPasswordResetEmail = async (to, resetUrl) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"DSA Visualiser" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Reset your DSA Visualiser password',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Click the button below to reset your password. This link expires in 1 hour. If you didn't request this, ignore this email.</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #dc3545; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </div>
      `
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};
