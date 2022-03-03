const router = require("express").Router();
const Product = require("../models/Product");
const { tokenVerificationAndAuth, tokenVerificationAndAdmin} = require("./tokenVerifyer");

// CREATE
router.post("/", tokenVerificationAndAdmin, async(req, res)=>{
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();

        res.status(200).json(savedProduct);
    }catch(error){
        res.status(500).json(error);
    }
});

//UPDATE
router.put("/:id", tokenVerificationAndAdmin, async (req,res)=>{
    
    try{
        const updatedProduct = await Product.findByIdAndUpdate( req.params.id,{
            $set: req.body
        },{new:true}); 
        res.status(200).json(updatedProduct); 
    }catch(error){
        res.status(500).json(error);
    }
});

//DELETE
router.delete("/:id", tokenVerificationAndAdmin, async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    }catch(error){
        res.status(500).json(error);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req,res)=>{

    try{
        const product = await Product.findById(req.params.id);    
        res.status(200).json(product);
        
    }catch(error){
        res.status(500).json(error);
    }
});

//GET ALL PRODUCTS
router.get("/", async (req,res)=>{
    
    const newQuery = req.query.new;
    const categoryQuery = req.query.category;

    try{
        let products;

        if(newQuery){
            products = await  Product.find().sort({createdAt:-1}).limit(5);
        }else if(categoryQuery){
            products = await  Product.find({
                categories: {
                    $in : [categoryQuery],
                }
            });
        }else{
            products = await  Product.find();

        }
        res.status(200).json(products);
    }catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;