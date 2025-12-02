// src/tests/testGraphql.js

import {
    createProductGraphql,
    getProductsGraphql,
    updateProductGraphql,
    deleteProductGraphql
} from "../graphql/product-graphql.js";

console.log("=== CREAR PRODUCTO CON PRECIO ===\n");

const created = await createProductGraphql(
    "Playera GraphQL",
    "<p>Descripción de prueba GraphQL</p>",
    "199.00"
);

console.log("\n--- RESPUESTA CREACIÓN ---");
console.log(JSON.stringify(created, null, 2));

console.log("\nID Producto:", created.product.id);
console.log("ID Variante:", created.variantId);
console.log("Precio inicial:", created.initialPrice);
console.log("Precio final:", created.finalPrice);

// =============================
// LISTAR PRODUCTOS
// =============================
console.log("\n=== LISTAR PRODUCTOS ===");
const list = await getProductsGraphql();
console.log(JSON.stringify(list, null, 2));

// =============================
// ACTUALIZAR PRODUCTO + PRECIO
// =============================
console.log("\n=== ACTUALIZAR PRODUCTO Y PRECIO ===");

const updated = await updateProductGraphql(
    created.product.id,
    "Playera GraphQL EDITADA",
    "250.00",
    created.variantId
);

console.log(JSON.stringify(updated, null, 2));
console.log("Precio actualizado:", updated.updatedPrice);

// =============================
// ELIMINAR PRODUCTO
// =============================
console.log("\n=== ELIMINAR PRODUCTO ===");
const deleted = await deleteProductGraphql(created.product.id);
console.log(JSON.stringify(deleted, null, 2));

console.log("\nCRUD GraphQL COMPLETADO ✔");
