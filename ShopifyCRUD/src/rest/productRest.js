// CRUD REST

import { shopifyConfig } from "../config/shopify.js";
import { httpRequest } from "../utils/httpClient.js";

const base = shopifyConfig.restBaseUrl;

// =================================
//          GET PRODUCTS
// =================================
export async function getProductsRest() {
    const url = `${base}/products.json`;
    return await httpRequest(url);
}

// =================================
//          GET PRODUCT BY ID
// =================================
export async function getProductRestById(productId) {
    const url = `${base}/products/${productId}.json`;
    return await httpRequest(url);
}

// =================================
//          CREATE PRODUCT
// =================================
export async function createProductRest(productData) {
    const url = `${base}/products.json`;

    const body = {
        product: productData
    };

    return await httpRequest(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}

// =================================
//          UPDATE PRODUCT
// =================================
export async function updateProductRest(productId, updates) {
    const url = `${base}/products/${productId}.json`;

    const body = {
        product: {
            id: productId,
            ...updates
        }
    };

    return await httpRequest(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}

// =================================
//          DELETE PRODUCT
// =================================
export async function deleteProductRest(productId) {
    const url = `${base}/products/${productId}.json`;

    return await httpRequest(url, {
        method: "DELETE"
    })
}