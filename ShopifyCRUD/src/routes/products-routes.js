// src/routes/products-routes.js
import express from "express";
import {
    getProductsRest,
    getProductRestById,
    createProductRest,
    updateProductRest,
    deleteProductRest
} from "../rest/product-rest.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await getProductsRest();
    res.json(data);
});

router.get("/:id", async (req, res) => {
    const data = await getProductRestById(req.params.id);
    res.json(data);
});

router.post("/", async (req, res) => {
    const data = await createProductRest(req.body);
    res.json(data);
});

router.put("/:id", async (req, res) => {
    const data = await updateProductRest(req.params.id, req.body);
    res.json(data);
});

router.delete("/:id", async (req, res) => {
    const data = await deleteProductRest(req.params.id);
    res.json(data);
});

export default router;
