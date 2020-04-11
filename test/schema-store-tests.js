import { expect } from 'chai';
import schemadb from '../src';
import Exceptions from '../src/lib/exceptions';

describe('Test SDK', async () => {
    schemadb.init('f0d7afc0-7a79-11ea-93cb-4d38642dfbac', { debug: true });
    const schema = await schemadb.getSchema('com.schemadb.store', 'Order');
    console.log(schema);
    await schemadb.getSchema('com.schemadb.store', 'Order');
    await schemadb.getSchema('com.schemadb.store', 'Order');
});
