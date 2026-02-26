const express = require('express');
const {
    signup,
    verifyEmail,
    signin,
    signout,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
    getMe
} = require('../controllers/auth.controller');
const {
    validate,
    signupSchema,
    signinSchema,
    forgotPasswordSchema,
    resetPasswordSchema
} = require('../middleware/validate');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.get('/verify/:token', verifyEmail);
router.post('/signin', validate(signinSchema), signin);
router.post('/signout', signout);
router.post('/refresh', refreshAccessToken);
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);
router.get('/me', protect, getMe);

module.exports = router;
