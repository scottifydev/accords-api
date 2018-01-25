import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();
export function getProtocol(req, res, callback) {
    let params = {}
    console.log(req.url.split('/', 2)[1])
    console.log(`'userId': ${req.params.userId},
                'proposalId': ${req.params.proposalId}`)
    console.log(typeof (req.params.userId))
    if (req.url.split('/', 2)[1] == "proposal" ){
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
                ':protocolNumber': Number.parseInt(req.params.id)
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
            res.json(data)
        }
        res.end()
    });

}