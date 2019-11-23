import btoa = require('btoa');
import fetch, { RequestInit } from 'node-fetch';

export const SERVER_ENDPOINT = 'https://dolphin.jump-technology.com:8443';
export const ENDPOINT = `${SERVER_ENDPOINT}/api/v1`;

const CONFIG = {
    username: 'EPITA_GROUPE7',
    password: 'td92D2UbcAyX2LZu'
};

export const MIN_ACTIF = 15;
export const MAX_ACTIF = 40;
export const MIN_NAV = 1;
export const MAX_NAV = 10;

export const WALLET_ID = 1826;
export const WALLET_REF_ID = 2201;

export const ID_RETURN = 13;
export const ID_SHARPE = 12;
export const ID_VOL = 10;

export const START_DATE = '2013-06-14';
export const END_DATE = '2019-05-31';

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
            }
        };
    }

    return fetch(`${ENDPOINT}${uri}`, opts);
};
