const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {

    const { cedula, contraseña } = req.body;

    try {
        // Verificar si la cédula existe
        const usuario = await Usuario.findOne({ cedula });
        // Si el usuario no existe en la BD
        if (!usuario) {
            return res.json({
                ok: false,
                msg: "El usuario no se encuentra registrado en la base de datos"
            });
        }
        // Si el usuario no esá activo en la BD
        if (!usuario.estado) {
            return res.json({
                ok: false,
                msg: "El usuario tiene acceso denegado al sitio"
            });
        }
        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(contraseña, usuario.contraseña);

        if (!validPassword) {
            return res.json({
                ok: false,
                msg: "El usuario/contraseña no es correcto"
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Error, comuníquese con el administrador"
        });
    }
}

module.exports = {
    login
}