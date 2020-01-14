var express = require('express')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var cors = require('cors');

var path = require('path')

var app = express()

const route = require("./route")
app.use(cors())

mongoose.connect('mongodb://localhost:27017/SubscriptionModule')

mongoose.connection.on('connected',()=>{
    console.log("Connected to port 27017")
})

mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log("Error " + err)
    }
    
})

const port = 3000

app.use(bodyparser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", route)

app.get("/", (req,res)=>{
    res.send("foobar");
})

app.listen(port);