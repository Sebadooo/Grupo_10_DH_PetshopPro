const fs = require('fs');
const path = require('path');
const db = require('../database/models/');
const bcryptjs = require("bcryptjs");
const { validationResult, check, body} = require ('express-validator');
const multer = require ('multer');



const usersController = {
    register: (req, res) => {
        res.render('register')
    },
    saveRegister: (req, res) => {
         let errors = validationResult(req);
            //return res.send(errors);
            //Aquí determino si hay ó no errores encontrados
            if(!errors.isEmpty()) {
              return res.render(path.resolve(__dirname, '../views/register')),{
                errors: errors.errors,  old: req.body
              };
            } 
            let user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                //avatar: req.file ? req.file.filename : '',
                user_category: 1
              };
        
              User.create(user)
              .then((storedUser) => {
                  return  res.redirect('/login');
              })
              .catch(error => console.log(error));
            },
    

    /*login: (req, res) => {
        users.findAll()
        .then((users) => res.render('login'))
        .catch((e) => console.log(e));
    },*/
    login: (req, res) => {
        res.render('login')
    },

    processLogin: (req, res) => {
        //Manejo de cookies
        if (req.body.remember) {
            var hour = 3600;
            req.session.cookie.maxAge = 14 * 24 * hour;
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
    }


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

};


module.exports = usersController;