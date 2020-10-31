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

router.post('/AddUrl', async function (req, res, next) {

    let body = req.body;
    try {

        const validModel = await adminBinding.newUrlPostSchema.validateAsync(body);

        let result = await adminTransaction.createNewUrlCode(validModel.url, req.mdb);

        if (!result.err) {
            let response = {
                code: 1002,
                messages: ['Register Created'],
                content: {
                    short_url: result.data.url_code,
                    url: validModel.url
                }
            }

            res.status(200);
            res.json(response);
            res.end();
            return;
        }

        let response = {
            code: 1003,
            messages: ['InternalError'],
            content: {}
        }

        res.status(200);
        res.json(response);
        res.end();
    }
    catch (err) {

        let response = {
            code: 1003,
            messages: ['InternalError'],
            content: {}
        }

        res.status(200);
        res.json(response);
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
