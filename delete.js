import uuid from "uuid";
import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();


export function deleteProposal(req, res, callback) {
    let dynamoDBparams = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            'userId': req.params.userId,
            'proposalId': req.params.proposalId
        }
    };
    
    dynamoDb.delete(dynamoDBparams, (error) => {
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
