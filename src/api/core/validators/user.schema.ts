import joi from 'joi';

export default {
  body: {
    signInSchema: joi.object({
      email: joi.string().email().trim().lowercase().min(12).required(),
      password: joi.string().min(6).max(32).trim().lowercase().required(),
      repeat_password: joi.string().valid(joi.ref('password')).required(),
    }),

    createSchema: joi.object({
      name: joi.string().min(5).max(120).trim().required(),
      full_name: joi.string().min(5).max(32).trim().lowercase().required(),
      email: joi.string().email().trim().lowercase().min(12).required(),
      password: joi.string().min(6).max(32).trim().lowercase().required(),
      repeat_password: joi.string().valid(joi.ref('password')).required(),
    }),

    deleteSchema: joi.object({
      password: joi.string().min(6).max(32).trim().lowercase().required(),
      repeat_password: joi.string().valid(joi.ref('password')).required(),
    }),
  },
};
