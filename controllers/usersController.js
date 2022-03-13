const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const bcryptjs = require("bcryptjs");
const { validationResult } = require ('express-validator');
const multer = require ('multer');


const usersController = {
    //MUESTRA TODOS LOS USUARIOS REGISTRADOS//
    showUsers: (req, res) => {
        db.User.findAll({
            include: [{association: "user_category"}]})
        .then(function(User){
            res.render('users', {User});
        })
        .catch(function(err){
            console.log(err)
        }) 
    },
//MUESTRA EL DETALLE DEL USUARIO SELECCIONADO//
    usersDetail: (req, res) => {
        db.User.findByPk(req.params.id, {  
        include: [{ association : "user_Category"}]})
        .then(function(User){
            res.render('usersDetail', {User})  
        })
        .catch(function(err){
            console.log(err)
        }) 
    },
//GUARDADO DEL NUEVO USUARIO CREADO//
saveUser: (req, res) => {
    db.users.create({
        firt_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password:req.body.password,
        avatar: req.body.avatar,
    }
    );
    res.redirect("/")
},
//MUESTRA EL FORMILARIO DE REGISTRO//
    register: (req, res) => {
        res.cookie("Tested", { maxAge: 1000 * 120 })
        res.render('userRegister')
    },
//GUARDA AL NUEVO USUARIO REGRISTRADO EN LA BASE DE DATOS//
     saveRegister: (req, res) => {
          let valResults = validationResult(req)
          console.log(valResults)
             if(valResults.errors.length > 0) { 
               return res.render('userRegister'),{
                 errors: valResults.mapped(), 
                 oldData: req.body
               }
             } 
           let usuarioExistente = user.findByField ("email")

           if (usuarioExistente == req.body.email) {
                 return res.render('userRegister', {
                     errors: {
                         email: {
                             msg: "Este usuario ya existe"
                         }
                     },
                     old: req.body
                 })
             };
                
             let usuarioNuevo = {
                     ...req.body,
                     password: bcryptjs.hashSync(req.body.password, 10),                                                                                                                                                                                                                                                                                                                    
                     avatar: req.file.filename
                 };
               
             let usuarioCreado = User.create(usuarioNuevo);

             res.redirect('./views/userLogin.ejs')
         },
    
//MUESTRA EL FORMILARIO DE LOGIN O INICIAR SESION//    
    login: (req, res) => {
        res.render('userLogin')
    },
//PRECESA EL LOGIN, SI ES CORRECTO INGRESA CON CLAVE DE USUARIO NIVL 1//
    processLogin: (req, res) => {
        //Manejo de cookies
        if (req.body.remember) {
            req.session.cookie.maxAge = 1000 *60 *24;
            res.cookie("amarillo", "Bienvenido usuario!");
        } else {
            req.session.cookie.expires = false;
        }
        users.findOne({ where: { email: req.body.email } })
            .then((user) => {
                if (user && bcryptjs.compareSync(req.body.password, user.password)) {
                    delete user.password;
                    console.log('user', user);
                    req.session.userLogged = user;
                    console.log('logged', req.session.userLogged);
                    res.redirect('/', { user: user });
                } else {
                    res.render('userLogin');
                }
            })
            .catch((e) => console.log(e));
    },
//CREAR NUEVO USUARIO (ADMIN)//
createUser: (req, res) => {
        db.User,findAll ()
        .then (function(productos){
            return res.render ("/")
        })
        .catch(function(e) {
            console.log(e)
        })
    },
    /*processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let usersJSON = fs.readFileSync('usersDataBase.json',{usersDataPath:'utf-8'});
            let users;
            if (usersJSON == "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            for (let i = 0; i < user.length; i++) {
                if (users[i].email == req.body.email){
                    if (bcrypt.compareSync(req.body.password, users[i].password))
                    var usuarioALoguearse = users[i];
                    break;
                }
            }
        }
        if (usuarioALoguearse == undefined) {
            return res.render ('userLogin', {errors: [
                {msg: "Credenciales invalidas"}
                ]});
            }

            req.session.usuarioLogueado = usuarioALoguearse;
            res.redirect ("Login exitoso!");
        } else {
            return res.render ('userLogin', {errors: errors.errors})
        }*/
// CERRANDO SESION//
        logout: (req,res) =>{
            req.session.destroy();
            res.cookie('email',null,{maxAge: -1});
            res.redirect('/')
        },
          
          // CARRITO DE COMPRAS //
          shopCart: (req, res) => {
              res.render('shopCart')
        }
};

module.exports = usersController;