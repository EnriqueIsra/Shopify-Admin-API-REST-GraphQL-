// se encarga de construir la URL base y headers para las solicitudes
import 'dotenv/config';

const encodedCredentials = Buffer.from(
    `${process.env.SHOPIFY_ADMIN_API_KEY}:${process.env.SHOPIFY_ADMIN_API_PASSWORD}`
).toString("base64");

export const shopifyConfig = {
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
    version: process.env.SHOPIFY_ADMIN_API_VERSION,
    apiKey: process.env.SHOPIFY_ADMIN_API_KEY,
    apiPassword: process.env.SHOPIFY_ADMIN_API_PASSWORD,
    authHeader: `Basic ${encodedCredentials}`,

    get restBaseUrl() {
        return `https://${this.storeDomain}/admin/api/${this.version}`;
    },
    get graphqlUrl() {
        return `https://${this.storeDomain}/admin/api/${this.version}/graphql.json`;
    }
}