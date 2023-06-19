const express = require("express");
const cors = require("cors");
const app = express();
const ejs = express('ejs');
const Prepositions = require("./Prepositions.json")

// Use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.set("view engine","ejs");

app.get("/", (req, res) => {
  res.redirect("/preposition");
});

app.get("/wordbook", (req, res) => {
  res.render("wordbook",{Prepositions,host:req.protocol+"://"+req.headers.host});
});

app.get("/preposition",(req,res)=>{
  res.render("preposition",{Prepositions,host:req.protocol+"://"+req.headers.host});
})

// Test Get Route
// app.get("/",(req,res)=>{
//   res.send("user server is Successfully Running...");
// });

// Error Handler
app.use((req,res,next)=>{
  res.send('Requested url was not found!')
  next();
})

app.use((err, req, res, next) => {
  if(res.headersSend){
    next('Already Header Send.There was a problem!');
  }
  else{
    if(err.message){
      res.status(500).send(err.message);
    }
    else{
      res.send('There was wrong!')
    }
  } 
})


//Server Run
const port = process.env.PORT || 5000;
app.listen(port, () => `Server running`);