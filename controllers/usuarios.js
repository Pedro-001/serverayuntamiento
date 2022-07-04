const { response } = require("express");


const getUsuarios = (req, res = response )=> {

    //{ok: true, msg: 'getUsuarios}
    res.json({
        ok:true,
        msg: 'getUsuarios'
    })


}

module.exports = {
    getUsuarios
}