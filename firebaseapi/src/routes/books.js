const { Router } = require('express');
const router = Router();
const admin = require('firebase-admin');
router.get('/', (req, res) => {
    console.log("Index Works");
    res.send({result: "holaaaaa"});
})

module.exports = router;