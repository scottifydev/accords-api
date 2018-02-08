(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/number/parse-int");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.call = call;

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_awsSdk2.default.config.update({ region: "us-east-1" });

function call(action, params) {
    var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

    return dynamoDb[action](params).promise();
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _serverlessHttp = __webpack_require__(6);

var _serverlessHttp2 = _interopRequireDefault(_serverlessHttp);

var _bodyParser = __webpack_require__(7);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = __webpack_require__(8);

var _express2 = _interopRequireDefault(_express);

var _requestPromise = __webpack_require__(9);

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _uuid = __webpack_require__(2);

var _uuid2 = _interopRequireDefault(_uuid);

var _cors = __webpack_require__(10);

var _cors2 = _interopRequireDefault(_cors);

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _dynamodbLib = __webpack_require__(4);

var dynamoDbLib = _interopRequireWildcard(_dynamodbLib);

var _create = __webpack_require__(11);

var create = _interopRequireWildcard(_create);

var _list = __webpack_require__(12);

var list = _interopRequireWildcard(_list);

var _get = __webpack_require__(14);

var get = _interopRequireWildcard(_get);

var _update = __webpack_require__(16);

var update = _interopRequireWildcard(_update);

var _delete = __webpack_require__(17);

var deleteItem = _interopRequireWildcard(_delete);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const ses = new AWS.SES({
//   region: 'us-east-1'
// });
var app = (0, _express2.default)();
var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

app.use(_bodyParser2.default.json());
app.use((0, _cors2.default)());
app.options('*', (0, _cors2.default)());

var test = function test(req, res) {
  console.log(req);
  res.status(200).send('works');
  res.end();
};

var logRequest = function logRequest(req, res, next) {
  console.log(req);
  next();
};

app.get('/proposals/', list.getProposalsParams, list.query);
app.get('/protocols/', list.getProtocolsParams, list.query);
app.get('/dossiers/', list.getDossiersParams, list.scan);
app.post('/proposal/submit/', create.getPostParams, create.post);
app.put('/proposal/ratify/:userId/:proposalId/:currentUser', update.getNewProtocolNum, update.post);
app.get('/proposal/:userId/:proposalId', logRequest, get.getProtocol);
app.put('/proposal/:userId/:proposalId', logRequest, update.post);
app.put('/proposal/amend/:userId/:proposalId/:currentUser', logRequest, update.post);
app.get('/protocol/:id', get.getProtocol);
app.get('/protocol/comments/:id', list.getCommentsParams, list.query);
app.post('/protocol/:id/comment/:userId', logRequest, create.getCommentParams, create.post);
app.delete('/protocol/:userId/:proposalId', deleteItem.deleteProposal);
// app.post('/get', parseSubmission, query)

module.exports.handler = (0, _serverlessHttp2.default)(app);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("serverless-http");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _parseInt = __webpack_require__(3);

var _parseInt2 = _interopRequireDefault(_parseInt);

exports.getPostParams = getPostParams;
exports.getCommentParams = getCommentParams;
exports.post = post;

var _uuid = __webpack_require__(2);

var _uuid2 = _interopRequireDefault(_uuid);

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

function getPostParams(req, res, next) {
    res.locals.dynamoDBparams = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            userId: req.body.username,
            proposalId: _uuid2.default.v1(),
            ratified: "false",
            protocolNumber: 0,
            content: req.body.content,
            createdAt: new Date().getTime()
        }
    };
    next();
}

function getCommentParams(req, res, next) {
    res.locals.dynamoDBparams = {
        TableName: process.env.COMMENTS_TABLE,
        Item: {
            protocolNumber: (0, _parseInt2.default)(req.params.id),
            commentDate: new Date().getTime(),
            userId: req.params.userId,
            commentId: _uuid2.default.v1(),
            content: req.body.content
        }
    };
    next();
}

function post(req, res, callback) {
    console.log(res.locals);
    var dynamoDBparams = res.locals.dynamoDBparams;
    dynamoDb.put(dynamoDBparams, function (error) {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t create the db item.'
            });
            return;
        }
        // create a response
        callback(null, response);
    });
    var response = {
        statusCode: 200,
        body: (0, _stringify2.default)(dynamoDBparams.Item)
    };
    res.send(response);
    res.end();
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _parseInt = __webpack_require__(3);

var _parseInt2 = _interopRequireDefault(_parseInt);

