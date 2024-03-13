const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv');
const  connectDB  = require('./config/Db');

//dotenv congit

dotenv.config();

//mongodb connection
connectDB();

//rest object
const app= express();

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())


// //routes
app.use('/api/v1/user', require('./routes/userRoute'));
app.use('/api/v1/account', require('./routes/accountRoute'));


//listen port
const port = process.env.PORT || 8020
app.listen(port , () => {
    console.log(`Server is running  on http://localhost:${process.env.PORT}`)
});