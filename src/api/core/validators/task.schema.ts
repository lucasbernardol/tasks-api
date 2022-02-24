import joi from 'joi';

/**
 * - Joi schemas: `tasks`
 * @constant schemas
 */
const schemas = {
  body: {
    createSchema: joi.object({
      name: joi.string().min(3).max(120).trim().required(),
      details: joi.string().min(5).trim().required(),
      finish_date: joi
        .number()
        .optional()
        .default(Math.ceil(Date.now() / 1000)),
      project_id: joi.string().uuid({ version: 'uuidv4' }).trim().required(),
    }),

    updateSchema: joi.object({
      name: joi.string().min(3).max(120).trim().required(),
      details: joi.string().min(5).trim().required(),
      finish_date: joi
        .number()
        .optional()
        .default(Math.ceil(Date.now() / 1000)),
    }),
  },
};

export default schemas;
