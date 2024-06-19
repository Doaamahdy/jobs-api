
require('dotenv').config();
require("express-async-errors")

//security packeges
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require("express");
const app = express();
//connect database
const connectDB = require("./db/connect")

const authenticateUser = require("./middlewares/auth");
//erroes handlers
const notFound = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/erorrHandler');

//routers
const jobRouter = require('./routes/jobs');
const authRouter = require("./routes/auth");

app.set('trust proxy',1);
app.use(rateLimiter({
   windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)

}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authenticateUser,jobRouter);


app.use(errorHandlerMiddleware);
app.use(notFound);

const port = 5000;

const start = async()=>{
    try{
       app.listen(port,()=>{
        console.log(`listening to port ${port}`)
       })
       connectDB(process.env.MONGO_URL)
    }catch(error){
       console.log(error);
    }

}
start();