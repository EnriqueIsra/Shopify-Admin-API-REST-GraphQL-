// rest/customerRest.js

import { shopifyConfig } from "../config/shopify.js";
import { httpRequest } from "../utils/http-client.js";

const base = shopifyConfig.restBaseUrl;

// =================================
//        GET CUSTOMERS
// =================================
export async function getCustomersRest() {
    const url = `${base}/customers.json?fields=id,first_name,last_name,email,phone&limit=250`;
    const data = await httpRequest(url);
    const customers = data.customers || [];
    console.log(JSON.stringify(data, null, 2))
    // Normalizamos (opcional) para asegurar que el frontend reciba siempre los mismos campos
    const formatted = customers.map(c => ({
        id: c.id,
        first_name: c.first_name || c.default_address?.first_name || "",
        last_name: c.last_name || c.default_address?.last_name || "",
        email: c.email || "",
        phone: c.phone || c.default_address?.phone || ""
    }));

    return formatted;
}

// =================================
//        GET CUSTOMER BY ID
// =================================
export async function getCustomerRestById(customerId) {
    const url = `${base}/customers/${customerId}.json`;
    const data = await httpRequest(url);
    return data.customer || null;
}

// =================================
//        CREATE CUSTOMER
// =================================
export async function createCustomerRest(body) {

    const payload = {
        customer: {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            phone: body.phone,
            tags: body.tags,
            addresses: body.addresses
                ? body.addresses
                : [] // opcional
        }
    };

    const url = `${base}/customers.json`;

    const resp = await httpRequest(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    return resp;
}

// =================================
//        UPDATE CUSTOMER
// =================================
export async function updateCustomerRest(customerId, updates) {

    const payload = {
        customer: {
            id: customerId,
            first_name: updates.first_name,
            last_name: updates.last_name,
            email: updates.email,
            phone: updates.phone
        }
    };

    const url = `${base}/customers/${customerId}.json`;

    return await httpRequest(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}

// =================================
//        DELETE CUSTOMER  (técnicamente lo deshabilita)
// =================================
export async function deleteCustomerRest(customerId) {

    // Shopify NO permite borrar clientes, solo deshabilitarlos
    const payload = {
        customer: {
            id: customerId,
            state: "disabled"
        }
    };

    const url = `${base}/customers/${customerId}.json`;

    return await httpRequest(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}
