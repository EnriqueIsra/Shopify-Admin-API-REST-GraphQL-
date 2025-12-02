import express from "express";
import cors from "cors";

import { getOrdersRest, createOrderRest } from "../rest/order-rest.js";

const app = express();
app.use(cors());
app.use(express.json());

// =====================================
// GET ALL ORDERS (TEST)
// =====================================
app.get("/test/orders", async (req, res) => {
    try {
        const data = await getOrdersRest();
        res.json(data);
    } catch (err) {
        console.error("Error GET /test/orders: ", err);
        res.status(500).json({ error: err.message });
    }
});

// =====================================
// CREATE ORDER (TEST)
// =====================================
app.post("/test/orders", async (req, res) => {
    try {
        const newOrder = await createOrderRest(req.body);

        res.json({
            message: "Orden creada exitosamente",
            order: newOrder
        });

    } catch (err) {
        console.error("Error en createOrderRest:", err.message);
        res.status(500).json({ error: err.message });
    }
});


// =====================================
// RUN SERVER
// =====================================
const PORT = 4003;
app.listen(PORT, () => {
    console.log(`Test Orders REST running on http://localhost:${PORT}`);
});

