const { Schema, model} =require('mongoose');


const MensajeSchema = Schema({
    from:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true,
        default: 'no proporcionado',

    },
    to:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: true,
        default: 'no proporcionado',
    },
    longitud:{
        type: String,
        required: true,
        default: '18.615278286574636'
    },
    latitud: {
        type: String,
        required: true,
        default: '-99.18042458931201'
    },

});

MensajeSchema.method('toJSON', function (){

    const { __v, _id, ...object} = this.toObject();
    return object;
});

module.exports = model('Mensaje', MensajeSchema);