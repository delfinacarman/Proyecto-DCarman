//const fs = require('fs').promises;

const CartModel = require('../../dao/models/carts.model');

class CartManager{
    //#path

    /* constructor(path){
        this.#path = path
    } */

    async getCarts(limit){
        try{
            //const fileContent = await fs.readFile(this.#path, 'utf-8');
            let carts = await CartModel.find().limit(limit)
            //const carts = JSON.parse(fileContent);

            /* if(limit!==undefined){
                carts=carts.slice(0,limit);
            } */
            return carts;
        }catch(error){
            console.error("Error al leer el archivo: ",error);
            return []
        }
    }

    async getNuevoId(){
        //let nuevoId = 1;
        try{
            let carts = await CartModel.find();
            let nuevoId=1;
            //const carts = await this.getCarts();
            if (carts.length>0){
                const maxId = Math.max(...carts.map(cart => cart.id));
                nuevoId=maxId+1;
            }
            return nuevoId
        }catch(error){
            console.error('Error al obtener productos: ', error)
            return 1;
        }
    }

    async createCart() {
        try {
            const nuevoId=await this.getNuevoId();
            //const carts=getCarts();
            /* const newCart = {
                id: await this.getNuevoId(),
                products: []
            }; */
            const newCart = await CartModel.create({id:nuevoId,products:[]})
            //carts.push(newCart)
            //await this.saveCartToFile(newCart);
            return newCart;
        } catch (error) {
            console.error("Error al crear el carrito:", error);
        }
    }

    /* async saveCartToFile(cart){
        const cartsJSON = JSON.stringify(cart);

        await fs.writeFile(this.#path,cartsJSON,'utf-8')
    } */
}

module.exports = CartManager;