const express= require('express');
const app = express()
const {Router}= require('express')
const router= Router();

app.use(express.static('../public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', router);
app.on('error', ()=>{console.log('error del server')});
const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`servidor corriendo en http://localhost:${PORT}`)
})




//LLAMAR LOGICA DE LAS RUTAS:
const {productosGet, productosGetById, productoPost, productoPut, productoDelete} = require('./logic_route')

//RUTAS:
router.get('/',productosGet)
router.get('/:id',productosGetById)
router.post('/', productoPost)
router.put('/:id',productoPut)
router.delete('/:id',productoDelete)

//EL DELETE ANDA.
//PRODUCTOS GET ANDA
//PRODUCTO POST ANDA
//PRODUCTO PUT ANDA 
//PRODUCTO BYID ANDA