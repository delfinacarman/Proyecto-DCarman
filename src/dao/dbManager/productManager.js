//const fs = require('fs').promises;
const ProductModel = require('../../dao/models/products.model');

class ProductManager{
    //#path

    /* constructor(path){
        this.#path = path
    } */

    async getProducts(limit){
        try{
            //const fileContent = await fs.readFile(this.#path, 'utf-8');
            //let products = JSON.parse(fileContent);
            let products = await ProductModel.find().limit(limit);
            /* if(limit!==undefined){
                products=products.slice(0,limit);
            } */
            return products;
        }catch(error){
            console.error("Error al leer el archivo: ",error);
            return []
        }
    }

    async getNuevoId(){
        //let nuevoId = 1;
        try{
            //const products = await this.getProducts();
            let products= await ProductModel.find();
            let nuevoId=1;
            if (products.length>0){
                const maxId = Math.max(...products.map(product => product.id));
                nuevoId=maxId+1;
            }
            return nuevoId
        }catch(error){
            console.error('Error al obtener productos: ', error);
            return 1
        }
    }

    async addProduct(product){

        try{
            const nuevoId=await this.getNuevoId();
            const newProduct=await ProductModel.create({
                id:nuevoId,
                title:product.title,
                description:product.description,
                price:product.price,
                code:product.code,
                stock:product.stock,
                category:product.category,
                thumbnail: product.thumbnail,
                status:true
            });
            return newProduct;
        }catch(error){
            console.error("Error al agregar el producto:",error);
        }

        /* const { title, description, price, code, stock, category, thumbnail } = product;

        const products = await this.getProducts();
        const existingCode = products.some(prod => prod.code === code);
        if (existingCode){
            console.error("Este codigo ya existe");
            return
        }

        const newProduct={
            id: await this.#getNuevoId(),
            title,
            description,
            price,
            code,
            stock,
            category,
            thumbnail,
            status: true,
        }

        products.push(newProduct);
        await this.saveProductsToFile(products); */
    }

/*     async saveProductsToFile(products){
        const productsJSON = JSON.stringify(products);

        await fs.writeFile(this.#path,productsJSON,'utf-8')
    } */

    async getProductById(idProd){
        try{
            //const products = await this.getProducts();
            const product = await ProductModel.findById(idProd)
            /* const productToFind = products.find(prod=>prod.id === idProd);
            if (!productToFind){
                console.error("Not Found")
                return null
            }else{
                return(productToFind)
            } */
            return product
        }catch(error){
            console.error("Error al leer el archivo: ", error);
            return null;
        }
    }

    async updateProduct(idProd,updateFields){
        try{
            const updatedProduct = await ProductModel.findByIdAndUpdate(idProd,updateFields,{new:true});
            if(!updatedProduct){
                console.log('Producto no encontrado')
            }else{
                console.log('Producto actualizado con exito!')
                return updatedProduct;
            }
        }catch(error){
            console.error("Error al actualizar el producto: ", error)
        }
        /* try{
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
        } */
    }

    async deleteProduct(idProd){
        try{
            const deletedProduct=await ProductModel.findByIdAndDelete(idProd);
            //let products = await this.getProducts();
            //products = products.filter(prod => prod.id !== idProd);
            //await this.saveProductsToFile(products);
            //console.log("Producto eliminado con éxito!")
            if(!deletedProduct){
                console.log("Producto no encontrado")
            }else{
                console.log("Producto eliminado con exito!")
            }
            return deletedProduct;
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