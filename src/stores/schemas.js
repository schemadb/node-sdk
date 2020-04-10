import { fetchSchemaById } from '../services/schemadb-api-service';
import { getLogger } from '../lib/logger';
const logger = getLogger('schema-store');
const _schemas = {};

export const getSchemaById = async (schemaId) => {
    if (_schemas[schemaId]) {
        logger.debug(`Cache hit: schema with id ${schemaId} already in memory.`);
        return _schemas[schemaId];
    } else {
        logger.debug(`Cache miss: schema with id ${schemaId} not found in memory.`);
        return await fetchSchemaById(schemaId);
    }
};
