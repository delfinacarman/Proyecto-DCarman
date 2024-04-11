/* const {Router} = require('express');
const {User} = require('../dao/models')

const router = Router();

router.get('/', async(req,res)=>{

    const users = await User.find({})

    res.json(users);

})

router.post('/', async(req,res)=>{

    const {firstName,lastName,email} = req.body;

    const result = await User.create({
        firstName,
        lastName,
        email
    })

    res.json(result);

})



module.exports = router; */