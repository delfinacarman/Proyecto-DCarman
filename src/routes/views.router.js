const {Router} = require('express');

const router = Router();
const ProductManager = require ("../dao/dbManager/productManager.js");
const productManager = new ProductManager("./src/productos.json")

router.get('/',async(req,res)=>{
    try{
        const products = await productManager.getProducts();
        res.render('home',{
            products,
            title: "Productos",
            useWS: true
        })
    }catch(error){
        console.error('Error al obtener los productos: ', error);
    }
})



module.exports = router;