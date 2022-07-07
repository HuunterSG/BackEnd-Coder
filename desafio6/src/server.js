import express from "express";
import {Server as HttpServer} from "http";
import {Server as IOServer} from "socket.io";
import { MemoryContainer, FileSystemCont} from "./api/index.js" 
import { utilsDate } from "./date/utilsDate.js";

const msjsApi = new MemoryContainer();
const productsApi = new FileSystemCont("products");

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const PORT = 8080;

app.use(express.static("public"));

io.on("connection", async(socket)=>{
    console.log(`Nuevo cliente conectado ${socket.id}`)

    socket.emit("msjs", msjsApi.getAll())

    socket.on("msjNuevo", ({email,text})=>{
        const msj = {email, text, timestamp:utilsDate.getTimestamp()}
        msjsApi.save(msj)

        io.sockets.emit("msjs", msjsApi.getAll())
    })

    socket.emit("products", await productsApi.getAll())

    socket.on("add-product", async (data)=>{
        const products = await productsApi.save(data)
        io.sockets.emit("products", products)
    })
})

const server = httpServer.listen(PORT,()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`)
})
server.on("error",(error)=>{
    console.error(`Error en el servidor ${error}`)
})