const fs = require('fs');
const path = require('path');
const db = require('../database/models/index');
const bcryptjs = require("bcryptjs");
const { validationResult } = require ('express-validator');
const multer = require ('multer');


const usersController = {
    //MUESTRA TODOS LOS USUARIOS REGISTRADOS//
    showUsers: (req, res) => {
        db.User.findAll({
            include: [{association: "user_category"}]})
        .then(function(usuarios){
            res.render('./views/showUsers', {usuarios});
        })
        .catch(function(err){
            console.log(err)
        }) 
    },
//MUESTRA EL DETALLE DEL USUARIO SELECCIONADO//
    usersDetail: (req, res) => {
        db.User.findByPk(req.params.id, {  
        include: [{ association : "user_Category"}]})
        .then(function(usuario){
            res.render('./views/detailUsers', {usuario})  
        })
        .catch(function(err){
            console.log(err)
        }) 
    },
//MUESTRA EL FORMILARIO DE REGISTRO//
    register: (req, res) => {
        res.cookie("Tested", { maxAge: 1000 * 120 })
        res.render('register')
    },
//GUARDA AL NUEVO USUARIO REGRISTRADO EN LA BASE DE DATOS//
    saveRegister: (req, res) => {
         let valResults = validationResult(req); 
            if(valResults.errors.length > 0) { 
              return res.render('register'),{
                errors: valResults.mapped(), 
                old: req.body
              }
            } 
            let usuarioExistente = user.findByField ("email")

            if (usuarioExistente == req.body.email) {
                return res.render('Register', {
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
                }
                
            let usuarioCreado = User.create(usuarioNuevo);
        
            res.redirect('./views/login.ejs')
        },
    
//MUESTRA EL FORMILARIO DE LOGIN O INICIAR SESION//    
    login: (req, res) => {
        res.render('login')
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
                    res.render('login');
                }
            })
            .catch((e) => console.log(e));
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
            return res.render ('login', {errors: [
                {msg: "Credenciales invalidas"}
                ]});
            }

            req.session.usuarioLogueado = usuarioALoguearse;
            res.redirect ("Login exitoso!");
        } else {
            return res.render ('login', {errors: errors.errors})
        }*/
// CERRANDO SESION//
        logout: (req,res) =>{
            req.session.destroy();
            res.cookie('email',null,{maxAge: -1});
            res.redirect('/')
          }
      
};


module.exports = usersController;