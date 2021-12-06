import express from "express";
const router=express.Router();
import { getProducts, 
    createProducts, 
    getProductById, 
    deleteProductById, 
    updateProductById } from '../helper.js';
//import { auth } from "../middleware/auth.js";

router
.route("/")
.get( async (request,response)=>
{
    //request->query params
    // console.log(request.query);
    // const filter = request.query;
    // console.log(filter);
    // if(filter.rating){
    //     filter.rating=+filter.rating;
    // }
    
     //db.movies.find({language:"tamil",rating:8})
    const products=  await getProducts();//cursor to array
    //console.log(filterMovies);
    //cursor-pagination 1 2 3 4 5 next->
     response.send(products);
})
.post(async(request,response)=>{
    const data =request.body;
    //const movies=db.movies.insertMany(data)
    const  result = await createProducts(data);
    response.send(result);
});
router.route("/:id")
.get(async (request,response)=>
{
    console.log(request.params);
    const { id } = request.params;
    //db.movies.findOne({id:"102"})
    const product = await getProductById(id);
    //const movie=movies.find((mv)=>mv.id===id);
    console.log(product);
  product ? response.send(product) : response.status(404).send({message:"No matching product found"});

})
.delete(async (request,response)=>
{
    console.log(request.params);
    const { id } = request.params;
    //db.movies.deleteOne({id:"102"})
    const result = await deleteProductById(id);
    //const movie=movies.find((mv)=>mv.id===id);
    console.log(result);
  result.deletedCount > 0 
  ? response.send(result) 
  : response.status(404).send({message:"No matching movie found"});

})
.put(async (request,response)=>
{
    console.log(request.params);
    const { id } = request.params;
    //db.movies.updateOne({id:"102"},{$set:data})
    const data=request.body;
    const result = await updateProductById(id, data);
    const product = await getProductById(id);
    //const movie=movies.find((mv)=>mv.id===id);
    response.send(product);

});
export const productsRouter=router;