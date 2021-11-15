var express = require('express');
var router = express.Router();
let models = require('../lib/models');
let Rooms = models.Rooms;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/createroom', async (req, res, next) => {
  ///CHECK IF ROOM IS ALREADY CREATED//
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
router.put('/updatetemp', (req, res, next ) => {
  //TODO FOR NEXT VIDEO
  //put the NEW index.mjs on the bedroom machine.
  //Convert to float or convert incoming to a int.
  //req.body.roomName
  //req.body.timePassedToSrv
  // req.body.currentTemp
  // req.body.token
  console.log(`${req.body.roomName} ${req.body.currentTemp} ${req.body.token}`);
});

module.exports = router;
