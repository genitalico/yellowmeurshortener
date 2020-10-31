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

    if (req.file == undefined) {

        let response = {
            code: 1000,
            messages: ['Invalid Model'],
            content: {}
        }

        res.status(200);
        res.json(response);
        res.end();
        return;
    }

    if (req.file.mimetype != 'text/plain') {

        let response = {
            code: 1000,
            messages: ['Invalid Model'],
            content: {}
        }

        res.status(200);
        res.json(response);
        res.end();
        return;

    }

    let result = await adminTransaction.uploadBulk(req.file.path, req.mdb);

    if (result.err) {
        let response = {
            code: 1003,
            messages: ['Internal Error'],
            content: {}
        }

        res.status(200);
        res.json(response);
        res.end();
        return
    }

    let response = {
        code: 1002,
        messages: ['Register Created'],
        content: result.data
    }

    res.status(200);
    res.json(response);
    res.end();
});

router.get('/list', async function (req, res, next) {

    let result = await adminTransaction.getAllUrls(req.mdb);

    if (!result.err) {
        let response = {
            code: 1007,
            messages: ['Correct'],
            content: result.data
        }

        res.status(200);
        res.json(response);
        res.end();
        return;
    }

    res.status(200);
    res.json();
    res.end();
});

module.exports = router;
