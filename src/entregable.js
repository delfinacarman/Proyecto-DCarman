const fs = require('fs').promises;


class ProductManager{
    static #ultimoId = 1;
    #path

    constructor(path){
        this.#path = path
    }

    async getProducts(limit){
        try{
            const fileContent = await fs.readFile(this.#path, 'utf-8');
            const products = JSON.parse(fileContent);

            if(limit!==undefined){
                products=products.slice(0,limit);
            }

            return products;
        }catch(error){
            console.error("Error al leer el archivo: ",error);
            return []
        }
    }

    #getNuevoId(){
        const id = ProductManager.#ultimoId;
        ProductManager.#ultimoId++;
        return id
    }

    async addProduct(title,description,price,thumbnail,code,stock){

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios");
            return
        }

        const products = await this.getProducts();
        const existingCode = products.some(prod => prod.code === code);
        if (existingCode){
            console.error("Este codigo ya existe");
            return
        }

        const product={
            id: this.#getNuevoId(),
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        products.push(product);
        await this.saveProductsToFile();
    }

    async saveProductsToFile(){
        const productsJSON = JSON.stringify(products);

        await fs.writeFile(this.#path,productsJSON,'utf-8')
    }

    async getProductById(idProd){
        try{
            const products = await this.getProducts();
            const productToFind = products.find(prod=>prod.id === idProd);
            if (!productToFind){
                console.error("Not Found")
                return null
            }else{
                return(productToFind)
            }
        }catch(error){
            console.error("Error al leer el archivo: ", error);
            return null;
        }
    }

    async updateProduct(idProd,updateFields){
        try{
            const products = await this.getProducts();
            const index = products.findIndex(prod => prod.id === idProd);
            if(index !== -1){
                products[index] = {...products[index], ...updateFields};
                await this.saveProductsToFile(products);
                console.log("Producto actualizado con éxito!")
            }else{
                console.log("Producto no encontrado");
            }
        }catch(error){
            console.error("Error al actualizar el producto: ",error);
        }
    }

    async deleteProduct(idProd){
        try{
            let products = await this.getProducts();
            products = products.filter(prod => prod.id !== idProd);
            await this.saveProductsToFile(products);
            console.log("Producto eliminado con éxito!")
        }catch(error){
            console.error("Error al eliminar el producto: ",error);
        }
    }
}

module.exports = ProductManager;


/*const manager = new ProductManager('productos.json');
manager.addProduct('titulo','titulo prueba',50,'sin imagen','abc123',25);
manager.addProduct('titulo','titulo prueba',50,'sin imagen','def123',25);
console.log(manager.getProducts());
manager.updateProduct(1,{title:'cambio de titulo'});
manager.deleteProduct(2); */