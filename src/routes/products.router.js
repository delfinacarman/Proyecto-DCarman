const { Router } = require("express");
const ProductManager = require('../entregable');
const productManager = new ProductManager('./src/productos.json');

const router = Router();


router.get('/',async(req,res)=>{
    try{
        let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const productos = await productManager.getProducts(limit);
        res.json({products: productos});
        return
    }
    catch(err){
        res.json({error: 'Error al obtener productos'})
    }
})

router.get('/:pid',async(req,res)=>{
    try{
        const producto = await productManager.getProductById(parseInt(req.params.pid));
        if(!producto){
            res.json({error: 'Producto inexistente: ' + req.params.pid})
            return
        }else{
            res.json(producto);
            return
        }
    }
    catch(err){
        res.json({error: 'Error al obtener producto: ' + req.params.pid})
    }
})

router.post('/',async(req,res)=>{
    try{
        const product = {...req.body};
        await productManager.addProduct(product);
        res.end('Producto agregado con éxito!');
    }
    catch(err){
        res.json({error: 'Error al agregar producto'})
    }

})

router.put('/:pid',async(req,res)=>{
    try{
        const producto = await productManager.updateProduct(parseInt(req.params.pid),req.body);
        if(!producto){
            res.end('Producto inexistente ')
            return
        }else{
            res.json(producto);
            return
        }
    }
    catch(err){
        res.json({error: 'Error al obtener producto: ' + req.params.pid})
    }
})

router.delete('/:pid',async(req,res)=>{
    try{
        const producto = await productManager.deleteProductProduct(parseInt(req.params.pid));
        if(!producto){
            res.end('Producto inexistente ')
            return
        }else{
            res.json(producto);
            return
        }
    }
    catch(err){
        res.json({error: 'Error al obtener producto: ' + req.params.pid})
    }
})

module.exports = router;
