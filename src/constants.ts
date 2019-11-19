export const SERVER_ENDPOINT = 'https://dolphin.jump-technology.com:3472';
export const ENDPOINT = `${SERVER_ENDPOINT}/api/v1`;

const CONFIG = {
    username: '<username>', // To fill
    password: '<password>' // To fill
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
            }
        };
    }

    return fetch(`${ENDPOINT}${uri}`);
};
