const express = require('express')
const router = express.Router();
const Product = require('./ProductModel');

router.get('/products', (req,res,next) => {
    Product.find(function(err,products)
    {
        
        res.json(products);
    })
});


router.post('/product', (req,res,next)=>{
    let newProduct = new Product({
        Product_Id: req.body.Product_Id,
        Name: req.body.Name,
        details: req.body.details,
        isPackage: req.body.isPackage,
        subProducts: req.body.subProducts
    });

    newProduct.save((err, product) => {
        if(err)
        {
            res.json({msg: 'Failed to add product'});
            //res.send({message:'Error in saving to database'});
        }
        else{
            res.json({msg: 'Product added successfully'});
        }
    });
});

router.delete('/product/:id',(req,res,next)=>{
    Product.remove({_id: req.params.id}, function(err, result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
})

router.put('/updateProduct/:id',(req,res,next)=>{

    Product.findByIdAndUpdate(req.params.id,
        {
            $set: {
                Product_Id: req.body.Product_Id,
                Name: req.body.Name,
                details: req.body.details,
                isPackage: req.body.isPackage,
                subProducts: req.body.subProducts
            }
        },
        {
            new: true
        },
        function(err,updatedProduct){
            if(err)
            {
                res.send("Error updating product");
            }
            else
            {
                res.json(updatedProduct);
            }
        })
})

router.get('/productId/:id',(req,res,next) => {
    Product.findById(req.params.id,function(err,products){
        res.json(products);
    })
});

module.exports = router;