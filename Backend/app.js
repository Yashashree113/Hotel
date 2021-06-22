const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const api = require('./auth/api');


const app=express();
//PORT
const PORT = 1000;

app.use(cors()) ;

//Middleware
app.use(express.json())
/**
 * Router Middleware
 * Router - /api/*
 * Method - *
 */
app.use('/api', api)

app.get('/', function(req, res){
    res.json({message: "API working..."});
})

app.listen(PORT, function(){
    console.log(`Authentication running on local host: ${PORT}`)
})