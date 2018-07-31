'use strict';

const fs = require('fs'),
	path = require('path');

const mockBase = path.join(__dirname, 'testjson');

const mockApi = (res, pathname, praamObj, next) => {
	switch (pathname) {
		case '/user/vote': 
			let data = fs.readFileSync(path.join(mockBase, 'test.json'), 'utf-8');

			res.setHeader('Content-type', 'application/javascript');
			res.end(praamObj.callback + '(' + data + ')');
			return;
	}
	next();
};

module.exports = mockApi;