const { Router } = require('express');
const { check } = require("express-validator");

const { crearUsuario, cantidadUsuarios } = require("../controller/usuario.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", [
    check("cedula", "La cédula debe ser un valor numérico").isNumeric(),
    check("cedula", "La cédula debe contener al menos 6 caractéres").isLength({ min: 6 }),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre", "El nombre debe contener al menos 4 caractéres").isLength({ min: 4 }),
    // check("celular", "El celular debe ser un valor numérico").isNumeric(),
    // check("celular", "El celular debe contener 10 caractéres").isLength({ min: 10 }),
    // check("celular", "El celular es obligatorio").not().isEmpty(),
    check("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    check("contraseña", "La contraseña debe tener por lo menos 10 caractéres").isLength({ min: 8 }),
    check("tipo_usuario", "Debe establecer qué tipo de usuario es").not().isEmpty(),
    validarCampos
], crearUsuario);

router.post("/admin", [
    check("cedula", "La cédula debe ser un valor numérico").isNumeric(),
    check("cedula", "La cédula debe contener al menos 6 caractéres").isLength({ min: 6 }),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre", "El nombre debe contener al menos 4 caractéres").isLength({ min: 4 }),
    check("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    check("contraseña", "La contraseña debe tener por lo menos 10 caractéres").isLength({ min: 8 }),
    check("repContraseña", "Es obligatorio repetir la contraseña").not().isEmpty(),
    check("tipo_usuario", "Debe establecer qué tipo de usuario es").not().isEmpty(),
    validarCampos
], crearUsuario);

router.get("/cantidad", cantidadUsuarios);

module.exports = router;