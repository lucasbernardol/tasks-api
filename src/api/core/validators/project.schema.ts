import joi from 'joi';

export default {
  body: {
    createSchema: joi.object({
      title: joi.string().min(3).max(80).trim().required(),
      subtitle: joi.string().min(5).max(120).trim().required(),
      description: joi.string().min(5).trim().required(),
      tag_id: joi.string().uuid({ version: 'uuidv4' }).trim().required(),
    }),

    updateSchema: joi.object({
      title: joi.string().min(3).max(80).trim().required(),
      subtitle: joi.string().min(5).max(120).trim().required(),
      description: joi.string().min(5).trim().required(),
    }),
  },
};
