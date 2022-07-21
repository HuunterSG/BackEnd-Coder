import {Router} from "express";
import {productGet, productGetById, productPost, productPut, productDeleted} from "../controllers/logicRoutes.js"

const productRouter = Router();

productRouter.get('/',productGet);
productRouter.get('/:id',productGetById)
productRouter.post('/',productPost)
productRouter.put('/:id',productPut)
productRouter.delete('/:id',productDeleted)

export {productRouter};