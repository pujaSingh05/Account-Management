const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb Connected ${mongoose.connection.host}`);
    }catch{
        console.log(`Mongodb server Issue ${error}`);
    }
};

module.exports = connectDB;