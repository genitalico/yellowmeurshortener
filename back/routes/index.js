var express = require('express');
var router = express.Router();
const adminTransaction = require('../transactions/adminTransaction');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:shortCode', async function (req, res, next) {

  let shortCode = req.params.shortCode;

  if (shortCode == undefined || shortCode == null) {
    res.render('index', { title: 'Express' });
    return;
  }


  let result = await adminTransaction.findShortCode(req.params.shortCode, req.mdb);

  if (!result.err) {
    res.redirect(result.data.url);
    return;
  }

  let response = {
    code: 1005,
    messages: ['Register NotFound'],
    content: {}
  }

  
  res.status(200);
  res.json(response);
  res.end();
  return;
});

module.exports = router;
