import { getProductsRest, createProductRest, updateProductRest, deleteProductRest } from "./rest/productRest.js"

async function main() {

    // CREATE

    const newProduct = await createProductRest({
        title: "Producto generado desde Node con REST",
        body_html: "<strong>Descripción del producto</strong>",
        vendor: "Sirilo's Clothes",
        product_type: "Custom",
        price: "250"
    });

    console.log("Producto creado: ", newProduct);
    const variantId = newProduct.product.variants[0].id;
    const precioInicial = newProduct.product.variants[0].price;
    console.log("variantId: ", variantId);
    console.log("precio inicial: ", precioInicial);

    // GET
    const getProducts = await getProductsRest();
    console.log("Productos: ", getProducts);

    // UPDATE
    const productUpdated = await updateProductRest(newProduct.product.id, {
        title: "Producto Actualizado desde Node con REST",
        price: "280",
        variantId: variantId
    }); 
    const precioActualizado = productUpdated.product.variants[0].price;
    console.log("Precio actualizado: ", precioActualizado);
    console.log("Producto actualizado: ", productUpdated);

    // DELETE
    const productDeleted = await deleteProductRest(newProduct.product.id);
    console.log("Producto eliminado: ", productDeleted)
}
main();