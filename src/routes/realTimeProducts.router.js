const { Router } = require('express');

const router = Router();
const ProductManager = require('../entregable');
const productManager = new ProductManager('./src/productos.json');



router.get('/', async (_, res) => {
    try {
        const products = await productManager.getProducts();

        const productsData = products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            code: product.code,
            stock: product.stock,
            category: product.category,
            thumbnail: product.thumbnail,
            status: true
        }));


        res.render('realTimeProducts', {
            products: productsData,
            useWS: true
        });
    } catch (error) {
        console.error(error);
        res.send('Error interno del servidor');
    }
});

router.post('/', async (req, res) => {
    try {
        const product = {...req.body};
        await productManager.addProduct(product);
        req.app.get('ws').emit('product',product)
        res.status(301).redirect('/api/realTimeProducts');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const producto = await productManager.getProductById(parseInt(req.params.pid));
        const productoelim = await productManager.deleteProduct(parseInt(req.params.pid));
        if(!producto){
            res.end('Producto inexistente ')
        }else{
            res.end('Producto eliminado con exito!');
        }

        req.app.get('ws').emit('updateFeed', products);

        res.status(301).redirect('/realTimeProducts');
    } catch {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;