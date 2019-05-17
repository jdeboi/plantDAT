var express = require('express');
var router = express.Router();
var moment = require('moment');
var Plant = require('../models/plant')
var plantTypeJson = require('../public/json/plantTypes');

router.get('/plant/:id', function(req, res, next) {
  var id = req.params.id;
  console.log("id: " + id);
  Plant
  .findOne({code:id})
  .exec(function (err, doc) {
    if (err) {
      res.send(err);
    }
    if (doc != null) {
      let plant = {
        plant: doc,
        type: plantTypeJson[doc.name]
      };
      res.json(plant);
    }
    else {
      res.json({});
    }
  });
  // res.render('plant', { plant: id });
});

router.get('/allspawned', function(req, res, next) {
  Plant
  .find({spawned:true})
  .exec(function (err, docs) {
    if (err) {
      res.send(err);
    }

    if (docs != null) {
      let i = 0;
      plants = [];
      for(let plant of docs) {
        let now = (Date.now());
        let born = new Date(moment(plant.created_at).format("YYYY-MM-DD HH:mm"))
        let diffHours = (now - born)/1000/60/60;
        let roundedHours = diffHours.toFixed(1);
        plants.push({
          plant: plant,
          age: roundedHours,
          type: plantTypeJson[plant.name]
        });
      }
      res.json(plants);
    }
    else {
      res.json({});
    }

  });
  // res.render('plant', { plant: id });
});

router.post('/spawnplant/:id', function(req, res, next) {
  var id = req.params.id;
  Plant
  .findOne({code:id}, function (err, plant) {
    if (err) {
      res.send(err);
    }
    if (plant != null) {
      plant.spawned = true;
      plant.created_at = new Date();
      plant.save();
      return res.status(201).send({
        success: 'true',
        message: 'plant spawned successfully', plant
      })
    }
    return res.status(400).send({
      success: 'false',
      message: 'no plant found'
    });

  });
});

module.exports = router;
