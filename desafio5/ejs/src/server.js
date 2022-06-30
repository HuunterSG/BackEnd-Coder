import express from "express";
import {routerProd} from "./routers/router.js"


const app = express();
const PORT= 8080;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/productos", routerProd);

app.get("/", (req, res)=>{
    res.render("index")
})

app.listen(PORT, ()=> console.log(`server corriendo en puerto ${PORT}`))