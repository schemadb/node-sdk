const request = require('request');
import { getLogger } from '../lib/logger';
const logger = getLogger('schemadb-service');
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

export const postNewVersion = async (schema)  => {
    const apiURL = getConfiguration(Settings.API_URL);
    const url = `${apiURL}/v0/schema/`;
    return _fetch(url, {
        method: 'POST',
        body: JSON.stringify(schema),
        headers: { 'Content-Type': 'application/json' }
    });
};

export const fetchVersion = async (namespace, name, version)  => {
    const apiURL = getConfiguration(Settings.API_URL);
    const url = `${apiURL}/v0/schema/namespace/${namespace}/name/${name}/version/${version}`;
    return _fetch(url);
};

const _fetch = async (url, options = {}) => new Promise((resolve, reject) => {
    const apiToken = getConfiguration(Settings.API_TOKEN);

    if (!apiToken) {
        throw new Error(Exceptions.INVALID_API_TOKEN);
    }

    const _options = {
        url,
        ...options,
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            ...options['headers']
        }
    };

    logger.debug(`Request started: ${JSON.stringify(_options)}`);
    const startAt = +new Date();
    request(_options, (error, response, body) => {
        logger.debug(`Request end: ${url} took ${(+new Date() - startAt)}ms`);
    
        if (error) {
            logger.error(error);
            reject(Exceptions.SCHEMA_FETCH_ERROR);
        } else if (response.statusCode === 409) {
            reject(Exceptions.VERSION_ALREADY_EXISTS);
        } else if (response.statusCode === 404) {
            reject(Exceptions.SCHEMA_NOT_FOUND);
        } else {
            const json = JSON.parse(body);
            resolve(json['data'] || json);
        }
    });
});
