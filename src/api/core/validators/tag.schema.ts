import joi from 'joi';

export default {
  body: {
    createSchema: joi.object({
      name: joi.string().min(2).max(120).trim().required(),
      description: joi.string().min(5).max(255).trim().required(),
      color: joi.string().min(7).max(7).trim().required(),
    }),

    updateSchema: joi.object({
      description: joi.string().min(5).max(255).trim().required(),
      color: joi.string().min(7).max(7).trim().required(),
    }),
  },
};
