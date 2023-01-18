const mongoose = require('mongoose');

const dbConnection = async ()=>{

    try {

        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB online");
        
    } catch (error) {
        console.log(error);
        throw new Error ("Error en la coneccion con la DB");
    }




}

module.exports = {
    dbConnection
}