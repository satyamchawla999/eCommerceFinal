const router = require("express").Router();


router.get("/", (req, res) => {
    return res.send("hello")
})

router.use('/user',require('./user'));
router.use('/product',require('./product'));
router.use('/order',require('./order'))
router.use('/chat',require('./chat'))


module.exports = router;