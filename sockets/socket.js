const { usuarioConectado, usuarioDesconectado } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    console.log(client.handshake.headers['x-token']);

    ///    /// comprobar JWT
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    console.log(valido);
    
    ///     Verificar autenticación
    ///    if(!valido){ return client.disconnect();}
    ///    console.log('cliente autenticado');
    usuarioConectado(uid);

    //Ingresar al usuario a una sala en particular
    // Sala global o sala privada(client.id)
    client.join(uid);

    //Escuchar el mensaje del cliente
    client.on('ubicacion-personal', (payload) =>{
        console.log(payload);
    })

    

    client.on('disconnect', () => {
            usuarioDesconectado(uid);
            console.log('Cliente desconectado');
        });
    ///
//    client.on('mensaje', ( payload ) => {
//        console.log('Mensaje', payload);
//
//        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
//
//    });


});
