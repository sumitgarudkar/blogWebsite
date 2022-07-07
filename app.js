const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Adipisicing cillum minim duis irure et in eiusmod ullamco exercitation eu voluptate aute minim amet. Eiusmod pariatur ut aute cupidatat occaecat ex elit aliqua mollit aute pariatur. Eu Lorem magna ipsum occaecat. Non non magna exercitation proident Lorem reprehenderit consequat anim velit nisi et esse eiusmod cillum. Velit veniam excepteur do mollit eiusmod. Non irure est pariatur dolore ad culpa in aliqua esse consectetur incididunt quis irure occaecat. Ex eiusmod deserunt ex ex mollit.";
const aboutContent = "Consectetur exercitation nostrud mollit consectetur esse sint. Consectetur laborum sint cupidatat cillum elit fugiat tempor. Mollit fugiat enim quis sunt. Pariatur sint ex qui dolore cupidatat sunt aliquip ipsum qui nulla veniam. Occaecat quis est reprehenderit esse exercitation id.";
const contactContent = "In deserunt dolor sit excepteur anim. Fugiat dolore elit exercitation fugiat sint proident. Aute in commodo ad laborum ut eu eiusmod do enim laborum ex fugiat. Consectetur cillum esse mollit enim ad eiusmod dolor proident. Deserunt excepteur esse Lorem ex consequat deserunt irure qui commodo nulla incididunt ullamco voluptate anim. Exercitation ad laborum eiusmod nulla ut esse. Fugiat qui laboris cupidatat nisi sint reprehenderit consequat consequat veniam ad Lorem veniam laborum officia.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://sumitgarudkar:test12345@cluster0.tjtaiuv.mongodb.net/blogDB")

const blogSchema = {
    title: String,
    author: String,
    content: String
}

const Blog = mongoose.model("Blog", blogSchema);

app.get('/', function(req,res){
    Blog.find({},function(err,blogs){
        res.render('home', {homeContent:homeStartingContent, blogs:blogs});
    })
});

app.get('/about', function(req,res){
    res.render('about', {content:aboutContent});
});

app.get('/contact', function(req,res){
    res.render('contact', {content:contactContent});
});

app.get('/compose', function(req,res){
    res.render('compose');
});

app.get('/posts/:blogId', function(req,res){
    const reqBlogId = req.params.blogId;

    Blog.findOne({_id:reqBlogId}, function(err,blog){
        if(!err){
            if(blog){
                res.render('post', { postTitle: blog.title, postAuthor: blog.author, postData:blog.content});
            }
        }
    })
});

app.post('/compose', function(req,res){
    const blog = new Blog({
        title : req.body.postTitle,
        author : req.body.postAuthor,
        content : req.body.postBody
    });
    blog.save(function(err){
        if(!err){
            res.redirect("/");
        }
    });
});

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
}

app.listen(port, function(){
    console.log("server is running on port 3000");
});