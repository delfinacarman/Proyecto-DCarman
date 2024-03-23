//const productsRouter = require('./routes/products.router.js');
//const cartsRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js');
const realTimeProductsRouter = require('./routes/realTimeProducts.router.js');
const express = require('express');
const handlebars = require('express-handlebars');
const {Server} = require('socket.io');

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
app.use('/api/realTimeProducts', realTimeProductsRouter)


app.get('/',(req,res)=>{
    res.render('home',{
        title: 'Lista de Productos',
    })
})


const httpServer = app.listen(8080,() => {
    console.log('Servidor listo')
});

const io = new Server(httpServer);
app.set('ws',io);


io.on('connection',(clientSocket)=>{
    console.log(`Cliente conectado, ID: ${clientSocket.id}`)
})