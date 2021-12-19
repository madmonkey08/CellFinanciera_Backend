const { request, response } = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");

const crearUsuario = async (req = request, res = response) => {

    const { cedula, nombre, celular, contraseña, repContraseña, tipo_usuario, estado } = req.body;

    try {

        if (contraseña !== repContraseña) {
            return res.json({
                ok: false,
                msg: "Las contraseñas no coinciden"
            });
        }

        const usuario = new Usuario({ cedula, nombre, celular, contraseña, tipo_usuario, estado });

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.contraseña = bcrypt.hashSync(contraseña, salt);

        // Guardar en la BD
        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
    } catch (err) {
        res.json({
            ok: false,
            msg: err
        });
    }
}

const cantidadUsuarios = async (req, res) => {

    try {

        const cantidad = await Usuario.count();

        res.json({
            ok: true,
            cantidad
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Ha ocurrido un error, contacte al administrador"
        });
    }

}

module.exports = { crearUsuario, cantidadUsuarios }