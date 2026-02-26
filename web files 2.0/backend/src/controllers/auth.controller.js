const User = require('../models/User');
const crypto = require('crypto');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'An account with this email already exists' });
        }

        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
        const expiry = Date.now() + 24 * 60 * 60 * 1000;

        const user = await User.create({
            name,
            email,
            password,
            verifyToken: hashedToken,
            verifyTokenExpiry: expiry
        });

        const verifyUrl = `${process.env.CLIENT_URL}/api/auth/verify/${rawToken}`;

        try {
            await sendVerificationEmail(email, verifyUrl);
            return res.status(201).json({ success: true, message: 'Account created! Please check your email to verify your account.' });
        } catch (err) {
            await User.findByIdAndDelete(user._id);
            return res.status(500).json({ success: false, message: 'Failed to send verification email. Please try again.' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const rawToken = req.params.token;
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

        const user = await User.findOne({
            verifyToken: hashedToken,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Verification link is invalid or has expired' });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return res.status(200).json({ success: true, message: 'Email verified successfully! You can now sign in.' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ success: false, message: 'Please verify your email before signing in', code: 'EMAIL_NOT_VERIFIED' });
        }

        const accessToken = generateAccessToken({ userId: user._id, email: user.email, role: user.role });
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
        user.lastLogin = new Date();
        await user.save();

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.signout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
            const user = await User.findOne({ refreshToken: hashedToken });
            if (user) {
                user.refreshToken = undefined;
                await user.save();
            }
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({ success: true, message: 'Signed out successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: 'No refresh token' });
        }

        let decoded;
        try {
            decoded = verifyRefreshToken(refreshToken);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid refresh token' });
        }

        const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');
        const user = await User.findOne({ _id: decoded.userId, refreshToken: hashedToken });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid refresh token' });
        }

        const newRefreshToken = generateRefreshToken(user._id);
        user.refreshToken = crypto.createHash('sha256').update(newRefreshToken).digest('hex');
        await user.save();

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const accessToken = generateAccessToken({ userId: user._id, email: user.email, role: user.role });
        return res.status(200).json({ success: true, accessToken });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const rawToken = crypto.randomBytes(32).toString('hex');
            const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

            user.resetToken = hashedToken;
            user.resetTokenExpiry = Date.now() + 60 * 60 * 1000;
            await user.save({ validateBeforeSave: false });

            const resetUrl = `${process.env.CLIENT_URL}/api/auth/reset-password/${rawToken}`;
            await sendPasswordResetEmail(user.email, resetUrl);
        }

        return res.status(200).json({ success: true, message: 'If an account with that email exists, a reset link has been sent.' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const rawToken = req.params.token;
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

        const user = await User.findOne({
            resetToken: hashedToken,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Reset link is invalid or has expired' });
        }

        user.password = req.body.password;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        user.refreshToken = undefined;
        await user.save();

        return res.status(200).json({ success: true, message: 'Password reset successfully. You can now sign in.' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, user });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
