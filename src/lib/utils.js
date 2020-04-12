import avro from 'avsc';

export const toBytesInt32 = (num) => {
    const buff = Buffer.alloc(4);
    buff.writeInt32BE(num);
    return buff;
};

export const validateAvroSchema = (schema) => {
    const type = avro.Type.forSchema(schema);
    return type.isValid;
};
