const {response, request}= require('express');

const fs = require('fs');

const db= '../database/productos.txt';
const utf= 'utf-8';

//MUESTRA TODOS
const productosGet= async (request,response)=>{
    const productos = JSON.parse(fs.readFileSync(db,utf));

    response.json({
        productos
    })
}

//MUESTRA POR ID
const productosGetById = async(request,response)=>{
    const productos = JSON.parse(fs.readFileSync(db,utf));
    let productoId = productos.find(producto=> producto.id === parseInt(request.params.id));

    if(!productoId){
        return response.status(400).json({
            error:'producto no disponible'
        });
    }

    return response.json({
        productoId
    });
}

//INGRESA PRODUCTO
const productoPost = async(request,response)=>{
    const{title,price,thumbnail} = request.body;
    const productos = JSON.parse(fs.readFileSync(db,utf));

    const productoNuevo ={
        id: parseInt(productos[productos.length -1].id)+1,
        title,
        price,
        thumbnail
    }

    productos.push(productoNuevo)

    fs.writeFileSync(db, JSON.stringify(productos),utf);

    response.json({
        productoNuevo
    })
}

//ACTUALIZAMOS PRODUCTO
const productoPut = async (request, response) =>{
    
    //leo base de datos
    const productos = JSON.parse(fs.readFileSync(db,utf));
    
    //id del producto a modificar
    const idProductoAModificar = parseInt(request.params.id);
    
    //encuentro el producto a modificar
    const productoAModificar = productos.find(producto => producto.id === idProductoAModificar);
        //si no es el producto doy error
    if(!productoAModificar){
        return response.status(400).json({
            error:'producto no disponible'
        })
    }

    //obtengo indice del obj viejo para actualizar con el nuevo
    const index = productos.findIndex(producto=> producto === productoAModificar)

    //Leo datos de request
    const{title,price,thumbnail} = request.body;
    
    //modifico obj
    productoAModificar.title= title;
    productoAModificar.price= price;
    productoAModificar.thumbnail= thumbnail;

    //cambio posicion para luego guardar
    productos.splice(index, 1, productoAModificar);

    fs.writeFileSync(db, JSON.stringify(productos, utf))

    //Respuesta sobre producto modificado
    response.json({
        msg: 'El producto fue modificado con exito',
        productoAModificar
    })
}

//BORRAMOS PRODUCTO
const productoDelete = async (request, response)=>{
    //leo base de datos
    const productos = JSON.parse(fs.readFileSync(db,utf));
    
    //id del producto a borrar
    const idProductoDelete = parseInt(request.params.id);

    //encontrar producto q deseo borrar
    const productoDelete = productos.find(producto=> producto.id === idProductoDelete)

    if(!productoDelete){
        return response.status(400).json({
            error:'producto no disponible'
        })
    }

    //obtener indice
    const index= productos.findIndex(producto=>producto===productoDelete)

    //elimino y luego guardo
    productos.splice(index, 1);

    fs.writeFileSync(db, JSON.stringify(productos),utf)

    //respuesta
    response.json({
        productoDelete,
        msg:'Este producto fue eliminado con exito'
    })

}

module.exports ={
    productosGet, productosGetById, productoPost, productoPut, productoDelete
}
