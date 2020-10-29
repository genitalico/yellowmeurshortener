var express = require('express');
var router = express.Router();
const adminTransaction = require('../transactions/adminTransaction');
const adminBinding = require('../models/adminBinding');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.contentType('application/json');
    res.status(200);
    res.json();
    res.end();

});

router.post('/newurl', async function (req, res, next) {

    let body = req.body;
    try {

        const validModel = await adminBinding.newUrlPostSchema.validateAsync(body);

        result = await adminTransaction.createNewUrlCode(validModel.url,req.mdb);

        if (!result.err) {
            res.status(200);
            res.json(result);
            res.end();
        }
        else {
            res.status(200);
            res.json();
            res.end();
        }
    }
    catch (err) {

        console.log(err);

        res.status(200);
        res.json(err);
        res.end();
    }

});

module.exports = router;