exports.getProtocolsParams = getProtocolsParams;
exports.getCommentsParams = getCommentsParams;
exports.getProposalsParams = getProposalsParams;
exports.getDossiersParams = getDossiersParams;
exports.query = query;
exports.scan = scan;

var _dynamodbLib = __webpack_require__(4);

var dynamoDbLib = _interopRequireWildcard(_dynamodbLib);

var _responseLib = __webpack_require__(13);

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();
var protocolsObj = {};

function getProtocolsParams(req, res, next) {
    res.locals.dynamoDBparams = {
        TableName: process.env.DYNAMODB_TABLE,
        IndexName: 'protocol-index',
        KeyConditionExpression: "#key = :ratified",
        ExpressionAttributeNames: {
            "#key": "ratified"
        },
        ExpressionAttributeValues: {
            ':ratified': "true"
        },
        ScanIndexForward: true
    };
    next();
}

function getCommentsParams(req, res, next) {
    res.locals.dynamoDBparams = {
        TableName: process.env.COMMENTS_TABLE,
        KeyConditionExpression: "protocolNumber = :protocolNumber",
        ExpressionAttributeValues: {
            ':protocolNumber': (0, _parseInt2.default)(req.params.id)
        },
        ScanIndexForward: true
    };
    next();
}

function getProposalsParams(req, res, next) {
    res.locals.dynamoDBparams = {
        TableName: process.env.DYNAMODB_TABLE,
        IndexName: 'protocol-index',
        KeyConditionExpression: "#key = :ratified",
        ExpressionAttributeNames: {
            "#key": "ratified"
        },
        ExpressionAttributeValues: {
            ':ratified': "false"
        },
        ScanIndexForward: true

    };
    next();
}

function getDossiersParams(req, res, next) {
    res.locals.dynamoDBparams = {
        TableName: process.env.DOSSIERS_TABLE,
        ProjectionExpression: "subject",
        ScanIndexForward: true

    };
    next();
}

