// CRUD REST

import { shopifyConfig } from "../config/shopify.js";
import { httpRequest } from "../utils/http-client.js";

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

    const p = productData.product;
    const url = `${base}/products.json`;

    const body = {
        product: {
            title: p.title,
            body_html: p.body_html,
            vendor: p.vendor ?? "Default vendor",
            product_type: p.product_type ?? "Default type",
            variants: [
                {
                    price: p.variants?.[0]?.price ?? "0.00"  // PRECIO 
                }
            ]
        }
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

    const u = updates.product;

    const body = {
        product: {
            id: productId,
            title: u.title,
            body_html: u.body_html,
            variants: u.price
                ? [
                    {
                        id: u.variantId, // 👈 Necesario: el variant del producto
                        price: u.price
                    }
                ]
                : undefined
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