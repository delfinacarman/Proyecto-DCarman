const express = require('express');
const ProductManager = require('./entregable.js');

const app = express();

app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager('./productos.json');

app.get('/productos',async(req,res) => {
    try{
        let limit = req.query.limit ? parseInt(req.query.limit):undefined;
        const productos = await productManager.getProducts(limit);
        res.json({products: productos});
        return
    }
    catch(err){
        res.json({error: 'Error al obtener productos'})
    }
})

app.get('/productos/:pid',async(req,res) => {
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


app.listen(8080,() => {
    console.log('Servidor listo')
});