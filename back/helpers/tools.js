const fs = require('fs');
const baseBinding = require('../models/baseBinding');
const adminBinding = require('../models/adminBinding');

exports.getUrlCode = function (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.readFileByLines = async function (pathFile) {

    try {
        const data = await fs.promises.readFile(pathFile, 'utf8');

        let lines = data.split('\n');

        let result = new baseBinding.resultTransaction(false, lines);

        fs.unlinkSync(pathFile);

        return result;
    }
    catch (err) {

        let result = new baseBinding.resultTransaction(true, {});

        fs.unlinkSync(pathFile);

        return result;
    }
}

exports.validateBulkUrls = function (urls) {

    let invalidUrls = [];
    let errorAll = false;

    for (let i = 0; i < urls.length; i++) {

        let model = {
            url: urls[i]
        }

        const validModel = adminBinding.newUrlPostSchema.validate(model);

        if (validModel.error) {
            errorAll = true;
            invalidUrls.push(urls[i]);
        }
    }

    let result = new baseBinding.resultTransaction(errorAll, invalidUrls);

    return result;
}