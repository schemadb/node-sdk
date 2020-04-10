/* eslint-disable no-unused-vars */

import Exceptions from './lib/exceptions';
import { setConfiguration, Settings } from './stores/configuration';

const _validateAPIToken = apiToken => {
    return apiToken
        && typeof apiToken === 'string'
        && apiToken.length;
};

export default {
    /**
     * Initialize SchemaDB SDK.
     * 
     * @param {string} apiToken SchemaDB API Token
     * @param {object} options SDK options
     */
    init: (apiToken, options = {}) => {
        if (_validateAPIToken(apiToken)) {
            setConfiguration(Settings.API_TOKEN, apiToken);
        } else {
            throw new Error(Exceptions.INVALID_API_TOKEN);
        }

        setConfiguration(Settings.DEBUG, !!options[Settings.DEBUG]);
    },
    /**
     * Save a new schema to platform. Will fail if version already exists.
     * 
     * @param {object} schema Avro JSON format schema to be saved
     */
    saveSchema: async (schema) => {
        return;
    },
    /**
     * Get latest schema version by namespace and name.
     * 
     * @param {string} namespace Schema namespace
     * @param {string} name Schema name
     */
    getSchema: async (namespace, name) => {
        return;
    },
    /**
     * Encode JSON to binary Avro buffer.
     * 
     * @param {object} schema Avro JSON format schema to be saved
     * @param {object} payload Object to be encoded
     */
    encode: async (schema, payload) => {
        return;
    },
    /**
     * Decado Avro binary to JSON object.
     * 
     * @param {Buffer} binaryBuffer Avro binary encoded payload
     */
    decode: async (binaryBuffer) => {
        return;
    }
};
