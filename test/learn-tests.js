// const schemadb = require('../src');

// (async() => {
//     schemadb.init('f0d7afc0-7a79-11ea-93cb-4d38642dfbac', {
//         debug: true
//     });

//     // const userSchema = {
//     //     "version": 1,
//     //     "definition": {
//     //         "type": "record",
//     //         "namespace": "com.example.store",
//     //         "name": "user",
//     //         "fields": [
//     //           { "name": "userId", "type": "long" },
//     //           {
//     //               "name": "created_at", "type": "long",
//     //               "logicalType": "timestamp-millis" 
//     //           },
//     //           { "name": "username", "type": "string" },
//     //           { "name": "email", "type": "string" }
//     //         ]
//     //     }
//     // };
    
//     // // Save schema to platform
//     // await schemadb.saveSchema(userSchema);

//     let latestSchemaVersion = await schemadb.getSchema('com.example.store', 'user');
//     console.log(latestSchemaVersion);

//     // Encode payload
//     const avro = await schemadb.encode(latestSchemaVersion, {
//         userId: 1234567890,
//         created_at: 1586193018930,
//         username: 'han_solo',
//         email: 'hsolo@millfalcon.com'
//     });
//     console.log(avro)

//     const payload = await schemadb.decode(avro);
//     console.log(payload)
// })();
