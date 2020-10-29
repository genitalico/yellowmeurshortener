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

exports.uploadBulk = async function (pathFile, mongodb) {

    var resultReadFile = await tools.readFileByLines(pathFile);

    if (!resultReadFile.err) {

        let urls = resultReadFile.data;
        let resultValidate = tools.validateBulkUrls(urls);

        //invalid urls
        if (resultValidate.err) {

            let data = {
                type: 2,
                data: resultValidate.data
            }
            let resultTransaction = new baseBinding.resultTransaction(true, data);

            return resultTransaction;
        }

        let urlsToSave = [];

        for (let i = 0; i < urls.length; i++) {


            let urlCode = tools.getUrlCode(settings.lengthUrlCode);

            urlsToSave.push({
                short_code: urlCode,
                url: urls[i]
            });
        }

        let resultSaveBulk = await mongodb.transactions.saveBulkUrls(urlsToSave);

        let data = resultSaveBulk.data.ops;

        for(let i=0;i<data.length;i++){

            delete data[i].obj;
            delete data[i].created_date;
            delete data[i]._id;   
        }

        let resultTransaction = new baseBinding.resultTransaction(false, data);

        return resultTransaction;
    }

    //invalidReadFile
    let data = {
        type: 1
    }

    resultReadFile.data = data;

    return resultReadFile;
}