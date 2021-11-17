var express = require('express');
var router = express.Router();
let models = require('../lib/models');
let Rooms = models.Rooms;
let Units = models.Units;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/createroom', async (req, res, next) => {
  ///CHECK IF ROOM IS ALREADY CREATED------//
  await Rooms.create({
    roomName: req.body.roomName.toLowerCase(),
    timePassedToSrv: Date(),
    currentTemp: 90,
  }).then((results) => {
    res.send(`{ "results" : "${results}" }`);
  }).catch((error) => {
    console.log(error);
  });
});
router.put('/updatetemp', async (req, res, next) => {
  if (req.body.token === "999999999") {
    await Rooms.update({ currentTemp: `${parseInt(req.body.currentTemp)}`, timePassedToSrv: `${req.body.timePassedToSrv}` },
      {
        where: {
          roomName: req.body.roomName,
        }
      }).then((results) => {
        console.log(`${req.body.roomName} ${req.body.currentTemp} ${req.body.token} ${req.body.timePassedToSrv} ${results}`);
        res.send(`{ "results" : "${results}" }`);
        ///LOG TO DB LOG
      }).catch((error) => {
        console.log(error);
        res.send(`{ "results" : "done" }`);
      })
  } else {
    res.send(`{ "results" : "Bad Token" }`);
  }
});
router.put('/heateronoff', async (req, res, next) => {

  res.send(`{ "results" : "false" }`);
});

module.exports = router;
