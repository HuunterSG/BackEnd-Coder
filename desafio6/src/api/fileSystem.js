import fs from "fs";

class FileSystemCont{
    constructor(filename){
        this.path =`src/db/${filename}.json`
    }

    //Mostramos todos los elementos, o un array vacio
    async getAll(){
        try{
            const file = await fs.promises.readFile(this.path);
            return JSON.parse(file);
        }catch(error){
            await fs.promises.writeFile(this.path, JSON.stringify([]));
            return [];
        }
    }

    //Guardamos el elemnto
    async save(element){
        try{
            const elements = await this.getAll();
            element.id= elements.length === 0 ? 1 : elements[elements.length - 1].id + 1
            elements.push(element)
            await fs.promises.writeFile(this.path, JSON.stringify(elements, null, 2));
            
            return elements;
        }catch(error){
            return error;
        }
    }
}

export {FileSystemCont};