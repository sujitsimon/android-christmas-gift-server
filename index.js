const http = require('http');
const express = require("express");
const { MongoClient } = require('mongodb');
const fs = require("fs");

const CREDENTIALS_FILE = '..\\utils\\db_uploader\\credentials.json';
const CREDENTIALS_DATA = JSON.parse(fs.readFileSync(CREDENTIALS_FILE));
const DATABASE_NAME = 'Prize2023';
const server = http.createServer();
const mongodbClient = new MongoClient(`mongodb://${CREDENTIALS_DATA.username}:${CREDENTIALS_DATA.password}@localhost:27017`)
const PORT = 5000;
const APP = express(server);

mongodbClient.connect();
const DB = mongodbClient.db(DATABASE_NAME);
const userData = DB.collection('UserData');
const prizeList = DB.collection('PrizeList');

APP.listen(PORT, ()=> {
    console.log("Sever Running at 5000");
});

APP.get('/', (req, res) => {
    res.send('Welcome to Christmas Lucky Draw')
});

//getUserDetails
APP.get('/getUserDetails', (req, res)=> {

});

//updatePrizeDetails
// let data = JSON.stringify({
//     "token_number": tokenNumber,
//     "update": {
//         "$set": {
//             "Prize_Collected": true,
//             "Process_Completed": true
//         }
//     }
// });
APP.post('/updatePrizeDetails', (req, res)=> {
    
});

//isPrizeSelected
APP.get('/isPrizeSelected', (req, res)=> {
    
});

//getPrizeDetails
APP.get('/getPrizeDetails', (req, res)=> {
    
});

//isTokenAlreadyProcessed
APP.get('/isTokenAlreadyProcessed', (req, res)=> {
    
});

//getTotalTokens
APP.get('/getTotalTokens', (req, res)=> {
    
});

//getInCompleteTokens
APP.get('/getInCompleteTokens', (req, res)=> {
    
});

//prizeDelivered'
APP.get('/prizeDelivered', (req, res)=> {
    
});

//prizeYetToDelivered'
APP.get('/prizeYetToDelivered', (req, res)=> {
    
});

console.log('Node.js web server at port 5000 is running..')