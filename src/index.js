require('./db/mongoose');
const express = require('express');
const Blog = require('./models/blog');
const multer = require('multer');
var bodyParser = require('body-parser');


const app = express();
app.use(express.json());

app.use(express.urlencoded());



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 

// app.use(methodOverride('_method'))

// ==========================
app.get('/', async (req, res) => {
     // const article = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index.html');
})
app.get('/blogs', async (req, res) => {
    res.render('articles/new.html')
})

app.get('/show', async (req, res) => {
    res.render('articles/show.html')
})


app.get('/edit', async (req, res) => {
    res.render('articles/edit.html')
})

app.get('/allblogs', async (req, res) => {
    // res.render('articles/new.html')
    try {
        const blogs = await Blog.find({});
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
})

//   add new article 
app.post('/blogs',async (req, res) => {
 
    // res.render('articles/new.html')
    const blog = new Blog(req.body);
    console.log(req.body);

    try {
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})

// get one article

app.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404);
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})

//  edit

app.patch('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blog) {
            return res.status(404).send();
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})


// delete 1 article
app.delete('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})


app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);
app.listen(3000, (req, res) => {
    console.log('app is running in port 3000!');
})