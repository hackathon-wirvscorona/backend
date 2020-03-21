const router = require('express').Router();

router.get('/', async(req,res) => {
    //DO SOMETHING HERE



    //SEND BACK INFORMATION
    res.status(200).send("THIS IS A TEST");
});

module.exports = router;