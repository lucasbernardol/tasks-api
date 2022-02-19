import joi from 'joi';

export default {
  body: {
    createSchema: joi.object({
      name: joi.string().min(3).max(120).trim().required(),
      details: joi.string().min(5).trim().required(),
      project_id: joi.string().uuid({ version: 'uuidv4' }).trim().required(),
    }),

    updateSchema: joi.object({
      name: joi.string().min(3).max(120).trim().required(),
      details: joi.string().min(5).trim().required(),
    }),
  },
};
