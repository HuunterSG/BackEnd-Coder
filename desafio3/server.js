const express= require('express');

app = express();

const fs = require('fs');

 const start = (require, response) => {
    fs.readFile('./desafio3/instructions.txt', 'utf-8', (error, data)=>{
        if (error) console.log(error);
        const instructions = JSON.parse(data);
        response.json({
            instructions
        })
    })
}

const getProducts = (require, response) => {
    fs.readFile('./desafio3/products.txt', 'utf-8', (error, data)=>{
        if (error) console.log(error);
        const products = JSON.parse(data);
        response.json({
            products
        })
    })
}

const getProductRandom = (require, response) => {
    fs.readFile('./desafio3/products.txt', 'utf-8', (error, data)=>{
        if (error) error;
        const products = JSON.parse(data);
        const productRandom = Math.floor(Math.random()*products.length)
        response.json({
            product: products[productRandom]
        })
    })
}

app.get('/', start )
app.get('/products', getProducts);
app.get('/productRandom', getProductRandom);

const PORT=8080;

const server = app.listen(PORT, ()=>{
    console.log(`Server listen in port http://localhost:${PORT}`)
})

server.on('error', (error)=> console.log(error));