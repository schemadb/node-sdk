import { fetchSchemaById, fetchLatestVersion } from '../services/schemadb-api-service';
import { getLogger } from '../lib/logger';
const logger = getLogger('schema-store');
const _schemas = [];

export const getSchemaById = async (schemaId) => {
    let schema = _schemas.filter(schema => schema['id'] === schemaId)[0];

    if (schema) {
        logger.debug(`Cache hit: schema with id ${schema['id']} already in memory.`);
    } else {
        logger.debug(`Cache miss: schema with id ${schema['id']} not found in memory. Fetching from API...`);
        schema = await fetchSchemaById(schemaId);
        _schemas.push(schema);
    }

    return schema['definition'];
};

export const getLatestSchema = async (namespace, name) => {
    let schema = _schemas.filter(schema => {
        return schema['definition']['namespace'] === namespace
            && schema['definition']['name'] === name;
    }).sort((a, b) => a['created_at'] > b['created_at'])[0];

    if (schema) {
        logger.debug(`Cache hit: schema with id ${schema['id']} already in memory.`);
    } else {
        logger.debug(`Cache miss: latest ${namespace}::${name} schema not found in memory. Fetching from API...`);
        schema = await fetchLatestVersion(namespace, name);
        _schemas.push(schema);
    }

    return schema['definition'];
};
