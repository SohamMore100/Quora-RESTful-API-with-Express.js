const express = require("express");
const app = express();
const port = 3030;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}))

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))

let posts =[
    {
        id:uuidv4(),
        username:"Zerodha",
        content:"I love money",
    },
    {
        id:uuidv4(),
        username:"HArsh",
        content:"I love money",
    },
    {
        id:uuidv4(),
        username:"Arjun",
        content:"I love money",
    },
    {
        id:uuidv4(),
        username:"Mangesh",
        content:"I love money",
    }   
]

app.get("/posts",(req,res) =>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res) =>{
    res.render("new.ejs",{posts});
})
app.post("/posts",(req,res) => {
    let {username,content} = req.body
    let id = uuidv4()
    posts.push({id,username,content})
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res) =>{
    let {id} = req.params
    console.log(id)
    let post = posts.find((p) => id===p.id)
    res.render("show.ejs",{post})
});

app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params
    let newContent = req.body.content
    let post = posts.find((p) => id===p.id)
    post.content = newContent
    console.log(post)
    res.redirect("/posts")
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p) => id===p.id)
    res.render("edit.ejs",{post})
    
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params
    posts = posts.filter((p) => id !==p.id)
    res.redirect("/posts")
})

// app.get("/",(req,res)
//     res.send

app.listen(port,() => {
    console.log(`listening to Port :${port}`);
})
