const { response } = require("express");
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response )=> {

    const usuarios = await  Usuario.find()
        .find({_id: {$ne: req.uid}})
        .sort('-online');
    

    //{ok: true, msg: 'getUsuarios}
    res.json({
        ok:true,
        usuarios
    })


}

module.exports = {
    getUsuarios
}