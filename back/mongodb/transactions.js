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
}
