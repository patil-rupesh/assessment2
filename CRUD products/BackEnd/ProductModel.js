const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    Product_Id:{
        type:String
    },
    Name:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    isPackage:{
        type:Boolean,
        default:false
    },
    subProducts:{
        type:[String]
               
    }
},
{
    timestamps:true
});

const Product = module.exports = mongoose.model("Product",productSchema);