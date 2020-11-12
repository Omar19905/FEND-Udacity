const dotenv = require('dotenv').config();
let path = require('path')
const express = require('express')
const axios = require('axios');
const app = express()

// Cors for cross origin allowance
let cors = require("cors");

const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());



app.use(express.static('dist'))
app.use(cors());
console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

app.post("/statement",(req ,res)=>{
    axios.get(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&txt=${req.body.text}`)
        .then(response => {
            res.send(response.data)
        })

})

app.post("/url",(req ,res)=>{
    axios.get(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&url=${req.body.url}`)
        .then(response => {
            res.send(response.data)
        })

})




app.get('/test', function (req, res) {
    res.send({message:"pass"})
})

let port = 8081 || process.env.PORT;
app.listen(port, () =>{
    console.log(`listening at http://localhost:${port}`)
});

module.exports = app
