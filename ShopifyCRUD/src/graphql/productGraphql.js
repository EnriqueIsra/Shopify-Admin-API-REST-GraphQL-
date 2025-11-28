// src/graphql/productGraphql.js

import { shopifyConfig } from "../config/shopify.js";
import { httpRequest } from "../utils/httpClient.js";

const GRAPHQL_URL = `https://${shopifyConfig.storeDomain}/admin/api/${shopifyConfig.version}/graphql.json`;

// Función genérica para enviar queries
async function sendGraphQL(query, variables = {}) {
    return await httpRequest(GRAPHQL_URL, {
        method: "POST",
        headers: {
            "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_PASSWORD,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, variables })
    });
}

// =============================
// ✔ CREAR PRODUCTO + PRECIO
// =============================
export async function createProductGraphql(title, description, price) {
    // 1) Crear producto
    const mutation = `
        mutation CreateProduct($title: String!, $desc: String!) {
            productCreate(input: {
                title: $title,
                descriptionHtml: $desc
            }) {
                product {
                    id
                    title
                    variants(first: 1) {
                        edges {
                            node {
                                id
                                price
                            }
                        }
                    }
                }
                userErrors { field message }
            }
        }
    `;

    const result = await sendGraphQL(mutation, { title, desc: description });
    const product = result?.data?.productCreate?.product;
    const variantId = product?.variants?.edges?.[0]?.node?.id;
    const initialPrice = product?.variants?.edges?.[0]?.node?.price;

    if (!variantId) throw new Error("No se pudo obtener el variantId");

    // 2) Actualizar precio usando BULK UPDATE
    const priceMutation = `
        mutation UpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
            productVariantsBulkUpdate(productId: $productId, variants: $variants) {
                productVariants {
                    id
                    price
                }
                userErrors { field message }
            }
        }
    `;

    const priceResult = await sendGraphQL(priceMutation, {
        productId: product.id,
        variants: [
            {
                id: variantId,
                price: price
            }
        ]
    });

    const finalPrice = priceResult?.data?.productVariantsBulkUpdate?.productVariants?.[0]?.price;

    return {
        product,
        variantId,
        initialPrice,
        finalPrice,
        priceUpdate: priceResult
    };
}

// =============================
// ✔ GET PRODUCTS
// =============================
export async function getProductsGraphql() {
    const query = `
        {
            products(first: 10){
                edges {
                    node {
                        id
                        title
                        descriptionHtml
                        variants(first: 1) {
                            edges {
                                node {
                                    id
                                    price
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
    return await sendGraphQL(query);
}

// =============================
// ✔ UPDATE PRODUCT + UPDATE PRICE
// =============================
export async function updateProductGraphql(productId, title, description, price, variantId) {

    // 1) Actualizar datos del producto
    const mutationProduct = `
        mutation UpdateProduct($input: ProductInput!) {
            productUpdate(input: $input) {
                product {
                    id
                    title
                }
            userErrors {
                field
                message
            }
          }
        }
    `;

    const productVariables = {
        input: {
            id: productId,
            title: title,
            descriptionHtml: description
        }
    };

    const productResult = await sendGraphQL(mutationProduct, productVariables);

    // 2) Si hay price y variantId, actualizar variante (precio) con productsVariantBulkUpdate
    let variantResult = null;
    if(variantId && price !== undefined && price !== null) {
        const mutationVariants = `
            mutation UpdateVariants($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
                productVariantsBulkUpdate(productId: $productId, variants: $variants) {
                    productVariants {
                        id
                        price
                    }
                    userErrors {
                        field
                        message
                    }
                }
            }
        `;
        
        const variantsVariables = {
            productId: productId,
            variants: [
                {
                    id: variantId,
                    price: String(price)
                }
            ]
        };

        variantResult = await sendGraphQL(mutationVariants, variantsVariables);
    }

    return {
        productUpdate: productResult,
        variantUpdate: variantResult
    };

}

// =============================
// ✔ DELETE PRODUCT
// =============================
export async function deleteProductGraphql(productId) {
    const mutation = `
        mutation DeleteProduct($id: ID!) {
            productDelete(input: {id: $id}) {
                deletedProductId
                userErrors { field message }
            }
        }
    `;
    return await sendGraphQL(mutation, { id: productId });
}
