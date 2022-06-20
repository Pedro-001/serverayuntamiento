const { Schema, model} =require('mongoose');


const UsuarioSchema = Schema({
    nombre:{
        type: String,
        //required: true
        default: 'no proporcionado',

    },
    email:{
        type: String,
        required: true,
        default: 'no propocionado',
       // unique:true
    },
    contraseña:{
        type: String,
        //required: true
    },
    online: {
        type: Boolean,
        default: false
    },
    descripcion:{
        type: String,
        default: 'no proporcionado',
    },
    telefono:{
        type: String,
        default: 'no proporcionado'
    }


});

UsuarioSchema.method('toJSON', function (){

    const { __v, _id, contraseña, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);