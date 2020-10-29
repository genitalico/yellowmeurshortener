const tools = require('../helpers/tools');
const settings = require('../appsettings');
const adminBinding = require('../models/adminBinding');
const baseBinding = require('../models/baseBinding');

exports.createNewUrlCode = async function (url, mongodb) {

    const urlCode = tools.getUrlCode(settings.lengthUrlCode);

    let saveUrlShortResult = await mongodb.transactions.saveUrlShort(urlCode, url);

    if (!saveUrlShortResult.err) {

        let responseModel = new adminBinding.responseNewUrl(urlCode, url);

        let resultTransaction = new baseBinding.resultTransaction(false, responseModel);

        return resultTransaction;
    }

    let resultTransaction = new baseBinding.resultTransaction(true, {});

    return resultTransaction;
}