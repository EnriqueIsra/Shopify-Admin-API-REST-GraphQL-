import { getProductsRest, createProductRest, updateProductRest, deleteProductRest } from "./rest/productRest.js"

async function main() {

    // CREATE

    const newProduct = await createProductRest({
        title: "Producto generado desde Node con REST",
        body_html: "<strong>Descripción del producto</strong>",
        vendor: "Sirilo's Clothes",
        product_type: "Custom"
    });

    console.log("Producto creado: ", newProduct);

    // GET
    const getProducts = await getProductsRest();
    console.log("Productos: ", getProducts);

    // UPDATE
    const productUpdated = await updateProductRest(newProduct.product.id, {
        title: "Producto Actualizado desde Node con REST"
    }); 
    console.log("Producto actualizado: ", productUpdated);

    // DELETE
    const productDeleted = await deleteProductRest(newProduct.product.id);
    console.log("Producto eliminado: ", productDeleted)
}
main();