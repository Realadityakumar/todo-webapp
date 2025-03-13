const express = require("express");
const {UserModel,TodoModel} = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Clock0:ADPxKGCKXJBTwL2S@cluster0.egelc.mongodb.net/todo-app-database")
const app = express();
app.use(express.json());
const JWT_SECRET = "helloworld";
app.post("/signup", async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "You are logged in"
    })
});

app.post("/signin",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    })
    console.log(user);
    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET);

        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            msg: "user not found"
        })
    }
});

app.post("/todo",auth,async function(req,res){
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.insert({
        title: title,
        done: done
    })

    res.json({
        res: "todo added"
    })
});

app.post("/todos",auth,function(req,res){
    
});

function auth(req,res,next){
    const token = req.headers.token;
    const decode = jwt.verify(token,JWT_SECRET);

    if(decode){
        req.userId = decode.Id;
        next();
    }else{
        res.status(403).json({
            message: "Incorrect crendentials "
        })
    }
}
app.listen(3000);