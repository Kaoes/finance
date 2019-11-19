import btoa = require('btoa');
import fetch, { RequestInit } from 'node-fetch';

export const SERVER_ENDPOINT = 'https://dolphin.jump-technology.com:8443';
export const ENDPOINT = `${SERVER_ENDPOINT}/api/v1`;

const CONFIG = {
    username: 'EPITA_GROUPE7',
    password: 'td92D2UbcAyX2LZu'
};

export const fetchApi = (uri: RequestInfo, options?: RequestInit) => {
    let opts: RequestInit = {
        headers: {
            Authorization: `Basic ${btoa(`${CONFIG.username}:${CONFIG.password}`)}`
        }
    };

    if (options) {
        opts = {
            ...options,
            ...opts,
            headers: {
                ...options.headers,
                ...opts.headers
            },

        };
    }

    return fetch(`${ENDPOINT}${uri}`, opts);
};
