const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const messages = error.details.map(d => d.message).join(', ');
        return res.status(400).json({ success: false, message: messages });
    }
    next();
};

const signupSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
        'string.pattern.base': 'Password must contain at least one uppercase, one lowercase, and one digit'
    })
});

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required().messages({
        'string.pattern.base': 'Password must contain at least one uppercase, one lowercase, and one digit'
    })
});

module.exports = {
    validate,
    signupSchema,
    signinSchema,
    forgotPasswordSchema,
    resetPasswordSchema
};
