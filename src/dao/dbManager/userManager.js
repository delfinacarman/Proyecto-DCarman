/* const fs = require('fs')
const userModel = require('../models/carts.model')
const { User } = require('../models')

class UserManager{
    constructor(){}

    async prepare(){}


    async addUser(user){
        const {firstName, lastName, email} = user

        if(!firstName || !lastName || !email){
            throw new Error('invalid user data')
        }
        //no se si va User o userModel
        await User.create({
            firstName,
            lastName,
            email
        })
    }
} */