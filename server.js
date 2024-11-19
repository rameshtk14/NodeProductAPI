const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

const Product = require('./Models/productModel');
// Routes

// Middleware

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/blog', (req, res) => {
    res.send('Hello bloggers this is TRK');
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
        console.log("Hello")
        console.log(err);
        res.status(500).json({message:err.message});
        console.log("Hell")
    }
}
)

app.post('/products',async (req, res) => {

    try {
       const product =  await Product.create(req.body);
       res.status(200).json(product);
       // console.log(req.body);
        //res.send(req.body)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message:err.message});
    }
})


mongoose.connect('mongodb+srv://ramesh2014tk:exploreD_24@cluster0.o8d9pli.mongodb.net/NODEAPI?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log('NODE API running on port: ' + port);
    })
   
}).catch((err) => {
    console.log('Error connecting to MongoDB');
    console.log(err);
})