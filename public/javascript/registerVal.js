window.addEventListener('load', function() {
    
    
    // Capturando el formulario // 
    const formReg = document.querySelector('form.registro');
    
    const nombre = document.querySelector('input.first_name');
    const apellido = document.querySelector('input.last_name');
    const email = document.querySelector('input.email');
    const password = document.querySelector('input.password');
    
    
    checkImputs ();
});

function checkImputs ()
const nombreVal = nombre.value.trim(); 
const apellidoVal = apellido.value.trim();
const emailVal = email.value.trim();
const passwordVal = password.value.trim();

const errors = [];

formReg.addEventListener('submit', function(e){

if (nombreVal == "") {
    serErrorFor (first_name, 'Debes completar con tu Nombre');
        } else {setSuccessFor(first_name);
            
        }
        //     errors.push ('Debes escribir tu nombre');
        // } else if (nombreVal.length < 3) {
        //     errors.push ('El nombre debe tener al menos 3 caracteres');
        // } 
    }) 
        
        if (apellido.value == "") {
            errors.push ('Debes escribir tu apellido');
        } else if (apellido.value.length < 3) {
            errors.push ('El apellido debe tener al menos 3 caracteres');
        } 
        
        if (email.value == "") {
            errors.push ('Debes escribir un email válido');
        } else if (email.includes('@') && email.value.length > 8) {
            errors.push ('El email debe tener al menos 8 caracteres');
        } 
              
        if (password.value == "") {
            errors.push ('Debes escribir una contraseña');
        } else if (password.value.length < 5) {
            errors.push ('El apellido debe tener al menos 5 caracteres');
        } 
        
        let ulErrores = document.querySelector('div.errorsFront ul');
        for (let i = 0 ; i < errors.length ;  i++) {
            ulErrores.innerHTML += '<li>' + errors[i] + '</li>'
        };
         
        if (errors.length > 0){
         e.preventDefault()
        } else {
            formReg.submit();
        };
    

//     // Destructuring //
//     let { first_name, last_name, email, password } = formReg.elements;
//     let avatarImg = document.querySelector('#avatar')
//     let errores = [];
//       console.log('IMAGEN');
//       console.log(avatarImg)});
   

//     // Definiendo variables de Errores del front //
//     let firstNameErrors = document.querySelector('#printError-first_name');
//     let lastNameErrors = document.querySelector('#printError-last_name');
//     let emailErrors = document.querySelector('#printError-email');
//     let passwordErrors = document.querySelector('#printError-password');
//     let avatarImgErrors = document.querySelector('#printError-avatarImg');

//     // Validaciones first_name //
//     first_name.addEventListener('blur', function(){
//         if (first_name.value == '') {
//             firstNameErrors.innerText = 'Debes escribir tu nombre'
//             errores.push('Debes escribir tu nombre');
//             first_name.classList.add('is-invalid');

//         } else if (first_name.value.length < 2 ){
//             firstNameErrors.innerText = 'El nombre debe contener al menos 2 caracteres'
//             errores.push('El nombre debe contener al menos 2 caracteres');
//             first_name.classList.add('is-invalid');
//         } else {
//             firstNameErrors.innerText = ''
//             first_name.classList.add('is-valid');
//             first_name.classList.remove('is-invalid');
//         }
//     })
    
//     // Validaciones last_name //
//     last_name.addEventListener('blur', function(){
//         if (last_name.value == '') {
//             lastNameErrors.innerText = 'Debes escribir tu apellido'
//             errores.push('Debes escribir tu apellido');
//             last_name.classList.add('is-invalid');

//         } else if (last_name.value.length < 2 ){
//             lastNameErrors.innerText = 'El apellido debe contener al menos 2 caracteres'
//             errores.push('El apellido debe contener al menos 2 caracteres');
//             last_name.classList.add('is-invalid');
//         } else {
//             lastNameErrors.innerText = ''
//             last_name.classList.add('is-valid');
//             last_name.classList.remove('is-invalid');
//         }
//     })

//     //Validaciones email//
//     email.addEventListener('blur', function(){
//         if (email.value == '') {
//             emailErrors.innerText = 'El campo email no puede estar vacío'
//             errores.push('El campo email no puede estar vacío');
//             email.classList.add('is-invalid');
//         } else {
//             emailErrors.innerText = ''
//             email.classList.add('is-valid');
//             email.classList.remove('is-invalid');
//         }
    
//     // validaciones password
//     password.addEventListener('blur', function(){
//         if (password.value == '') {
//             passwordErrors.innerText = 'Debes definir una contraseña'
//             errores.push('Debes definir una contraseña');
//             password.classList.add('is-invalid');

//         } else if (password.value.length < 8 ){
//             passwordErrors.innerText = 'La contraseña debe tener al menos 5 caracteres'
//             errores.push('La contraseña debe tener al menos 5 caracteres');
//             password.classList.add('is-invalid');
//         } else {
//             passwordErrors.innerText = ''
//             password.classList.add('is-valid');
//             password.classList.remove('is-invalid');
//         }
//     })

//     // Validaciones de avatar //
//     avatarImg.addEventListener('change', function(){
//         let acceptedFiles  = /(.jpg|.jpeg|.png|.gif)$/i;
//         let image
//         if(avatarImg.files[0] != undefined){
//             image = avatarImg.files[0].name
        
