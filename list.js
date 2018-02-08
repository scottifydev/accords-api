import * as dynamoDbLib from "./libs/dynamodb-lib";
import {
    success,
    failure
} from "./libs/response-lib";
import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();
var protocolsObj = {}

export function getProtocolsParams(req, res, next) {
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

export function getCommentsParams(req, res, next) {
    res.locals.dynamoDBparams = {
        TableName: process.env.COMMENTS_TABLE,
        KeyConditionExpression: "protocolNumber = :protocolNumber",
        ExpressionAttributeValues: {
            ':protocolNumber': Number.parseInt(req.params.id)
        },
        ScanIndexForward: true
    };
    next();
}

export function getProposalsParams(req, res, next) {
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

export function getDossiersParams(req, res, next) {
    res.locals.dynamoDBparams = {
        TableName: process.env.DOSSIERS_TABLE,
        ProjectionExpression: "subject",
        ScanIndexForward: true

    };
    next();
}


export function query(req, res, callback) {
    let dynamoDBparams = res.locals.dynamoDBparams;
    dynamoDb.query(dynamoDBparams, (err, data) => {
        // handle potential errors
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            res.status(400).send("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function (item) {
                console.log(item);
            });
            // console.log(data)
            res.json(data)
        }
        res.end()
    });
}

export function scan(req, res, callback) {
    let dynamoDBparams = res.locals.dynamoDBparams;
    dynamoDb.scan(dynamoDBparams, (err, data) => {
        // handle potential errors
        if (err) {
            console.error("Unable to scan. Error:", JSON.stringify(err, null, 2));
            res.status(400).send("Unable to scan. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("scan succeeded.");
            data.Items.forEach(function (item) {
                console.log(item);
            });
            // console.log(data)
            res.json(data)
        }
        res.end()
    });
}