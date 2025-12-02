// src/routes/orderRoutes.js
import express from "express";
import { getOrdersRest, createOrderRest } from "../rest/order-rest.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const data = await getOrdersRest();
    res.json(data);
});

router.post("/", async (req, res) => {
    const newOrder = await createOrderRest(req.body);
    res.json({ message: "Orden creada exitosamente", order: newOrder });
});

export default router;
