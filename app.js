//Requiere los paquetes y dependencias//
const path = require ("path");
const express = require ("express");
const app = express ();
const logger = require ("morgan");
const session = require ("express-session");
//const cookieParser = require ("cookie-parser");
const methodOverride = require ("method-override");

//Ruta a la hoja de estilos CSS//
app.use(express.static(path.resolve(__dirname, "publics")));

//Setea ruta a los endpoints y template engine//
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Url Encoded//
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(express.json());

//Middlewares a nivel de la aplicación//
app.use(methodOverride('_method'));
//app.use(cookieParser);
app.use(session({secret: "almacenando session del usuario"}));

//Requiere las Rutas//
const { connect } = require ("./database/config/config");
const homeRoute = require ("./routes/homeRouter");
const productsRoute = require ("./routes/productsRouter");
const usersRoute = require ("./routes/usersRouter");

//Uso de los controladores//
app.use("/", homeRoute); 
app.use("/", productsRoute); 
app.use("/", usersRoute); 

//Setea el puerto//
const PORT =process.env.PORT || 3000;

//Llama al puerto//
app.listen(PORT, () => {
    console.log("Servidor levantado en el puerto "+PORT)
});

    // connection.sync ({ force:true }).then(() =>{
    //     console.log("Se ha establecido la conexión con la Base de datos")
    // });
