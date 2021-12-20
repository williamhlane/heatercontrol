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
router.get('/mainobject', async (req, res, next) => {
  let mainOb = [];
  let errors = '';
  await Locations.findAll().then((results) => {
    let temp = [];
    for (let i = 0; i < results.length; i++) {
      temp.push(results[i].dataValues);
    }
    mainOb.push(temp);
  }).catch((error) => {
    errors += error;
  });
  await Units.findAll().then((results) => {
    let temp = [];
    for (let i = 0; i < results.length; i++) {
      temp.push(results[i].dataValues);
    }
    mainOb.push(temp);
  }).catch((error) => {
    errors += error;
  });
  await Rooms.findAll().then((results) => {
    let temp = [];
    for (let i = 0; i < results.length; i++) {
      temp.push(results[i].dataValues);
    }
    mainOb.push(temp);
  }).catch((error) => {
    errors += error;
  });
  //PUT ERRORS IN OBJECT
  console.log(errors);
  res.send(JSON.stringify(mainOb));
});
router.post('/location', async (req, res, next) => {
  let locCount;
  await Locations.count({ where: { locName: req.body.locName.toUpperCase() } }).then((count) => { locCount = count });///findOrCreate?????
  if (locCount === 0) {
    await Locations.create({
      locName: req.body.locName.toUpperCase(),
      description: null
    }).then((results) => {
      console.log(results);
      res.send({ "results" : "Completed" });
    }).catch((error) => {
      res.send({ "results" : `${error}` });
    });
  } else {
    res.send({"results" : "Location already exists."})
  }
});
router.delete('/location', async (req, res, next) => {
  ////NEED TO TEST THAT ROOMS AND UNITS ARE BEING DELETED///
  let locCount;
  let send;
  await Locations.count({ where: { id: req.body.locationId } }).then((count) => { locCount = count });
  if (locCount > 0) {
    await Locations.destroy({
      where: {
        id: req.body.locationId
      }
    }).then((results) => {
      console.log(results);
      send = { "results" : "Completed" };
    }).catch((error) => {
      send = { "results" : "${error}" };
    });
  } else {
    send = {"results" : "Location does not exists."};
  }
  let unitCount;
  await Units.count({ where: { locationId: req.body.locationId } }).then((count) => { unitCount = count });
  if (unitCount > 0) {
    await Units.destroy({
      where: {
        locationId: req.body.locationId
      }
    }).then((results) => {
      console.log(results);
    }).catch((error) => {
      console.log({ "results" : "${error}" });
    });
  } else {
    console.log({"results" : "Unit does not exists."})
  }
  //THE DELETE ROOMS WILL GO HERE
  let roomsCount;
  await Rooms.count({ where: { locationId: req.body.locationId } }).then((count) => { roomsCount = count });
  if (roomsCount > 0) {
    await Rooms.destroy({
      where: {
        locationId: req.body.locationId
      }
    }).then((results) => {
      console.log(results);
    }).catch((error) => {
      console.log({ "results" : "${error}" });
    });
  } else {
    console.log({"results" : "Location does not exists."})
  }
  res.send(send);
});

router.post('/units', async (req, res, next) => {
  let count = 0;
  await Units.count({ where: { unitName: req.body.unitName.toUpperCase(), locationId: req.body.locationId } }).then((res) => { count = res; });///findOrCreate????
  if (count === 0) {
    await Units.create({
      unitName: req.body.unitName.toUpperCase(),
      timePassedToSrv: req.body.timePassedToSrv,
      locationId: req.body.locationId,
      desiredTemp: 0,
      controlRoomId: null
    }).then((results) => {
      console.log(results);
      res.send({ "results" : "Completed" });
    }).catch((error) => {
      console.log(error);
      res.send({ "results" : "${error}" });
    });
  } else {
    res.send({ "results" : "That unit name is taken."});
  }
});

router.delete('/units', async (req, res, next) => {
  let send;
  ////THE DELETE UNITS WILL GO HERE
  let unitCount;
  await Units.count({ where: { id: req.body.id } }).then((count) => { unitCount = count });
  if (unitCount > 0) {
    await Units.destroy({
      where: {
        id: req.body.id
      }
    }).then((results) => {
      console.log(results);
      send = { "results" : "Completed" };
    }).catch((error) => {
      console.log({ "results" : "${error}" });
    });
  } else {
    console.log({"results" : "Unit does not exists."})
  }
  res.send(send);
});

