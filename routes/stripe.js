const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (res,req)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.bbody.amount,
        currency: "zar"
    }, (stripeError , stripeRes)=>{
        if(stripeError){
            res.statusCode(500).json(stripeError);
        }else{
            res.statusCode(200).json(stripeRes);
        }
    });
});

module.exports = router;