const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ejs = require('ejs');
const mongodb = require("mongodb");

const app = express(); 

//mongodb connect
const MongoClient = mongodb.MongoClient;
const ObjectID = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/todoapp";

app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));

//view
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//connect to database
MongoClient.connect(url,(err,database) => {
    if(err) {
        console.log(err);

    }
    db = database;
    Todos = db.collection("todo");
    console.log("Mongodb database is connected");
});

app.get("/",(req,res) => {
    Todos.find({}).toArray((err,todo) => {
        if(err) {
            return  console.log(err);
        }
        console.log(todo);
        res.render("index",{
            todos:todo
        });
    });    
});
app.post("/todo/add",(req,res) => {
   // console.log("Submitted");
   const todo = {
       text:req.body.text,
       body:req.body.body
   }
   //insert todo
   Todos.insert(todo,(err,result) => {
       if(err) {
           return console.log(err);
       }
       console.log("Todo added....");
       res.redirect("/");

   });


});

app.delete("/todo/delete/:id",(req,res) => {
    const query =  {
        _id:ObjectID(req.params.id)
    }
    Todos.deleteOne(query,(err,response) => {
        if(err) {
            return console.log(err);
        }
        console.log("Todo removed");
        res.send(200);

    });

});

app.get("/todo/edit/:id",(req,res) => {
    const query =  {
        _id:ObjectID(req.params.id)
    }
    Todos.find(query).next((err,todo) => {
        if(err) {
            return  console.log(err);
        }
        console.log(todo);
        res.render("edit",{
            todo:todo
        });
    });    
});

app.post("/todo/edit/:id",(req,res) => {
    const query =  {
        _id:ObjectID(req.params.id)
    }
    // console.log("Submitted");
    const todo = {
        text:req.body.text,
        body:req.body.body
    }
    //insert todo
    Todos.updateOne(query,{$set:todo},(err,result) => {
        if(err) {
            return console.log(err);
        }
        console.log("Todo updated....");
        res.redirect("/");
 
    });
 
 
 });

app.listen(3000,() => {
    console.log("Server is running at port no 3000");

});