router.post('/rooms', async (req, res, next) => {
  let count = 0;
  await Rooms.count({ where: { roomName: req.body.roomName.toUpperCase(), locationId: req.body.locationId } }).then((res) => { count = res; });
  if (count === 0) {
    await Rooms.create({
      roomName: req.body.roomName.toUpperCase(),
      timePassedToSrv: req.body.timePassedToSrv,
      locationId: req.body.locationId,
      currentTemp: req.body.currentTemp,
    }).then((results) => {
      console.log(results);
      res.send({ "results" : "Completed" });
    }).catch((error) => {
      console.log(error);
      res.send({ "results" : `Error: ${error}` });
    });
  } else {
    console.log(`${req.body.roomName.toUpperCase()} already exists.`)
    res.send({ "results" : "That room already exists." });

  }
});
router.delete('/rooms', async (req, res, next) => {

  let send;
  let roomsCount;
  await Rooms.count({ where: { id: req.body.id } }).then((count) => { roomsCount = count });
  if (roomsCount > 0) {
    await Rooms.destroy({
      where: {
        id: req.body.id
      }
    }).then((results) => {
      console.log(results);
      send = { "results" : "Completed" };
    }).catch((error) => {
      send = { "results" : "${error}" };
    });
  } else {
    send = {"results" : "Rooms do not not exists."};
  }
  res.send(send);
});

////\/CONTROL AND TEMP UNITS\//////////////////////////////////////////////////
router.post('/unitinstructions', async (req, res, next) => {
  const dbUpdate = (ob) => {
    Units.update(ob,
      {
        where: {
          id: parseInt(req.body.unitId)
        }
      }).then((results) => {
        console.log(results);
        res.send({ "results" : "Completed" });
      }).catch((error) => {
        console.log(error);
        res.send({ "results" : "Error ${error}" });
      })
  }
  switch (req.body.doWhat) {
    case "changeTemp":
      dbUpdate({ "desiredTemp": parseInt(req.body.roomIdorTemp) });

      break;
    case "setControlRoom":
      dbUpdate({ "controlRoomId": parseInt(req.body.roomIdorTemp) });
      break;
    default:
      res.send({ "results" : "Error" });
  }

});
router.put('/unitinstructions', async (req, res, next) => {
  if (parseInt(req.body.token) === parseInt(999999999)) {
    let controlRoomId;
    let desiredTemp;
    let unitLocationId;
    let roomLocationId;
    let currentRoomTemp;
    let timePassedToSrv;
    await Units.findOne({
      where:
      {
        id: req.body.unitId,
      }
    }).then((results) => {
      controlRoomId = results.controlRoomId;
      desiredTemp = results.desiredTemp;
      unitLocationId = results.locationId;
    }).catch((error) => {
      sendBack = { "results": `${error}` };
    });
    if (controlRoomId !== null) {///NEEDS TO BE TEST BY ASSIGN A UNIT WITHOUT A CONTROL ROOM
      await Rooms.findOne({
        where:
        {
          id: controlRoomId
        }
      }).then((results) => {
        roomLocationId = results.locationId;
        currentRoomTemp = results.currentTemp;
        timePassedToSrv = results.timePassedToSrv;
      }).catch((error) => {
        sendBack = { "results": `${error}` };
      });
    }
    const cdate = new Date();
    if (parseInt(roomLocationId) === parseInt(unitLocationId) && parseInt(currentRoomTemp) < parseInt(desiredTemp) &&
      (parseInt(cdate.getTime()) - parseInt(timePassedToSrv)) < 300000) {
      sendBack = { "results": 1 };
    } else if (parseInt(roomLocationId) === parseInt(unitLocationId) && parseInt(currentRoomTemp) >= parseInt(desiredTemp)) {
      sendBack = { "results": 0 };
    } else if (parseInt(roomLocationId) !== parseInt(unitLocationId)) {
      sendBack = { "results": "Error, Locations do not match." };
    } else if (parseInt(cdate.getTime()) - parseInt(timePassedToSrv) > 300000) {
      sendBack = { "results": "Too much time inbetween updates." };///GO INTO AN ERROR LOG
    } else {
      sendBack = { "results": "Error." };
    }
    console.log(JSON.stringify(sendBack));
    res.send(JSON.stringify(sendBack));
  } else {
    console.log("bad token")
    res.send({ "results": "Bad Token" });///GO INTO AN ERROR LOG
  }
});
router.put('/updatetemp', async (req, res, next) => {
  if (req.body.token === "999999999") {
    const cdate = new Date();

    await Rooms.update({ currentTemp: parseInt(req.body.currentTemp), timePassedToSrv: `${cdate.getTime()}` },
      {
        where: {
          id: req.body.id,
        }
      }).then((results) => {
        console.log(`${req.body.id} ${req.body.currentTemp} ${req.body.token} ${req.body.timePassedToSrv} ${results}`);
        res.send({ "results" : "${results}" });
        ///LOG TO DB LOG
      }).catch((error) => {
        console.log(error);
        res.send({ "results" : "done" });
      })
  } else {
    res.send({ "results" : "Bad Token" });
  }
});


module.exports = router;
