var express = require('express');
var router = express.Router();
let models = require('../lib/models');
let Rooms = models.Rooms;
let Units = models.Units;
let Locations = models.Locations;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//ADD CREATE LOCATION
router.get('/mainobject', async (req,res, next) => {
  let mainOb = [];
  let errors = '';
  await Locations.findAll().then((results) => {
      mainOb.push(results);
  }).catch((error) => {
    errors += error;
  });
  await Units.findAll().then((results) => {
    mainOb.push(results);
  }).catch((error) => {
    errors += error;
  });
  await Rooms.findAll().then((results) => {
    mainOb.push(results);
  }).catch((error) => {
    errors += error;
  });
  //PUT ERRORS IN OBJECT
  console.log(errors);
  res.send(JSON.stringify(mainOb));
});
router.post('/location', async (req, res, next) => {
  let locCount;
  await Locations.count({ where: { locName: req.body.locationName } }).then((count) => { locCount = count });///findOrCreate?????
  if (locCount === 0) {
    await Locations.create({
      locName: req.body.locationName,
      description: null
    }).then((results) => {
      res.send(`{ "results" : "Created" }`);
    }).catch((error) => {
      res.send(`{ "results" : "${error}" }`);
    });
  } else {
    res.send(`{"results" : "Location already exists."}`)
  }
});
router.post('/createunit', async (req, res, next) => {
  let count = 0;
  await Units.count({ where: { unitName: req.body.unitName.toLowerCase() } }).then((res) => { count = res; });///findOrCreate????
  if (count === 0) {
    await Units.create({
      unitName: req.body.unitName.toLowerCase(),
      timePassedToSrv: req.body.timePassedToSrv,
      location: req.body.location,
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
      location: req.body.location,
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
router.put('/unitinstructions', async (req, res, next) => {
  if (req.body.token === "9999999999") {
    //send back pinNunmber
    //onoff
    let controlRoom;
    let desiredTemp;
    let unitLocation;
    let roomLocation;
    let roomTemp;
    await Units.findOne({
      where:
      {
        id: req.body.id,
      }
    }).then((results) => {
      controlRoom = results.controlRoom;
      desiredTemp = results.desiredTemp;
      unitLocation = results.location;
    }).catch((error) => {
      res.send(`{ "results" : "${error}" }`);
    });
    if (typeof (controlRoom) !== 'undefined') {
      await Rooms.findOne({
        where:
        {
          id: controlRoom
        }
      }).then((results) => {
        roomLocation = results.location;
        roomTemp = results.currentTemp;
      }).catch((error) => {
        res.send(`{ "results" : "${error}" }`);
      });
    }
    let sendBack;
    if (roomLocation === unitLocation && roomTemp < desiredTemp) {
      sendBack = `{"results" : "1" }`;
    } else if (roomLocation === unitLocation && roomTemp >= desiredTemp) {
      sendBack = `{"results" : "0" }`;
    } else if (roomLocation !== unitLocation) {
      sendBack = `{"results" : "Error, Locations do not match." }`;
    } else {
      sendBack = `{"results" : "Error." }`;
    }
    res.send(`${sendBack}`);
  } else {
    res.send(`{ "results" : "Bad Token" }`);
  }
});
router.put('/updatetemp', async (req, res, next) => {
  if (req.body.token === "999999999") {
    await Rooms.update({ currentTemp: `${parseInt(req.body.currentTemp)}`, timePassedToSrv: `${req.body.timePassedToSrv}` },
      {
        where: {
          id: req.body.id,
        }
      }).then((results) => {
        console.log(`${req.body.id} ${req.body.currentTemp} ${req.body.token} ${req.body.timePassedToSrv} ${results}`);
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


module.exports = router;
