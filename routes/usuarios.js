/* 

        Path:  api/usuarios

*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');




const router = Router();


//Rutas
const {getUsuarios} = require('../controllers/usuarios')

 //router.get('/',[validarJWT], getUsuarios );
 router.get('/',getUsuarios );


module.exports = router;