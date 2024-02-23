const fs = require('fs');


class ProductManager{
    static #ultimoId = 1;
    #products
    #path

    constructor(path){
        this.#products = [];
        this.#path = path
    }

    getProducts(){
        try{
            const fileContent = fs.readFileSync(this.#path, 'utf-8');
            const products = JSON.parse(fileContent);
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

    addProduct(title,description,price,thumbnail,code,stock){

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios");
            return
        }

        const existingCode = this.#products.some(prod => prod.code === code);
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

        this.#products.push(product);
        this.saveProductsToFile();
    }

    saveProductsToFile(){
        const productsJSON = JSON.stringify(this.#products);

        fs.writeFileSync(this.#path,productsJSON,'utf-8')
    }

    getProductById(idProd){
        try{
            const products = this.getProducts();
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

    updateProduct(idProd,updateFields){
        try{
            const products = this.getProducts();
            const index = products.findIndex(prod => prod.id === idProd);
            if(index !== -1){
                products[index] = {...products[index], ...updateFields};
                fs.writeFileSync(this.#path,JSON.stringify(products),'utf-8');
                console.log("Producto actualizado con éxito!")
            }else{
                console.log("Producto no encontrado");
            }
        }catch(error){
            console.error("Error al actualizar el producto: ",error);
        }
    }

    deleteProduct(idProd){
        try{
            let products = this.getProducts();
            products = products.filter(prod => prod.id !== idProd);
            fs.writeFileSync(this.#path,JSON.stringify(products),'utf-8');
            console.log("Producto eliminado con éxito!")
        }catch(error){
            console.error("Error al eliminar el producto: ",error);
        }
    }
}

const manager = new ProductManager('productos.json');
manager.addProduct('titulo','titulo prueba',50,'sin imagen','abc123',25);
console.log(manager.getProductById(1));
manager.addProduct('titulo','titulo prueba',50,'sin imagen','def123',25);
console.log(manager.getProducts());
manager.updateProduct(1,{title:'cambio de titulo'});
manager.deleteProduct(2);