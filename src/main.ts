import { Database } from '@database/Database';

import { app } from './app';

/** Database connect  */
Database.connect();

/** Run server */
app.listen(3333, () => console.log('\nPORT: 3333'));
