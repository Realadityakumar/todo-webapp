const express = require("express");
const {UserModel,TodoModel} = require("./db");
const jwt = require("jsonwebtoken");
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
            id: user._id
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

app.post("/todo",async function(req,res){
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

app.post("/todos",function(req,res){
    
});

app.listen(3000);