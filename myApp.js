var express = require('express');
var app = express();
var bodyParser = require('body-parser')
 
// small changes
//  7  Implement Root-Level Request Logger Middleware 

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip)
  next()
});

// basics 1

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// 2 Start a Working Express Server

// app.get('/', (req, res) => {
//   res.send('Hello Express')
// })

// 3 Serve an HTML File (need)

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// 4 Serve Static Assets (need)

app.use("/public", express.static(__dirname + "/public"));

// ------------------
// app.get("/name", (req, res) => {
//  var { name } = req.params;
//   res.json({
//     name: 'firstname lastname'
//   });
// });

// 5 Serve JSON on a Specific Route

// let message = { message: "Hello json" };

// app.get("/json", 
//     (req, res) => { 
//       res.json(
//         { message: 'Hello json' }
//       )
// });


// 6 Use the .env File

// let message = { message: "Hello json" };
// let mySecret = process.env.MESSAGE_STYLE

// app.get("/json", (req, res) => {
//   if (process.env.MESSAGE_STYLE === 'uppercase') {
//     res.json({"message": "HELLO JSON"})
//   } else {
//     res.json(message)
//   }
// });

// 7 Implement a Root-Level Request Logger Middleware

// const mySecret = process.env.MESSAGE_STYLE;
// var string = req.method + " " + req.path + " - " + req.ip;

// app.use("/", (req, res, next) => {
  
//   console.log(req.method + " " + req.path + " - " + req.ip);
//   console.log('fail');
//   next()
// })

// 8 to chain
// app.get("/json", (req, res) => {
//   res.json ({
//     if (mySecret = "uppercase") {
//       res.json({"message": "HELLO JSON"})
//     }else{
//       res.json({"message": "Hello json"})
//     }
//   };


// 9 GET TIME vvv
app.get("/now", 
        (req, res, next) => {
  req.string = new Date().toString();

  next();
        },
  (req, res) => {
    res.send({time : req.string});
  });

// 10 Get Query Parameter Input from the Client

app.get("/name", (req, res, next) => {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});

// 11 Use body-parser to Parse POST Requests

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())


// 12 Get Data from POST Requests

app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;
  
  res.json({ name: string });
  
})

// app.post("/name", function(req, res) {
//   // Handle the data in the request
//   var string = req.body.first + " " + req.body.last;
//   res.json({ name: string });
// });

 module.exports = app;