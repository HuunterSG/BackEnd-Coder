import { productNot, invalidInfo, productDelete } from "../consts/consts.js";
import { DbContainer } from "../api/dbcontainer.js";
import { KnexServ } from "../services/knexConfig.js"

const productApi = new DbContainer(KnexServ.KnexMySQL, 'productos');

const productGet= async (req,res)=>{
    try{
        const response = await productApi.getAll();
        if (!response)res.send({error: productNot});
        res.json(response)
    }catch(error){
        res.json({error: error.message})
    }
}

const productGetById = async (req,res)=>{
    try{
        const {id}= req.params;
        const product = await productApi.getById(id);
        if(!product){
            throw{error: productNot}
        }
        res.json(product)
    }catch(error){
        res.json({error: error.message})
    }
}

const productPost = async (req,res)=>{
    try{
        const {title, price, thumbnail} = req.body 
        if((!title,!price,!thumbnail)){
            throw{error: invalidInfo}
        }
        const product= {title,price,thumbnail}
        const productSaved= await productApi.save(product)
        res.json(productSaved)
    }catch(error){
        res.json({error: error.message})
    }
}

const productPut = async (req,res)=>{
    try{
        const {id}=req.params;
        const {title,price,thumbnail}=req.body;
        if((!title,!price,!thumbnail)){
            throw{error: invalidInfo}
        }
        const product= {title,price,thumbnail}
        const productUpdate= await productApi.update(id,product)
        res.json(productUpdate)
    }catch(error){
        res.json({error: error.message})
    }
}

const productDeleted = async (req,res)=>{
    try{
        const {id} = req.params;
        const {product}= await productApi.getById(id);
        if(!product){
            throw{error:productNot}
        }
        const productDeleted = await productApi.deleteById(id);
        res.json({
            mensaje:productDelete,
            productDeleted: product,
        })
    }catch (error) {
        res.json({ error: error.message });
    }
}

export{productGet, productGetById, productPost, productPut, productDeleted}