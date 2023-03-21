const express = require('express');
const Email = require('../mongoDB/connEmail+password');
const router = express.Router();

router.post('/Sign-in',async (req,res) => {
    const {rNum , password} = req.body;

    try{
        const findUserByrNum = await Email.findOne({rNum});

        if(!findUserByrNum){
            return res.status(200).json({Error : "User not registered yet....."});
        }

        if(findUserByrNum.rNum === rNum && findUserByrNum.password === password){
            res.render('dashboard',{tit : "Dashboard"});
        }else{
            return res.status(401).json({Error : "Wrong credentials....."});
        }

        // console.log(findUserByrNum);
    }catch(err){
        console.log(err);
    }
}) 

module.exports = router;