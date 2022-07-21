import express from "express";
import {Server as HttpServer} from 'http';
import {Server as IOServer} from 'socket.io';
import { DATE_UTILS } from "./utils/dateUtils.js";
import { DbContainer } from "./api/dbcontainer.js";
import { KnexServ } from "./services/knexConfig.js";
import { productRouter } from "./routers/routes.js";
import { config } from "./config/index.js";
import { allowedNodeEnvironmentFlags } from "process";

const MessagesApi = new DbContainer(KnexServ.KnexSqlite, 'mensajes');
const ProductsApi = new DbContainer(KnexServ.KnexMySQL, 'productos');

const app = express();
const httpServer = new HttpServer(app);
const io= new IOServer(httpServer);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/productos',productRouter);

io.on('connection', async (socket)=>{
    console.log (`Nuevo cliente conectado ${socket.id}`)
    
    socket.emit('mensajes', await MessagesApi.getAll());

    socket.on('mensajeNuevo', async ({email, text})=>{
        const msg = {email, text, timestamp: DATE_UTILS.getTimestamp()};
        await MessagesApi.save(msg)

        io.sockets.emit('mensajes', await MessagesApi.getAll());
    });

    socket.emit('products', await ProductsApi.getAll());

    socket.on('add-product', async(data)=>{
        await ProductsApi.save(data);
        io.sockets.emit('products', await ProductsApi.getAll())
    });
});
KnexServ.init();

const server = httpServer.listen(config.server.PORT, ()=>{
    console.log(`Server escuchando en puerto: ${server.address().port}`)
})
server.on('error',(error)=>{
    console.log(`Server error: ${error}`)
})