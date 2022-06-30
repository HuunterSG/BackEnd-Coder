import express from "express";
import handlebars from "express-handlebars";
import {routerProd} from "./routers/router.js"


const app = express();
const PORT= 3000;

app.engine(
    "hbs",
    handlebars.engine({
      extname: ".hbs",
      defaultLayout: "main.hbs",
    })
  );
app.set("views", "./views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/productos", routerProd);

app.get("/", (req, res)=>{
    res.render("form")
})

app.listen(PORT, ()=> console.log(`server corriendo en puerto ${PORT}`))