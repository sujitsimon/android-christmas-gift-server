const http = require('http');
const express = require("express");
const { MongoClient } = require('mongodb');
const fs = require("fs");

const CREDENTIALS_FILE = '..\\utils\\db_uploader\\credentials.json';
const CREDENTIALS_DATA = JSON.parse(fs.readFileSync(CREDENTIALS_FILE));
const DATABASE_NAME = 'Prize2023';
const server = http.createServer();
const mongodbClient = new MongoClient(`mongodb://${CREDENTIALS_DATA.username}:${CREDENTIALS_DATA.password}@127.0.0.1:27017/`, { serverSelectionTimeoutMS: 5000 })
const PORT = 5000;

const APP = express(server);

mongodbClient.connect().then(()=> {
    console.log('Connected to Database');
});

const DB = mongodbClient.db(DATABASE_NAME);
const userData = DB.collection('UserData');
const prizeList = DB.collection('PrizeList');

APP.listen(PORT, ()=> {
    console.log(`Sever Running at ${PORT}`);
});

APP.get('/', (req, res) => {
    res.send('Welcome to Christmas Lucky Draw')
});

//getUserDetails
APP.get('/getUserDetails', async (req, res)=> {
    const { token_number } = req.query;
    let tempUser = await userData.findOne({Token_Number: parseInt(token_number)});
    //console.log('Token Number Details: ', tempUser);
    res.status(200).json(tempUser);
});

APP.post('/updatePrizeDetails', async (req, res)=> {
    const { token_number, update } = req.query;
    let tempUser = await userData.findOneAndUpdate({Token_Number: parseInt(token_number)}, update);
    res.status(200).json(tempUser);
});

//isPrizeSelected
APP.get('/isPrizeSelected', async (req, res)=> {
    const { prize_number } = req.query;
    let tempUser = await userData.findOne({Prize_Number: parseInt(prize_number)});
    if (tempUser) {
        res.status(200).json({response: true, details: tempUser});
    } else {
        res.status(200).json({response: false});
    }
});

//getPrizeDetails
APP.get('/getPrizeDetails', async (req, res)=> {
    const { prize_number } = req.query;
    let prizeData = await prizeList.findOne({"Prize_No": parseInt(prize_number)});
    res.status(200).json(prizeData);
});

//isTokenAlreadyProcessed
APP.get('/isTokenAlreadyProcessed', async (req, res)=> {
    const { token_number } = req.query;
    let tempUser = await userData.findOne({Token_Number: parseInt(token_number)});
    res.status(200).json(tempUser);
});

//getTotalTokens
APP.get('/getTotalTokens', async (req, res)=> {
    let tempUsers = await userData.countDocuments();
    return res.status(200).json({count: tempUsers});
    
});

//getInCompleteTokens
APP.get('/getInCompleteTokens', async (req, res)=> {
    let tempUsers = await userData.countDocuments({$where: {Prize_Number: null}});
    return res.status(200).json({count: tempUsers});
});

//prizeDelivered'
APP.get('/prizeDelivered', async(req, res)=> {
    let tempUsers = await userData.countDocuments({$where: {Prize_Collected: !null}});
    return res.status(200).json({count: tempUsers});
});

//prizeYetToDelivered'
APP.get('/prizeYetToDelivered', async (req, res)=> {
    let tempUsers = await userData.countDocuments({$where: {Prize_Collected: null}});
    return res.status(200).json({count: tempUsers});
});

console.log('Node.js web server at port 5000 is running..')