'use strict';

var _ = require('lodash');

// Get list of profileDatas
exports.index = function(req, res) {
  res.json({
  	name:'test-user',
	testHistory: {
		currentTest: [{
			companyName: 'DexterTalentLabs'
		}],
		pastTest: {},
		futureTest: {}
	}
  });
};