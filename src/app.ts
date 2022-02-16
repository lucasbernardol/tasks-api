import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { tempPath } from '@constants/path';

import { paging } from '@middlewares/pagingConvert';
import { routes } from '@routes/v1/routes';

const app = express();

app.use(express.json());

app.use('/files', express.static(tempPath));

app.use(cors());
app.use(morgan('dev'));

app.use(paging());

app.use(routes);

export { app };
