import fetch from 'node-fetch';
import { getLogger } from '../lib/logger';
const logger = getLogger('scehmadb-service');
import { getConfiguration, Settings } from '../stores/configuration';
import Exceptions from '../lib/exceptions';

export const fetchSchemaById = async (schemaId)  => {
    const apiURL = getConfiguration(Settings.API_URL);
    const url = `${apiURL}/v0/schema/${schemaId}`;
    return _fetch(url);
};

export const fetchLatestVersion = async (namespace, name)  => {
    const apiURL = getConfiguration(Settings.API_URL);
    const url = `${apiURL}/v0/schema/namespace/${namespace}/name/${name}/latest`;
    return _fetch(url);
};

const _fetch = async (url, options) => {
    try {
        const apiToken = getConfiguration(Settings.API_TOKEN);

        if (!apiToken) {
            throw new Error(Exceptions.INVALID_API_TOKEN);
        }
        
        const startAt = +new Date();
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            },
            ...options
        });

        const endAt = +new Date();
        logger.debug(`Request to ${url} took ${(endAt - startAt)}ms`);

        return response.json();
    } catch (error) {
        logger.error(error);
        throw new Error(Exceptions.SCHEMA_FETCH_ERROR);
    }
};
