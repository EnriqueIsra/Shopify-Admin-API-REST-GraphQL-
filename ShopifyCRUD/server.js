import express from "express";
import cors from "cors";

import productRoutes from "./src/routes/products-routes.js";
import productGraphqlRoutes from "./src/routes/products-graphql-routes.js"
import orderRoutes from "./src/routes/orders-routes.js";
import customerRoutes from "./src/routes/customers-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rest/products", productRoutes);
app.use("/graphql", productGraphqlRoutes);
app.use("/api/rest/orders", orderRoutes);
app.use("/api/rest/customers", customerRoutes);

app.listen(3000, () => console.log("Backend listo en http://localhost:3000"));
