const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    cedula: {
        type: Number,
        required: true
    },
    celular: {
        type: Number,
        required: false
    },
    nombre: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    tipo_usuario: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: 'Autorizado'
    }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuarios', UsuarioSchema);