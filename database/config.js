const mongoose = require("mongoose");

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Base de datos online...");

    } catch (err) {
        throw new Error("Error al conectar con la base de datos, contacte a los desarrolladores.");
    }
}

module.exports = { dbConnection };