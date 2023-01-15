import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const envValidation = Joi.object({
  API_KEY: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
});

export default registerAs('config', () => {
  return {
    auth: {
      apiKey: process.env.API_KEY,
    },
    databases: {
      mongoUri: process.env.MONGO_URI,
    },
  };
});
