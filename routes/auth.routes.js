const { Router } = require('express');
const { check } = require("express-validator");

const { login } = require("../controller/auth.controller");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", [
    check("cedula", "La cédula es obligatoria").not().isEmpty(),
    check("contraseña", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos
], login);

module.exports = router;