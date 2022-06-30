import { Router } from "express";
import { productDelete, productNot } from "../const/const.js";
import { ContMemory } from "../api/contMemory.js";

const routerProd = Router();
const apiProd = new ContMemory();

routerProd.get("/",(req, res) => {
    const response = apiProd.getAll();

    if(!response) res.send({error: productNot});

    res.render("productos", { productos: response });
});

routerProd.post("/", (req,res) => {
    const {title, price} =req.body;
    apiProd.save({title, price})
    res.redirect("/");
})

export {routerProd};

