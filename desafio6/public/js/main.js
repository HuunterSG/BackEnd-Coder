//conectamos socket
const socket = io.connect();

//************ SECCION PRODUCTOS ************

//creamos tabla de prod
const createProdTable= async (products)=>{

    //llamamos al template y lo guardamos en una var
    const template = await (await fetch("views/productTable.hbs")).text();

    //compilamos el template en una var
    const compTemplate= Handlebars.compile(template);
    return compTemplate({products});
}
//creamos funcion para añadir prods
const addProduct = ()=>{
    //traemos los id
    const title = document.getElementById("title")
    const price = document.getElementById("price")

    //validamos que hayan completado los campos
    if(!title.value || !price.value){
        alert("Por favor complete los campos para procesar la información");
    }

    //emitimos mediante socket
    socket.emit("add-product",{
        title: title.value,
        price: price.value,
    });
    title.value="";
    price.value="";
}

//tomamos el id para añadirle el evento de click y la funcion al clickear
document.getElementById("add-product").addEventListener("click", addProduct);

//traemos los productos del back
socket.on("products", async(products)=>{
    //enviamos los productos a la tabla creada
    const template = await createProdTable(products);
    //escribimos la tabla creada en nuestro html
    document.getElementById("products").innerHTML=template;
})

//************ SECCION CHAT ************

//realizamos funcion para enviar nuestros msjs
function envMsj(){
    //tomamos valores de los input
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
    
    //condicionamos para que no pueda mandar msj a menos q llene los dos campos
    if(!email.value || !mensaje.value){
        alert("No a completado los campos, vuelva a intentarlo")
        return false;
    }

    socket.emit("msjNuevo",{email:email.value, text: mensaje.value});
    mensaje.value="";
    return false;

}

//traemos los msjs desde el back
socket.on("msjs",(msjs)=>{
    //declaramos variable, y luego mapeamos para dividir los msjs q seran mostrados en nuestro front
    let msjsHtml= msjs.map((msj)=>`<span class="msg">${msj.timestamp} <b> ${msj.email}: </b>${msj.text}</span>`).join("<br>")
    
    //llamamos el id y le pasamos nuestra var.
    document.getElementById("listaMsj").innerHTML = msjsHtml;
})