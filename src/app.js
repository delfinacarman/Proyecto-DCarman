const express = require('express')

const app = express();

app.use(express.urlencoded({extended:true}))

const users=[
    {id:100,name:"Delfina",lastname:"Carman",gender:"F"},
    {id:200,name:"Antonio",lastname:"Lopez",gender:"M"},
    {id:300,name:"Sol",lastname:"Perez",gender:"F"}
]

app.get('/usuario/:userId',(req,res) => {
    const userId = Number.parseInt(req.params.userId);
    const user = users.find(u => u.id === userId)

    if(!user){
        res.send({status: 'ERROR', message: 'Producto no encontrado'})
        return
    }

    res.json(user)
})

// /usuarios?gender=M => todos los M
app.get('/usuarios',(req,res) => {
    const genderToFilter = req.query.gender
    console.log(`Filtro de genero: ${genderToFilter}`)

    if(!genderToFilter){
        res.json(users)
        return
    }

    const filteredUsers = users.filter(u => u.gender === genderToFilter)

    res.json(filteredUsers)
})


app.listen(8080,() => {
    console.log('Servidor listo')
});