import uuid from "uuid";
import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();


export function post (req, res, callback) {
    const timestamp = new Date().getTime();
    const dynamoDBparams = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            userId: req.body.username,
            proposalId: uuid.v1(),
            ratified: "false",
            protocolNumber: 0,
            content: req.body.content,
            createdAt: new Date().getTime()
        }
    };

    dynamoDb.put(dynamoDBparams, (error) => {
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
        statusCode: 200,
        body: JSON.stringify(dynamoDBparams.Item),
    };
    res.send(response)
    res.end()

}
