var express = require('express');
var router = express.Router();
var moment = require('moment');
var plantTypeJson = require('../public/json/plantTypes');
var Plant = require('../models/plant')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  console.log("id: " + id);
  Plant
  .findOne({code:id})
  .exec(function (err, doc) {
    if (err) {
      console.log("not working: " + error);
      return console.error(err);
    }
    else {
      if (doc) {

        res.render('plant', {
          plant: doc,
          plantType: plantTypeJson[doc.name],
          moment: moment
        });
      }
      else {
        res.render('notfound', {});
      }
    }
  });
  // res.render('plant', { plant: id });
});


module.exports = router;
