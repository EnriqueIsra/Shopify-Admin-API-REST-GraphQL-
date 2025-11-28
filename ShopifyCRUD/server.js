import express from "express";
import cors from "cors";
import {
    getProductsRest, createProductRest,
    updateProductRest, deleteProductRest, getProductRestById
} from "./src/rest/productRest.js";

import {
    getProductsGraphql,
    createProductGraphql,
    updateProductGraphql,
    deleteProductGraphql,
} from "./src/graphql/productGraphql.js";
import { shopifyConfig } from "./src/config/shopify.js";
import { httpRequest } from "./src/utils/httpClient.js";

const app = express();
app.use(cors());
app.use(express.json());


// ----------------------
//        REST
// ----------------------

app.get("/api/rest/products", async (req, res) => {
    const data = await getProductsRest();
    res.json(data);
});

app.get("/api/rest/products/:id", async (req, res) => {
    try {
        const data = await getProductRestById(req.params.id);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error obteniendo el producto" });
    }
});

app.post("/api/rest/products", async (req, res) => {
    const data = await createProductRest(req.body);
    res.json(data);
});

app.put("/api/rest/products/:id", async (req, res) => {
    const data = await updateProductRest(req.params.id, req.body);
    res.json(data);
});

app.delete("/api/rest/products/:id", async (req, res) => {
    const data = await deleteProductRest(req.params.id);
    res.json(data);
});


// ----------------------
//        GRAPHQL
// ----------------------

app.post("/graphql", async (req, res) => {
    try {
        const { query, variables } = req.body;

        const result = await httpRequest(
            `https://${shopifyConfig.storeDomain}/admin/api/${shopifyConfig.version}/graphql.json`,
            {
                method: "POST",
                headers: {
                    "X-Shopify-Access-Token": shopifyConfig.apiPassword,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query, variables })
            }
        );
        res.json(result);
    } catch (err) {
        console.error("Error en /graphql: ", err);
        res.status(500).json({ error: "GraphQL request failed" });
    }
})

app.get("/api/graphql/products", async (req, res) => {
    const data = await getProductsGraphql();
    res.json(data);
});

app.post("/api/graphql/products", async (req, res) => {
    const { title, description, price } = req.body;
    try {
        const data = await createProductGraphql(title, description, price);
        res.json(data);
    } catch (err) {
        console.error("Error en /api/graphql/products:", err);
        res.status(500).json({ error: err.message || err });
    }
});

app.put("/api/graphql/products/:id", async (req, res) => {
    const productId = req.params.id;
    const { title, description, price, variantId } = req.body;

    try {
        const result = await updateProductGraphql(productId, title, description, price, variantId);
        res.json(result);
    } catch (err) {
        console.log("Error en PUT /api/graphql/products/:id", err);
        res.status(500).json({ error: err.message || err })
    }
});

app.delete("/api/graphql/products/:id", async (req, res) => {
    const data = await deleteProductGraphql(req.params.id);
    res.json(data);
});

// ----------------------
//        ORDERS REST
// ----------------------

import { getOrdersRest, createOrderRest } from "./src/rest/orderRest.js";

app.get("/api/rest/orders", async (req, res) => {
    try {
        const data = await getOrdersRest();
        res.json(data);
    } catch (err) {
        console.error("Error GET /api/rest/orders:", err);
        res.status(500).json({ error: "Error obteniendo órdenes" });
    }
});

// ----------------------
//        CREATE ORDER REST
// ----------------------
app.post("/api/rest/orders", async (req, res) => {
    try {
        console.log("POST /api/rest/orders BODY:", req.body);

        const newOrder = await createOrderRest(req.body);

        res.json({
            message: "Orden creada exitosamente",
            order: newOrder
        });

    } catch (err) {
        console.error("Error POST /api/rest/orders:", err);
        res.status(500).json({ error: err.message });
    }
});



// ----------------------
//        SERVIDOR
// ----------------------
app.listen(3000, () => console.log("Backend listo en http://localhost:3000"));