//             let imageIsValid = acceptedFiles.test(image)

//             if (!imageIsValid || !image == undefined) {
//                 avatarImgErrors.innerText = 'Los formatos de imagen aceptados son .jpg, .jpeg, .png, .gif'
//                 errores.push('Los formatos de imagen aceptados son .jpg, .jpeg, .png, .gif');
//                 avatarImg.classList.add('is-invalid');
//             } else {
//                 avatarImgErrors.innerText = ''
//                 avatarImg.classList.add('is-valid');
//                 avatarImg.classList.remove('is-invalid');
//             }
//         } else {
//             avatarImgErrors.innerText = ''
//             avatarImg.classList.add('is-valid');
//             avatarImg.classList.remove('is-invalid');
//         }
//     })

//     // Boton Submit //
//     formulario.addEventListener('submit', function (e) {

//         e.preventDefault();

//         errores = []

//         // validaciones firstName
//             if (first_name.value == '') {
//                 firstNameErrors.innerText = 'El campo nombre no puede estar vacío'
//                 errores.push('El campo nombre no puede estar vacío');
//                 first_name.classList.add('is-invalid');

//             } else if (first_name.value.length < 2 ){
//                 firstNameErrors.innerText = 'El nombre debe contener al menos 2 caracteres'
//                 errores.push('El nombre debe contener al menos 2 caracteres');
//                 first_name.classList.add('is-invalid');
//             } else {
//                 firstNameErrors.innerText = ''
//                 first_name.classList.add('is-valid');
//                 first_name.classList.remove('is-invalid');
//             }
//         // validaciones lastName
//             if (lastName.value == '') {
//                 lastNameErrors.innerText = 'El campo apellido no puede estar vacío'
//                 errores.push('El campo nombre no puede estar vacío');
//                 lastName.classList.add('is-invalid');

//             } else if (lastName.value.length < 2 ){
//                 lastNameErrors.innerText = 'El apellido debe contener al menos 2 caracteres'
//                 errores.push('El apellido debe contener al menos 2 caracteres');
//                 lastName.classList.add('is-invalid');
//             } else {
//                 lastNameErrors.innerText = ''
//                 lastName.classList.add('is-valid');
//                 lastName.classList.remove('is-invalid');
//             }
//         //validaciones email
//             if (email.value == '') {
//                 emailErrors.innerText = 'El campo email no puede estar vacío'
//                 errores.push('El campo email no puede estar vacío');
//                 email.classList.add('is-invalid');
//             } else {
//                 emailErrors.innerText = ''
//                 email.classList.add('is-valid');
//                 email.classList.remove('is-invalid');
//             }
//         // validaciones password
//             if (password.value == '') {
//                 passwordErrors.innerText = 'El campo constraseña no puede estar vacío'
//                 errores.push('El campo contraseña no puede estar vacío');
//                 password.classList.add('is-invalid');

//             } else if (password.value.length < 8 ){
//                 passwordErrors.innerText = 'La contraseña debe contener al menos 8 caracteres'
//                 errores.push('La contraseña debe contener al menos 8 caracteres');
//                 password.classList.add('is-invalid');
//             } else {
//                 passwordErrors.innerText = ''
//                 password.classList.add('is-valid');
//                 password.classList.remove('is-invalid');
//             }
//         // validaciones password
//             if (password.value == '') {
//                 passwordErrors.innerText = 'El campo constraseña no puede estar vacío'
//                 errores.push('El campo contraseña no puede estar vacío');
//                 password.classList.add('is-invalid');

//             } else if (password.value.length < 8 ){
//                 passwordErrors.innerText = 'La contraseña debe contener al menos 8 caracteres'
//                 errores.push('La contraseña debe contener al menos 8 caracteres');
//                 password.classList.add('is-invalid');
//             } else {
//                 passwordErrors.innerText = ''
//                 password.classList.add('is-valid');
//                 password.classList.remove('is-invalid');
//             }
//         // validaciones avatarImg
//             let acceptedFiles  = /(.jpg|.jpeg|.png|.gif)$/i;
//             let image
//             if(avatarImg.files[0] != undefined){
//                 image = avatarImg.files[0].name
            
//                 let imageIsValid = acceptedFiles.test(image)

//                 if (!imageIsValid || !image == undefined) {
//                     avatarImgErrors.innerText = 'Formatos aceptados .jpg, .jpeg, .png, .gif'
//                     errores.push('Formatos no aceptados .jpg, .jpeg, .png, .gif');
//                     avatarImg.classList.add('is-invalid');
//                 } else {
//                     avatarImgErrors.innerText = ''
//                     avatarImg.classList.add('is-valid');
//                     avatarImg.classList.remove('is-invalid');
//                 }
//             } else {
//                 avatarImgErrors.innerText = ''
//                 avatarImg.classList.add('is-valid');
//                 avatarImg.classList.remove('is-invalid');
//             }
        
//         if (errores.length > 0) {
                
//             console.log('Hay errores en el formulario: ' + errores);
                
//         } else {
//             formReg.submit();
//         }

//     })

//})