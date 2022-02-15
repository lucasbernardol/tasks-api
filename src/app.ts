import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from '@routes/v1/routes';

const app = express();

app.use(express.json());

app.use(cors());
app.use(morgan('dev'));

app.use(routes);

export { app };
