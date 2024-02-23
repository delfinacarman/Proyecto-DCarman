class ProductManager{
    static #ultimoId = 1;
    #products

    constructor(){
        this.#products = [];
    }

    getProducts(){
        return this.#products;
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
    }

    getProductById(idProd){
        const productToFind = this.#products.find(prod=>prod.id === idProd);
        if (!productToFind){
            console.error("Not Found")
            return null
        }else{
            return(productToFind)
        }
    }
}

const manager = new ProductManager();
manager.addProduct('titulo','titulo prueba',50,'sin imagen','abc123',25);
console.log(manager.getProductById(1));
manager.addProduct('titulo','titulo prueba',50,'sin imagen','abc123',25);
console.log(manager.getProductById(5));