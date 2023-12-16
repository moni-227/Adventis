const app = require('./app');
const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

mongoose.connect(process.env.MONGODB).then(()=>{
    console.log('connected');
}).catch(()=>{
    console.log("failed");
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
})