import 'dotenv/config';

import { Database } from '@database/Database';
import config from '@config/env';

import { app } from './app';

/** Database connect  */
Database.connect();

/** Run server */
const { port, host } = config;

app.listen(port, () => console.log(`\nHOST: ${host}`));
