const {promises: fs} = require('fs');

// CLASE: CONSTRUCTOR Y METODOS
class Contenedor {
    constructor(ruta) {
        this.ruta = ruta
    }


    async getAll(){
        try{
            const objs= await fs.readFile(this.ruta,'utf-8')
            return JSON.parse(objs)
        }catch{
            return []
        }
    }

    async save(obj){
        const objs= await this.getAll();
        let newId;

        if (objs.length == 0){
            newId=1;
        }else{
            newId= objs[objs.length - 1].id + 1;
        }

        const newObj = {...obj, id: newId}
        objs.push(newObj);
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs,null,2));
                return newId
        }catch(error){
            console.log(`Error to save the object ${error}`)
        }
    }

    async getById(id){
        
        const objs = await this.getAll()
        const obj = objs.find(o => o.id == id);
        return obj
        

    }

    async deleteById(id){
        let collection = []
        await fs.readFile(`./${this.ruta}`,'utf-8')
        .then( cont => {
            let collect = JSON.parse(cont)
            for (const x of collect){
                if(x.id != id){
                    collection.push(x)
                }
            }
        })
        .catch( error => console.log(error));
        await fs.writeFile(`./${this.ruta}`, JSON.stringify(collection));
        console.log('Delete Object with ID!');
       
    }

    async deleteAll(){
        await fs.writeFile(`./${this.ruta}`, '');
        console.log('Delete all objects')
        
    }

}

// PRODUCTOS:
const product1 = {
    "title": "Fernet",
    "price": 1000,
    "id": 1
  }
const product2 = {
    "title": "Coca-Cola",
    "price": 200,
    "id": 2
  }
const product3 = {
    "title": "Cerveza: Andes Negraa",
    "price": 250,
    "id": 3
  }
const product4 = {
    "title": "Cerveza: Andes Roja",
    "price": 220,
    "id": 4
  }


async function challenge(){
    const file = new Contenedor('./desafio2/products.txt');
    
    console.log('Products: ')
    let objs = await file.getAll();
    console.table(objs)
    console.log('-- xxxxxxxx --')

    console.log('Save products')
    let idP1= await file.save(product1)
    console.log(`ID of product: ${idP1}`);
    console.log('-- xxxxxxxx --')
    let idP2= await file.save(product2)
    console.log(`ID of product: ${idP2}`);
    console.log('-- xxxxxxxx --')
    let idP3= await file.save(product3)
    console.log(`ID of product: ${idP3}`);
    console.log('-- xxxxxxxx --')
    let idP4= await file.save(product4)
    console.log(`ID of product: ${idP4}`);
    console.log('-- xxxxxxxx --')

    console.log('Products: ')
    objs = await file.getAll();
    console.table(objs)
    console.log('-- xxxxxxxx --')

    console.log('Search product for ID')
    const res = await file.getById(idP2)
    console.log(`Your product is: ${res.title} \nThe cost is $${res.price}`)
    console.log('-- xxxxxxxx --')

    console.log('Delete for ID')
    objs = await file.deleteById(4)
    objs = await file.getAll();
    console.table(objs)
    console.log('-- xxxxxxxx --')

    console.log('Delete All')
    objs = await file.deleteAll();
    objs = await file.getAll();
    console.table(objs)
    console.log('-- xxxxxxxx --')
}

challenge();