const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("Users api endpoint");
})

module.exports = router;