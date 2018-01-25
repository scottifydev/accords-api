import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";
import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();
var protocolsObj = {}

export function list (req, res, callback) {
    let params = {}
    console.log(req.params.type === "protocols")
    if (req.params.type === "protocols") {
        params.dynamoDBparams = {
            TableName: process.env.DYNAMODB_TABLE,
            IndexName: 'protocol-index',
            KeyConditionExpression: "#key = :ratified",
            ExpressionAttributeNames: {
                "#key": "ratified"
            },
            ExpressionAttributeValues: {
                ':ratified': "true"
            }
    
        };
    } if (req.params.type === "proposals") {
        params.dynamoDBparams = {
            TableName: process.env.DYNAMODB_TABLE,
            IndexName: 'protocol-index',
            KeyConditionExpression: "#key = :ratified",
            ExpressionAttributeNames: {
                "#key": "ratified"
            },
            ExpressionAttributeValues: {
                ':ratified': "false"
            }

        };
    } 

    dynamoDb.query(params.dynamoDBparams, (err, data) => {
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

