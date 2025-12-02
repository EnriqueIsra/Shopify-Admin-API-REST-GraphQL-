import express from "express";
import {
    getCustomersRest,
    getCustomerRestById,
    createCustomerRest,
    updateCustomerRest,
    deleteCustomerRest
} from "../customers/customers-rest.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await getCustomersRest();
    res.json(customers);
  } catch (err) {
    console.error("Error GET /api/rest/customers:", err);
    res.status(500).json({ error: "Error obteniendo clientes" });
  }
});

router.get("/:id", async (req, res) => {
    res.json(await getCustomerRestById(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await createCustomerRest(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await updateCustomerRest(req.params.id, req.body));
});

router.delete("/:id", async (req, res) => {
    res.json(await deleteCustomerRest(req.params.id));
});

export default router;
