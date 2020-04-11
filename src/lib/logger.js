import log4js from 'log4js';

export const getLogger = (identifier) => { 
    const logger = log4js.getLogger(identifier);

    if (process.env.NODE_ENV != 'production') {
        logger.level = 'debug';
    }

    return logger;
};
