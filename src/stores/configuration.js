const _configuration = {
    'api-url': 'https://schemadb.com/api/'
};

export const Settings = Object.freeze({
    API_URL: 'api-url',
    API_TOKEN: 'api-token',
    DEBUG: 'debug'
});

export const setConfiguration = (configKey, configValue) => {
    return _configuration[configKey] = configValue;
};

export const getConfiguration = configKey => {
    const configValue = _configuration[configKey];
    return configValue;
};
