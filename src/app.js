const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const express = require('express');
//const ProductManager = require('./entregable.js');

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(`${__dirname}/../public`))


app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)

app.listen(8080,() => {
    console.log('Servidor listo')
});