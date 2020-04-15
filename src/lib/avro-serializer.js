import avro from 'avsc';
import { toBytesInt32 } from './utils';
import { getSchemaById } from './../stores/schemas';

export const encode = (schema, obj) => {
    const type = avro.Type.forSchema(schema['definition']);
    const magicByte = Buffer.alloc(1);
    const id = toBytesInt32(schema['id']);
    const payload = type.toBuffer(obj);
    return Buffer.concat([ magicByte, id, payload ]);
};

export const decode = async (avroBuffer) => {
    // eslint-disable-next-line no-unused-vars
    const magicByte = avroBuffer.slice(0);
    const schemaId = avroBuffer.readInt32BE(1);
    const payload = avroBuffer.slice(5);
    const schema = await getSchemaById(schemaId);
    const type = avro.Type.forSchema(schema['definition']);
    return {
        schema,
        payload: type.fromBuffer(payload)
    };
};

export const validateAvroSchema = (schema) => {
    const type = avro.Type.forSchema(schema);
    return type.isValid;
};
