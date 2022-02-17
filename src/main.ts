import 'dotenv/config';

import config from '@config/env';
import { Database } from '@database/Database';

import { app } from '@api/app';

/** Database connect  */
Database.connect();

/** Run server */
const { port, host } = config;

app.listen(port, () => console.log(`\nHOST: ${host}`));
