const tools = require('../helpers/tools');
const settings = require('../appsettings');
const adminBinding = require('../models/adminBinding');
const baseBinding = require('../models/baseBinding');

exports.createNewUrlCode = async function (url, mongodb) {


    let saveUrlShortResult = undefined;
    let urlCode = '';

    for (let i = 0; i < 2; i++) {

        urlCode = tools.getUrlCode(settings.lengthUrlCode);

        saveUrlShortResult = await mongodb.transactions.saveUrlShort(urlCode, url);

        if (!saveUrlShortResult.err)
            break;
    }

    if (!saveUrlShortResult.err) {

        let responseModel = new adminBinding.responseNewUrl(urlCode, url);

        let resultTransaction = new baseBinding.resultTransaction(false, responseModel);

        return resultTransaction;
    }

    let resultTransaction = new baseBinding.resultTransaction(true, {});

    return resultTransaction;
}

exports.uploadBulk = async function (pathFile) {

    var resultReadFile = await tools.readFileByLines(pathFile);

    if (!resultReadFile.err) {

        let resultValidate = tools.validateBulkUrls(resultReadFile.data);

        //invalid urls
        if (resultValidate.err) {

            let data = {
                type: 2,
                data: resultValidate.data
            }
            let resultTransaction = new baseBinding.resultTransaction(true, data);

            return resultTransaction;
        }
    }

    //invalidReadFile
    let data = {
        type: 1
    }

    resultReadFile.data = data;

    return resultReadFile;
}