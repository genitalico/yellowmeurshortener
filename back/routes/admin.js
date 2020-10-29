var express = require('express');
var router = express.Router();
const adminTransaction = require('../transactions/adminTransaction');
const adminBinding = require('../models/adminBinding');
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const baseBinding = require('../models/baseBinding');

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

        let result = await adminTransaction.createNewUrlCode(validModel.url, req.mdb);

        res.status(200);
        res.json(result);
        res.end();
    }
    catch (err) {

        console.log(err);
        let data = {
            type: 3
        }
        let result = new baseBinding.resultTransaction(true, data);

        res.status(200);
        res.json(result);
        res.end();
    }

});

router.post('/bulkUrl', upload.single('file'), async function (req, res, next) {

    let result = await adminTransaction.uploadBulk(req.file.path, req.mdb);

    res.status(200);
    res.json(result);
    res.end();
});

module.exports = router;
