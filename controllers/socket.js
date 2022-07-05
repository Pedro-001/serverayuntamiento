const Usuario =  require('../models/usuario');
const Usuario =  require('../models/mensaje');




const usuarioConectado  = async(uid = '')=>{
    console.log(uid);
    const usuario  = await Usuario.findById( uid );
    usuario.online = true;
    await usuario.save();
    return usuario;
}


const usuarioDesconectado  = async(uid = '')=>{
    const usuario  = await Usuario.findById( uid );
    usuario.online = false;
    await usuario.save();
    return usuario;
}

const grabarMensaje = async(payload) =>{
    /* 
        {
            from: "",
            to: "",
            latitud: "",
            longitud: ""
        }

     */

    try {

        const mensaje = new Mensaje( payload)
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    usuarioConectado, usuarioDesconectado, grabarMensaje
}