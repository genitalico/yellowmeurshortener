var express = require('express');
var router = express.Router();
const adminBinding = require('../models/adminBinding');
const tools = require('../helpers/tools');
const settings = require('../appsettings');

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

        console.log(settings.lengthUrlCode);

        const urlCode = tools.getUrlCode(settings.lengthUrlCode);

        let response = new adminBinding.responseNewUrl(urlCode,validModel.url);

        res.status(200);
        res.json(response);
        res.end();
    }
    catch (err) {

        res.status(200);
        res.json(err);
        res.end();
    }

});

module.exports = router;
