const { Router } = require("express");
const CartManager = require("../carrito.js");
const cartManager = new CartManager("./src/carrito.json");
const ProductManager = require ("../entregable.js");
const productManager = new ProductManager("./src/productos.json")

const router = Router();

router.post('/',async(req,res)=>{
    try {
        const newCart = await cartManager.createCart();
        res.end('Carrito creado con exito!');
    } catch (error) {
        console.error("Error al crear el carrito:", error);
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const carts = await cartManager.getCarts();
        const cart = carts.find(cart => cart.id === cartId);
        if (!cart) {
            return res.status(404).json({ error: 'El carrito no existe' });
        }
        res.json({ products: cart.products });
    } catch (error) {
        console.error("Error al obtener los productos del carrito:", error);
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        
        const carts = await cartManager.getCarts();
        const products = await productManager.getProducts();

        const cartIndex = carts.findIndex(cart => cart.id === cartId);
        const product = products.find(product => product.id === productId);

        if (cartIndex === -1) {
            return res.status(404).json({ error: 'El carrito no existe' });
        }

        if (!product) {
            return res.status(404).json({ error: 'El producto no existe' });
        }

        const cart = carts[cartIndex];
        
        const existingProductIndex = cart.products.findIndex(item => item.product === productId);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity++;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cartManager.saveCartToFile(cart);

        res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
    }
});


module.exports = router;
