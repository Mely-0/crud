const express = require("express");
const bodyParser = require('body-parser')
const app = express()
const port = 8006;
const rutas = require("./router/rutasWeb")
const mascotas = require("./router/mascotas")


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// connect a base de datos 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const user = "Mel";
const password = "zpU2Ruwq7Th2AsU7";
const dbname= "veterinaria";
const uri =`mongodb+srv://${user}:${password}@cluster0.ebg54ci.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(()=> console.log('base de datos conectada'))
.catch(e=> console.log(e))
app.use(express.json());
app.set("view engine", "ejs")
app.set("views", __dirname +"/views")

app.use(express.static(__dirname+ "/public"))
app.use("/",rutas )
app.use("/mascotas", mascotas)

app.use((req,res,next)=>{
    res.status(404).render("404",{
        titulo: "404",
        descripcion: "esta es la descripcion de mi sitio web"
    })
})


app.listen(port , ()=>{
    console.log(`el servidor esta escuchando en http://localhost:${port} `)
})  