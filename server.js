const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

const Product = require('./Models/productModel');
// Routes

// Middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// GET
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/demo', (req, res) => {
    res.send('This is DEMO on  Node API');
})

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})

// Update a product

app.put('/products/:id', async (req, res) => {
    try
    {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if (!product) 
        {
            res.status(404).json({message:`Product ${id}not found`});
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    }catch(err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
}
)

// Delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({message:`Product ${id} not found`});
        }
        res.status(200).json({message:`Product ${id} deleted`});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
        console.log("Hell")
    }
}
)

// POST

app.post('/products',async (req, res) => {

    try {
       const product =  await Product.create(req.body);
       res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})

// Replace username ands password with your own

mongoose.connect('mongodb+srv://{username}:{password}@cluster0.o8d9pli.mongodb.net/NODEAPI?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log('NODE API running on port: ' + port);
    })
   
}).catch((err) => {
    console.log('Error connecting to MongoDB');
    console.log(err);
})