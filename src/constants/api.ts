export const DEVELOPMENT_SERVER_URL = 'http://localhost:4000';
export const PRODUCTION_SERVER_URL = 'http://localhost:4000';

export const SERVER_URL =
    process.env.NODE_ENV === 'development'
        ? DEVELOPMENT_SERVER_URL
        : process.env?.SERVER_URL || PRODUCTION_SERVER_URL;

export const pathWithServerUrl = (endpoint: string) => {
    if (endpoint[0] === '/') endpoint = endpoint.slice(1);

    return `${SERVER_URL}/${endpoint}`;
};
