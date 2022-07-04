const { response } = require("express");
const bcrypt =  require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async ( req, res= response) =>{
    
    const { email, contraseña } = req.body;
    
    try {
        const existeEmail = await  Usuario.findOne({email:email});
        if(existeEmail){
            return res.status(400).json({
                status: false,
                msg: 'Correo ya registrado'
            })
        }
        const usuario = new Usuario(req.body);
        
    //    //Encriptar contraseña
    //     const salt = bcrypt.genSaltSync();
    //     usuario.contraseña = bcrypt.hashSync(contraseña, salt);
        


        await usuario.save();

        //Generar JWT
        const token = await  generarJWT(usuario.id);

        res.json({
            status: true,
            usuario,
            token
            //msg: 'crear usuario'
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msg: 'Contacta al administrador'
        });
    }

  

}


const login = async (req, res = response ) =>{
    
    const { email, contraseña } = req.body;

    try {

        //Validar email
        const usuarioBD = await Usuario.findOne({email:email});
        if(!usuarioBD){
            return res.status(404).json({
                status: false,
                msg: 'Email no encontrado',
            })
        }

        //Validar password
        const validContraseña =  bcrypt.compareSync(contraseña, usuarioBD.contraseña);
        if(!validContraseña){
            return res.status(404).json({
                status: false,
                msg: 'Contraseña no es valida',
            })
        }

        //Generar JWT
        const token =  await generarJWT(usuarioBD.id);
        res.json({
            status: true,
            usuario: usuarioBD,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: 'contacte al administrador',
        })
    }
}

const renewToken = async( req, res = response) =>{
    
    const uid = req.uid;

    //generar nuevo jwt
    const token =  await generarJWT(uid);

    //obtener el usuario por el ui 
    const usuario = await Usuario.findById(uid);


    res.json({
        status: true, 
        usuario,
        token
    })
}


 
module.exports ={
    crearUsuario,
    login,
    renewToken
}