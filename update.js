import uuid from "uuid";
import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function getNewProtocolNum(req, res, next) {
    let params = {}
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
    console.log(params.dynamoDBparams)
    dynamoDb.query(params.dynamoDBparams, (err, data) => {
        // handle potential errors
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            res.status(400).send("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            console.log(data)
            if ( data.Items.length == 0) {
                res.locals.highNumber = 0
            } else {
                res.locals.highNumber = data.Items[0].protocolNumber
            }
            console.log(res.locals)

        }
        next()
    });
}

export function post(req, res, callback) {
    let params = {}
    console.log(req.url.split('/', 3)[2] == "ratify")
    console.log(res.locals.highNumber)
    if (req.url.split('/', 3)[2] == "ratify") {
        console.log('asldmalskdmalksmdlkamsd')
        let now = new Date().getTime()
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
                ':protocolNumber': res.locals.highNumber+1
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
    }
    else {
        params.dynamoDBparams = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                'userId': req.params.userId,
                'proposalId': req.params.proposalId
            },
            UpdateExpression: "SET content = :content",
            ExpressionAttributeValues: {
                ':content': req.body.content,

            }
        };
    }
    console.log(params.dynamoDBparams)
    dynamoDb.update(params.dynamoDBparams, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Couldn\'t create the db item.',
            });
            return;
        }
        // create a response
        callback(null, response);
    });
    const response = {
        statusCode: 400,
        body: JSON.stringify(params.dynamoDBparams.Item),
    };
    res.send(response)
    res.end()

}