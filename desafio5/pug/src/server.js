import express from "express";

import {routerProd} from "./routers/router.js"


const app = express();
const PORT= 5000;


app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/productos", routerProd);

app.get("/", (req, res)=>{
    res.render("form")
})

app.listen(PORT, ()=> console.log(`server corriendo en puerto ${PORT}`))