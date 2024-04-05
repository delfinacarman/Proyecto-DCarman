const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const express = require('express');
const {Server} = require('socket.io');
const usersRouter = require('./routes/users.router.js');
const mongoose = require('mongoose');

const app = express();


app.use(express.static(`${__dirname}/../public/js`))


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter)
app.use('/api/users',usersRouter)


app.get('/',(req,res)=>{
    res.send('Bienvenido a la pagina de Delfi')
})

/* const main = async () => {
    await mongoose.connect(
        'mongodb+srv://delficarman:soltomas@codertest.olqdfqh.mongodb.net/?retryWrites=true&w=majority&appName=CoderTest',
        {
            dbName:'coder-delfi'
        }
    )

    app.listen(8080,() => {
        console.log('Servidor listo')
    });
}

main(); */


const httpServer = app.listen(8080,() => {
    console.log('Servidor listo')
})
