const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((res, req) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                res('No se pudo generar el token');
            } else {
                res(token);
            }
        });
    });
}

module.exports = {
    generarJWT
};