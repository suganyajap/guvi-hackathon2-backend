import { client } from "./index.js";

async function updateProductById(id, data) {
    return await client
        .db("b28wd")
        .collection("products")
        .updateOne({id:id}, { $set: data });
}
 async function createProducts(data) {
    return await client.db("b28wd").collection("products").insertMany(data);
}


 async function getProducts() {
    return await client
        .db("b28wd")
        .collection("products")
        .find({})
        .toArray();
}
 async function deleteProductById(id) {
    return await client
        .db("b28wd")
        .collection("products")
        .deleteOne({ id:id});
}//_id: ObjectId(id) id:id
 async function getProductById(id) {
     console.log("***",id);
    return await client
        .db("b28wd")
        .collection("products")
        .findOne({ id: id});
}


export { getProducts, 
    createProducts, 
    getProductById, 
    deleteProductById, 
    updateProductById ,
   
}