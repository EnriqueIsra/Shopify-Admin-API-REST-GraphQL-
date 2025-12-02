import { shopifyConfig } from "../config/shopify.js";
import { httpRequest } from "../utils/http-client.js";

const base = shopifyConfig.restBaseUrl;

// =================================
//        GET ORDERS (REST)
// =================================
export async function getOrdersRest() {
    // status=any -> trae TODAS las órdenes
    // pagadas, pendientes y no pagadas
    const url = `${base}/orders.json?status=any`;

    // Obtenere respuesta completa de Shopify
    const data = await httpRequest(url);

    // Shopify devuelve: { orders: [...]}
    const orders = data.orders || [];

    // Formatear la salida
    const formatted = orders.map(o => {
        // Formatear la fecha
        const date = new Date(o.created_at);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/` +
            `${String(date.getMonth() + 1).padStart(2, '0')}/` +
            `${date.getFullYear()} ` +
            `${String(date.getHours()).padStart(2, '0')}:` +
            `${String(date.getMinutes()).padStart(2, '0')}`;

        // Calcular el total de artículos
        const totalItems = o.line_items.reduce((sum, item) => sum + item.quantity, 0);

        return {

            id: o.id,
            order_number: o.order_number,
            total_price: o.total_price,
            tags: o.tags,
            financial_status: o.financial_status,

            created_at: o.created_at, // ISO válido
            created_at_formatted: formattedDate, // fecha bonita
            customer: o.customer
                ? `${o.customer.first_name || ""} ${o.customer.last_name || ""}`.trim()
                : "Sin cliente",
            total_items: totalItems,
            items: o.line_items.map(item => ({
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                sku: item.sku,
                variant_id: item.variant_id
            }))
        }
    });
    return formatted;
}

// =================================
//        CREATE ORDER (REST)
// =================================

export async function createOrderRest(body) {
    console.log("Datos recibidos desde Angular:", body);

    const orderPayload = {
        order: {
            line_items: [
                {
                    variant_id: Number(body.variantId),
                    quantity: Number(body.quantity)
                }
            ],
            customer: {
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email
            }
        }
    };

    console.log("Payload enviado a Shopify:", JSON.stringify(orderPayload, null, 2));

    const url = `https://${shopifyConfig.storeDomain}/admin/api/${shopifyConfig.version}/orders.json`;

    const response = await httpRequest(url, {
        method: "POST",
        headers: {
            "X-Shopify-Access-Token": shopifyConfig.apiPassword,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderPayload)
    });

    return response;
}


