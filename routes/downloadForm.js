var express = require('express');
var exceljs = require('exceljs');
var fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	switch(req.body.case) {
		case 'valid_multi':
			console.log(req.body.case)
			res.send('download form router');
			break;
		case 'state_multi':
			break;
	}
});

module.exports = router;
