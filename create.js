import uuid from "uuid";
import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();


export function getPostParams (req, res, next) {
    res.locals.dynamoDBparams = {
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
    next();
}

export function getCommentParams(req, res, next) {
    res.locals.dynamoDBparams = {
        TableName: process.env.COMMENTS_TABLE,
        Item: {
            protocolNumber: Number.parseInt(req.params.id),
            commentDate: new Date().getTime(),
            userId: req.params.userId,
            commentId: uuid.v1(),
            content: req.body.content
        }
    };
    next();
}




export function post(req, res, callback) {
    console.log(res.locals)
    let dynamoDBparams = res.locals.dynamoDBparams
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
