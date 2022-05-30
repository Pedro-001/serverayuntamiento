const jwt = require('jsonwebtoken'); 

const validarJWT  = (req, res, next)=>{
    
    //Leer el token
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            status: false,
            msg:'no hay token en la petición'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;


        next();
    } catch (error) {
        
        return res.status(401).json({
            status: false,
            msg: 'Token no valido'
        })
    }



}


module.exports ={
    validarJWT
}