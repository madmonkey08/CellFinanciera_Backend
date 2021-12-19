const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authRoutes = "/login";
        this.usuariosRoutes = "/usuarios";

        // Conectar a la base de datos
        this.conectarDB();

        // Lectura y parseo en el body
        this.app.use(express.json());

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());
    }

    routes() {
        this.app.use(this.authRoutes, require("../routes/auth.routes"));
        this.app.use(this.usuariosRoutes, require("../routes/usuario.routes"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}

module.exports = Server;