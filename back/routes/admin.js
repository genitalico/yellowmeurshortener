var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.contentType('application/json');
    res.status(200);
    res.json();
    res.end();

});

module.exports = router;
