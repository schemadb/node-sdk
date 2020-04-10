import log4js from 'log4js';
import { getConfiguration, Settings } from '../stores/configuration';

export const getLogger = (identifier) => { 
    const logger = log4js.getLogger(identifier);
    
    if (getConfiguration(Settings.DEBUG)) {
        logger.level = 'debug';
    }

    return logger;
};
