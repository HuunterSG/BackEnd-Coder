class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre= nombre;
        this.apellido= apellido;
        this.libros= libros;
        this.mascotas= mascotas;
    }

    getFullName(){
        return `Usuario: ${this.nombre} ${this.apellido}`;
    }

    addMascota(nombre){
        this.mascotas.push(nombre);
    }
    
    addBook(nombre, autor){
        this.libros.push({nombre, autor});
    }

    countMascotas(){
        return `Cantidad de mascotas: ${this.mascotas.length}`;
    }

    getBooksName(){
        return this.libros.map(libro =>` ${libro.nombre}`);
    }
}

//Variables
let usuario1 = new Usuario("Perez", "Agustin", [], []);
let usuario2 = new Usuario("Rodriguez", "Jose", [], []);

//Metodos
usuario1.addMascota("Tarantula");
usuario1.addBook("El Resplandor", "Stephen King");
usuario1.addBook("IT", "Stephen King");

usuario2.addMascota("Gato");
usuario2.addMascota("Perro");
usuario2.addMascota("Axolote");

usuario2.addBook("La Niebla", "Stephen King");
usuario2.addBook("IT", "Stephen King");
usuario2.addBook("Horn", "Joe Hill");

//Console
console.log(usuario1.getFullName());
console.log(usuario1.countMascotas());
console.log(`Libros: ${usuario1.getBooksName()}`)

console.log(usuario2.getFullName());
console.log(usuario2.countMascotas());
console.log(`Libros: ${usuario2.getBooksName()}`)



