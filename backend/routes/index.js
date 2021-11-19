var express = require('express');
var router = express.Router();
let models = require('../lib/models');
let Rooms = models.Rooms;
let Units = models.Units;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/createunit', async (req, res, next) => {
  let count = 0;
  await Units.count({ where: { unitName: req.body.unitName.toLowerCase() } }).then((res) => { count = res; });
  if (count === 0) {
    await Units.create({
      unitName: req.body.unitName.toLowerCase(),
      timePassedToSrv: req.body.timePassedToSrv,
      desiredTemp: 0,
      controlRoom: "unset"
    }).then((results) => {
      res.send(`{ "results" : "Created" }`);
    }).catch((error) => {
      res.send(`{ "results" : "${error}" }`);
    });
  } else {
    res.send(`{ "results" : "That unit name is taken."}`);
  }
});
router.post('/createroom', async (req, res, next) => {
  let count = 0;
  await Rooms.count({ where: { roomName: req.body.roomName.toLowerCase() } }).then((res) => { count = res; });
  if (count === 0) {
    await Rooms.create({
      roomName: req.body.roomName.toLowerCase(),
      timePassedToSrv: req.body.timePassedToSrv,
      currentTemp: 90,
    }).then((results) => {
      res.send(`{ "results" : "Create" }`);
    }).catch((error) => {
      res.send(`{ "results" : "${error}" }`);
      console.log(error);
    });
  } else {
    console.log(`${req.body.roomName.toLowerCase()} already exists.`)
    res.send(`{ "results" : "That room already exists." }`);

  }
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
