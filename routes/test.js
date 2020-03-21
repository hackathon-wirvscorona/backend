const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, async(req,res) => {
    //DO SOMETHING HERE



    //SEND BACK INFORMATION
    res.status(200).send("THIS IS A TEST");
});

module.exports = router;