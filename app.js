const path = require ("path");
const express = require ("express");
const app = express ();

const genericCTLR = require ("./controllers/genericController");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "publics")));

app.use("/", genericCTLR); 

const PORT =process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor levantado en el puerto "+PORT)
});