function query(req, res, callback) {
    var dynamoDBparams = res.locals.dynamoDBparams;
    dynamoDb.query(dynamoDBparams, function (err, data) {
        // handle potential errors
        if (err) {
            console.error("Unable to query. Error:", (0, _stringify2.default)(err, null, 2));
            res.status(400).send("Unable to query. Error:", (0, _stringify2.default)(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function (item) {
                console.log(item);
            });
            // console.log(data)
            res.json(data);
        }
        res.end();
    });
}

function scan(req, res, callback) {
    var dynamoDBparams = res.locals.dynamoDBparams;
    dynamoDb.scan(dynamoDBparams, function (err, data) {
        // handle potential errors
        if (err) {
            console.error("Unable to scan. Error:", (0, _stringify2.default)(err, null, 2));
            res.status(400).send("Unable to scan. Error:", (0, _stringify2.default)(err, null, 2));
        } else {
            console.log("scan succeeded.");
            data.Items.forEach(function (item) {
                console.log(item);
            });
            // console.log(data)
            res.json(data);
        }
        res.end();
    });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

exports.success = success;
exports.failure = failure;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(body) {
  return buildResponse(200, body);
}

function failure(body) {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: (0, _stringify2.default)(body)
  };
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

var _parseInt = __webpack_require__(3);

var _parseInt2 = _interopRequireDefault(_parseInt);

var _typeof2 = __webpack_require__(15);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getProtocol = getProtocol;

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();
function getProtocol(req, res, callback) {
    var params = {};
    console.log(req.url.split('/', 2)[1]);
    console.log('\'userId\': ' + req.params.userId + ',\n                \'proposalId\': ' + req.params.proposalId);
    console.log((0, _typeof3.default)(req.params.userId));
    if (req.url.split('/', 2)[1] == "proposal") {
        params.dynamoDBparams = {
            TableName: process.env.DYNAMODB_TABLE,
            KeyConditionExpression: "userId = :userId AND proposalId = :proposalId",
            ExpressionAttributeValues: {
                ':userId': req.params.userId,
                ':proposalId': req.params.proposalId
            }

        };
    }

    if (req.url.split('/', 2)[1] == "protocol") {
        params.dynamoDBparams = {
            TableName: process.env.DYNAMODB_TABLE,
            IndexName: 'protocol-index',
            KeyConditionExpression: "ratified = :ratified AND protocolNumber = :protocolNumber",
            ExpressionAttributeValues: {
                ':ratified': "true",
                ':protocolNumber': (0, _parseInt2.default)(req.params.id)
            }

        };
    }

    dynamoDb.query(params.dynamoDBparams, function (err, data) {
        // handle potential errors
        if (err) {
            console.error("Unable to query. Error:", (0, _stringify2.default)(err, null, 2));
            res.status(400).send("Unable to query. Error:", (0, _stringify2.default)(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function (item) {
                console.log(item);
            });
            res.json(data);
        }
        res.end();
    });
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

exports.getNewProtocolNum = getNewProtocolNum;
exports.post = post;

var _uuid = __webpack_require__(2);

var _uuid2 = _interopRequireDefault(_uuid);

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

function getNewProtocolNum(req, res, next) {
    var params = {};
    params.dynamoDBparams = {
        TableName: process.env.DYNAMODB_TABLE,
        IndexName: 'protocol-index',
        KeyConditionExpression: "#key = :ratified",
        ExpressionAttributeNames: {
            "#key": "ratified"
        },
        ExpressionAttributeValues: {
            ':ratified': "true"
        },
        ScanIndexForward: false

    };
    console.log(params.dynamoDBparams);
    dynamoDb.query(params.dynamoDBparams, function (err, data) {
        // handle potential errors
        if (err) {
            console.error("Unable to query. Error:", (0, _stringify2.default)(err, null, 2));
            res.status(400).send("Unable to query. Error:", (0, _stringify2.default)(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log(data);
            if (data.Items.length == 0) {
                res.locals.highNumber = 0;
            } else {
                res.locals.highNumber = data.Items[0].protocolNumber;
            }
            console.log(res.locals);
        }
        next();
    });
}

function post(req, res, callback) {
    var params = {};
    console.log(req.url.split('/', 3)[2] == "ratify");
    console.log(res.locals.highNumber);
    if (req.url.split('/', 3)[2] == "ratify") {
        console.log('asldmalskdmalksmdlkamsd');
        var now = new Date().getTime();
        params.dynamoDBparams = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                'userId': req.params.userId,
                'proposalId': req.params.proposalId
            },
            UpdateExpression: "ADD ratifiedDate :ratifiedDate, protocolNumber :protocolNumber, reviewDate :reviewDate SET content = :content, ratified = :ratified, ratifiedBy = :ratifiedBy",
            ExpressionAttributeValues: {
                ':ratifiedDate': now,
                ':reviewDate': now + 12096e5,
                ':ratifiedBy': req.params.currentUser,
                ':content': req.body.content,
                ':ratified': "true",
                ':protocolNumber': res.locals.highNumber + 1
            }
        };
    } else if (req.url.split('/', 3)[2] == "amend") {
        params.dynamoDBparams = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                'userId': req.params.userId,
                'proposalId': req.params.proposalId
            },
            UpdateExpression: "SET content = :content, amendedBy = :amendedBy, amendedDate = :amendedDate",
            ExpressionAttributeValues: {
                ':amendedDate': new Date().getTime(),
                ':amendedBy': req.params.currentUser,
                ':content': req.body.content

            }
        };
    } else {
        params.dynamoDBparams = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                'userId': req.params.userId,
                'proposalId': req.params.proposalId
            },
            UpdateExpression: "SET content = :content",
            ExpressionAttributeValues: {
                ':content': req.body.content

            }
        };
    }
    console.log(params.dynamoDBparams);
    dynamoDb.update(params.dynamoDBparams, function (error) {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t create the db item.'
            });
            return;
        }
        // create a response
        callback(null, response);
    });
    var response = {
        statusCode: 400,
        body: (0, _stringify2.default)(params.dynamoDBparams.Item)
    };
    res.send(response);
    res.end();
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(1);

var _stringify2 = _interopRequireDefault(_stringify);

exports.deleteProposal = deleteProposal;

var _uuid = __webpack_require__(2);

var _uuid2 = _interopRequireDefault(_uuid);

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamoDb = new _awsSdk2.default.DynamoDB.DocumentClient();

function deleteProposal(req, res, callback) {
    var dynamoDBparams = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            'userId': req.params.userId,
            'proposalId': req.params.proposalId
        }
    };

    dynamoDb.delete(dynamoDBparams, function (error) {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t create the db item.'
            });
            return;
        }
        // create a response
        callback(null, response);
    });
    var response = {
        statusCode: 200,
        body: (0, _stringify2.default)(dynamoDBparams.Item)
    };
    res.send(response);
    res.end();
}

/***/ })
/******/ ])));