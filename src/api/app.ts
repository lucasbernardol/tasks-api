import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { filesUploadsDirectory } from '@constants/path';
import config from '@config/env';

import { paging } from '@middlewares/pagingConvert';
import { routes } from '@routes/v1';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

/** Morgan: logger */
if (config.IS_NODE_ENV_DEVELOPMENT) app.use(morgan('dev'));

/** @example: http://localhost:3333/files/filename.png */
app.use('/files', express.static(filesUploadsDirectory));

app.use(paging());
app.use(routes);

export { app };