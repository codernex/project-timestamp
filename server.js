// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
let responseObj={}
const isDate = (date) => {
  return Date.parse(date)
}
app.get("/api/:date",(req,res)=>{
  let input=req.params.date
    if(input.includes("-")){
      //Validating ISO Date Format
    responseObj["unix"]=new Date(input).getTime()
    responseObj["utc"]=new Date(input).toUTCString()
    }else if(input.includes(" ")){
      //Validating is input a Date String
      input= Date.parse(input)
      responseObj["unix"]=input
    responseObj["utc"]=new Date(input).toUTCString()
    }
    else{
    //Validating is input a Unix Timestamp
    input=parseInt(input)
    responseObj["unix"]=new Date(input).getTime()
    responseObj["utc"]=new Date(input).toUTCString()
  }
 
  if(responseObj["utc"]==="Invalid Date"){
    return res.json({error:"invalid Date"})
  }
  
  res.json(responseObj)
})

app.get("/api",(req,res)=>{
  responseObj["unix"]=new Date().getTime()
  responseObj["utc"]=new Date().toUTCString()
  res.json(responseObj)
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
