const mongoose = require("mongoose");
require('dotenv').config({ path: "./src/.env" });

const connectMONGODB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB conectado.");
    } catch (error) { 
        console.error('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); // Usar `1` para indicar um erro
    }
};

module.exports = connectMONGODB;
