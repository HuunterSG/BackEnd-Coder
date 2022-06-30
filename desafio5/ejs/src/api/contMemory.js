class ContMemory {
    constructor(){
        this.elements= [
            {
                "id":1,
                "title":"sprite",
                "price":400
            },
            {
                "id":2,
                "title":"Coca-Cola",
                "price":200
            },
            {
                "id":3,
                "title":"Fernet",
                "price":1000
            },
            {
                "id":4,
                "title":"Gancia",
                "price":900
            },
            {
                "id":5,
                "title":"Gin",
                "price":900
            },
            {
                "id":6,
                "title":"Andes IPA",
                "price":450
            },
            {
                "id":7,
                "title":"fanta",
                "price":"200"
            }
        ];
    }

    // entrega todos los objetos
    getAll(){
        return this.elements
    }

    //entrega el elemento buscado por ID
    getById(id){
        const element= this.elements.find((elem)=> elem.id == id);
        return element;
    }

    //guarda elemento
    save(element){
        element.id = this.elements.length === 0 ? 1 : this.elements[this.elements.length - 1].id + 1;

        this.elements.push(element);

        return element;
    }

    //actualiza mediante id 
    updateById(id, newInfo){
        const elementIndex = this.elements.findIndex((elem)=> elem.id == id);

        if (elementIndex === -1) return {error:true};

        this.elements[elementIndex] = {
            ...this.elements[elementIndex],
            ...newInfo
        };

        return this.elements[elementIndex]
    }

    //borra mediante ID
    deleteById(){
        const elementIndex = this.elements.findIndex((elem)=> elem.id == id);
        if (elementIndex === -1) return {error:true};
        this.elements = this.elements.filter((elem)=> elem.id != id)
        return {error:false};
    }
}
export {ContMemory};