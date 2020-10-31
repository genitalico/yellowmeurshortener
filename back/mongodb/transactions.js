const baseBinding = require('../models/baseBinding');
exports.Db = function (db, mdb) {

    this.saveUrlShort = async function (urlCode, url) {
        try {

            let document = {
                short_code: urlCode,
                url,
                obj: 1,
                created_date: new Date()
            };

            var result = await db.collection(mdb.collection).insertOne(document);

            let resultTransaction = new baseBinding.resultTransaction(false, result);

            return resultTransaction;

        }
        catch (err) {
            console.log(err);
            let resultTransaction = new baseBinding.resultTransaction(true, result);
            return resultTransaction;
        }
    }

    this.saveBulkUrls = async function (urls) {

        try {

            let documents = [];

            for (let i = 0; i < urls.length; i++) {

                let document = {
                    short_code: urls[i].short_code,
                    url: urls[i].url,
                    obj: 1,
                    created_date: new Date()
                };

                documents.push(document);
            }

            var result = await db.collection(mdb.collection).insertMany(documents, { ordered: false });

            let resultTransaction = new baseBinding.resultTransaction(false, result);

            return resultTransaction;
        }
        catch (err) {

            if (err.code == 11000) {

                let urlErrors = [];

                for (let i = 0; i < err.writeErrors.length; i++) {
                    let url = err.writeErrors[i].err.op.url;

                    urlErrors.push(url);
                }

                let data = {
                    type: 11000,
                    data: urlErrors
                }

                let resultTransaction = new baseBinding.resultTransaction(true, data);

                return resultTransaction;
            }
        }
    }

    this.findShortCode = async function (shortCode) {

        try {

            let query = {
                $and: [
                    { obj: 1 },
                    { short_code: shortCode }
                ]
            }
            let result = await db.collection(mdb.collection).findOne(query);

            if (!result) {
                let resultTransaction = new baseBinding.resultTransaction(true, {});

                return resultTransaction;
            }

            let data = {
                url: result.url
            }

            let resultTransaction = new baseBinding.resultTransaction(false, data);

            return resultTransaction;

        }
        catch (err) {

            let resultTransaction = new baseBinding.resultTransaction(true, {});

            return resultTransaction;
        }
    }
}
