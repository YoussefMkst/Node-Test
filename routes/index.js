const express = require("express");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.get('/', authorize ,(req,res)=>{
    //res.send(req.params);
    //console.log(req.header("Authorization"));
    res.send(req.user); 
});

module.exports = router;