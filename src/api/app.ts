import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { createCelebrateHandle } from '@middlewares/CelebrateHandler';
import { createApplicationHandler } from '@middlewares/Handler';

import { paging } from '@middlewares/pagingConvert';

import { routes } from '@routes/v1';
import config from '@config/env';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

/** morgan: logger */
if (config.IS_NODE_ENV_DEVELOPMENT) app.use(morgan('dev'));

app.use(paging());
app.use(routes);

/** celebrate  */
app.use(createCelebrateHandle().mw());

/** handlers  */
const { httpHandler, AuthorizationHandler, multerHandler, notFound } =
  createApplicationHandler();

app.use(notFound(), multerHandler(), AuthorizationHandler(), httpHandler());

export { app };
