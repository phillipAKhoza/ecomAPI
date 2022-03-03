const router = require("express").Router();
const Cart = require("../models/Cart");
const { tokenVerificationAndAuth, tokenVerificationAndAdmin} = require("./tokenVerifyer");

// CREATE
router.post("/", tokenVerificationAndAuth, async(req, res)=>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();

        res.status(200).json(savedCart);
    }catch(error){
        res.status(500).json(error);
    }
});

//UPDATE
router.put("/:id", tokenVerificationAndAuth, async (req,res)=>{
    
    try{
        const updatedCart = await Cart.findByIdAndUpdate( req.params.id,{
            $set: req.body
        },{new:true}); 
        res.status(200).json(updatedCart); 
    }catch(error){
        res.status(500).json(error);
    }
});

//DELETE
router.delete("/:id", tokenVerificationAndAuth, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    }catch(error){
        res.status(500).json(error);
    }
});

//GET USER CART
router.get("/find/:id", tokenVerificationAndAuth, async (req,res)=>{

    try{
        const cart = await Cart.findOne(req.params.id);    
        res.status(200).json(cart);
        
    }catch(error){
        res.status(500).json(error);
    }
});

// //GET ALL CARTS(ADMIN ONLY)
router.get("/", tokenVerificationAndAdmin, async (req, res)=>{
    try{
        const allCarts = await Cart.find();

        res.status(200).json(allCarts);
    }catch(error){
        res.status(500).json(error);
    }
});


module.exports = router;