import express from "express";
import { 
    getProductsGraphql,
    createProductGraphql,
    updateProductGraphql,
    deleteProductGraphql
 } from "../graphql/product-graphql.js";
const router = express.Router();
import { shopifyConfig } from "../config/shopify.js";
import { httpRequest } from "../utils/http-client.js";

router.post("/", async (req, res) => {
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

router.get("/products", async (req, res) => {
    const data = await getProductsGraphql();
    res.json(data);
});

router.post("/products", async (req, res) => {
    const { title, description, price } = req.body;
    try {
        const data = await createProductGraphql(title, description, price);
        res.json(data);
    } catch (err) {
        console.error("Error en /api/graphql/products:", err);
        res.status(500).json({ error: err.message || err });
    }
});

router.put("/products/:id", async (req, res) => {
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

router.delete("/products/:id", async (req, res) => {
    const data = await deleteProductGraphql(req.params.id);
    res.json(data);
});

export default router;