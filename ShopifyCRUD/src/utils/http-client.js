// un Wrapper para fetch

import { shopifyConfig } from "../config/shopify.js";

export async function httpRequest(url, options = {}) {
    const defaultHeaders = {
        "Content-Type": "application/json",
        "Authorization": shopifyConfig.authHeader
    };

    const finalOptions = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {})
        }
    };

    const response = await fetch (url, finalOptions);

    if(!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return await response.json();
}