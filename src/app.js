//const productsRouter = require('./routes/products.router.js');
//const cartsRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js');
//const realTimeProductsRouter = require('./routes/realTimeProducts.router.js');
const express = require('express');
const handlebars = require('express-handlebars');
//const usersRouter = require('./routes/users.router.js');
const mongoose = require('mongoose');
const Product = require('./dao/models/products.model.js');
const Cart = require('./dao/models/carts.model.js');

const app = express();

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');

app.use(express.static(`${__dirname}/../public/js`))
//app.use(express.static(`${__dirname}/../public`))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


//app.use('/api/products',productsRouter)
//app.use('/api/carts',cartsRouter)
app.use('/', viewsRouter)
//app.use('/api/realTimeProducts', realTimeProductsRouter)


app.get('/',(req,res)=>{
    res.render('home',{
        title: 'Lista de Productos',
    })
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

