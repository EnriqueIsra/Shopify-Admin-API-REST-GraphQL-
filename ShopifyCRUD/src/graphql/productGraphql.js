import { shopifyConfig } from "../config/shopify.js";
import { httpRequest } from "../utils/httpClient.js";

const GRAPHQL_URL = `https://${shopifyConfig.storeDomain}/admin/api/${shopifyConfig.version}/graphql.json`;

// Función geneerica para enviar queries
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
// CREATE PRODUCT
export async function createProductGraphql(title, description) {
    const mutation = `
        mutation CreateProduct($title: String!, $desc: String!) {
            productCreate(input: {
                title: $title,
                descriptionHtml: $desc
            }) {
                product {
                    id
                    title
                    descriptionHtml
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;
    return await sendGraphQL(mutation, {
        title,
        desc: description
    });
}

// GET PRODUCTS
export async function getProductsGraphql() {
    const query = `
        {
            products(first: 10){
                edges {
                    node {
                        id
                        title
                        descriptionHtml
                    }
                }
            }
        }
    `;
    return await sendGraphQL(query);
}

// UPDATE PRODUCT
export async function updateProductGraphql(productId, title) {
    const mutation = `
        mutation UpdateProduct($id: ID!, $title: String!){
            productUpdate(input: {
                id: $id,
                title: $title
            }) {
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
    return await sendGraphQL(mutation, {
        id: productId,
        title
    });
}

// DELETE PRODUCT 
export async function deleteProductGraphql(productId) {
    const mutation = `
        mutation DeleteProduct($id: ID!) {
            productDelete(input: {id: $id}) {
                deletedProductId
                userErrors {
                    field
                    message
                }
            }
        }
    `;
    return await sendGraphQL(mutation, {
        id: productId
    });
}