// index.js
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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const epochRegEx = /\d{5,}/;

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;

  if(date === undefined){
    res.json({
      utc: new Date().toUTCString(),
      unix: new Date().getTime()
    })
  }

  if(epochRegEx.test(date)){
    res.json({
      utc: new Date(parseInt(date)).toUTCString(),
      unix: new Date(parseInt(date)).getTime()
    })
  }
  else{
    if(new Date(date).toString() === "Invalid Date"){
      res.json({error: "Invalid Date"})
    }
    res.json({
      utc: new Date(date).toUTCString(),
      unix: new Date(date).getTime()
  })
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
