import {
    createProductGraphql,
    getProductsGraphql,
    updateProductGraphql,
    deleteProductGraphql
} from "../graphql/productGraphql.js";

async function testGraphqlCrud() {
    console.log("\n=== CREAR ===");
    const newProduct = await createProductGraphql("Producto desde node con GraphQL", "<p>Descripcion del producto desde node con GraphQL</p>")
    console.log(JSON.stringify(newProduct, null, 2));

    const productId = newProduct?.data?.productCreate?.product?.id;

    console.log("\n=== LISTAR ===");
    const products = await getProductsGraphql();
    console.log(JSON.stringify(products, null, 2));

    console.log("\n=== ACTUALIZAR ===");
    const updated = await updateProductGraphql(productId, "Producto GraphQL Actualizado, por el Sirilo");
    console.log(JSON.stringify(updated, null, 2));

    console.log("\n=== ELIMINAR ===");
    const deleted = await deleteProductGraphql(productId);
    console.log(JSON.stringify(deleted, null, 2));
}
testGraphqlCrud();