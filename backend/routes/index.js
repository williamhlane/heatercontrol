var express = require('express');
var router = express.Router();
let models = require('../lib/models');
let Rooms = models.Rooms;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.put('/updatetemp', (req, res, next ) => {
  //TODO FOR NEXT VIDEO
  //put the NEW index.mjs on the bedroom machine.
  //Convert to float or convert incoming to a int.
  //req.body.room
  // req.body.temp
  // req.body.token
});

module.exports = router;
