const express = require('express');
const dotenv = require('dotenv')
const dbConnect = require("./dbConnect");
const cors = require('cors')

dotenv.config()
const app = express();

dbConnect();
app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:3000'}))

app.use('/users',require('./routes/user'))
app.use('/staff',require('./routes/staff'))
app.use('/fireStation',require('./routes/firestation'))
app.use('/controller',require('./routes/control'))


const port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log("server is running on port 8080")
})