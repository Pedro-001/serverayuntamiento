/* 

        Path:  api/login

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');




const router = Router();


//Rutas
    //Nuevo usuario
router.post('/new',[
    check('nombre', 'Nombre de usuario es obligatorio').not().isEmpty(),
    check('contraseña', 'Contraseña usuario es obligatorio').not().isEmpty(),
    check('email', 'Email usuario es obligatorio').not().isEmpty().isEmail(),
    validarCampos
] ,crearUsuario);

    //Login de usuario jwt
router.post('/',[
    check('contraseña', 'Contraseña usuario es obligatorio').not().isEmpty(),
    check('email', 'Email usuario es obligatorio').not().isEmpty().isEmail(),
], login);

    //Renovar token de usuario   
router.get('/renew',[validarJWT], renewToken);



module.exports = router;