import { fetchSchemaById, fetchLatestVersion, postNewVersion } from '../services/schemadb-api-service';
import { getLogger } from '../lib/logger';
import { validateAvroSchema } from '../lib/avro-serializer';
import Exceptions from '../lib/exceptions';
const logger = getLogger('schema-store');
const _schemas = [];

export const getSchemaById = async (schemaId) => {
    let schema = _schemas.filter(s => s['id'] === schemaId)[0];

    if (schema) {
        logger.debug(`Cache hit: schema with id ${schema['id']} already in memory.`);
    } else {
        logger.debug(`Cache miss: schema with id ${schema['id']} not found in memory. Fetching from API...`);
        schema = await fetchSchemaById(schemaId);
        _schemas.push(schema);
    }

    return schema;
};

export const getLatestSchema = async (namespace, name) => {
    let schema = _schemas.filter(s => {
        return s['definition']['namespace'] === namespace
            && s['definition']['name'] === name;
    }).sort((a, b) => new Date(b['created_at']) - new Date(a['created_at']))[0];


    if (schema) {
        logger.debug(`Cache hit: schema with id ${schema['id']} already in memory.`);
    } else {
        logger.debug(`Cache miss: latest ${namespace}::${name} schema not found in memory. Fetching from API...`);
        schema = await fetchLatestVersion(namespace, name);
        _schemas.push(schema);
    }

    return schema;
};

export const saveNewSchema = async (schemaData) => {
    if (validateAvroSchema(schemaData['definition'])) {
        let schema = await postNewVersion(schemaData);
        _schemas.push(schema);
        return schema;
    } else {
        throw new Error(Exceptions.INVALID_AVRO_SCHEMA);
    }
};
