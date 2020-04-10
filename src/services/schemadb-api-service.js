import fetch from 'node-fetch';
import { getLogger } from '../lib/logger';
const logger = getLogger('scehmadb-service');
import { getConfiguration, Settings } from '../stores/configuration';

export const fetchSchemaById = async (schemaId)  => {
    try {
        const apiURL = getConfiguration(Settings.API_URL);
        const apiToken = getConfiguration(Settings.API_TOKEN);
        const url = `${apiURL}/vo/schema/${schemaId}`;
    
        logger.debug(`Fetch schema from ${url}`);
        return fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiToken}`
            } 
        }).then(res => res.json()).then(json  => json['data']);        
    } catch (error) {
        logger.debug(error);
        throw 'Error fetching schema from API';        
    }
};
