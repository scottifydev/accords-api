import serverless from 'serverless-http';
import bodyParser from 'body-parser';
import express from 'express';
import rp from 'request-promise';
import uuid from 'uuid';
import cors from 'cors'
import AWS from 'aws-sdk';
import * as dynamoDbLib from "./libs/dynamodb-lib";
import * as create from './create'
import * as list from './list'
import * as get from './get'
import * as update from './update'
import * as deleteItem from "./delete"
// const ses = new AWS.SES({
  //   region: 'us-east-1'
  // });
const app = express();
const dynamoDb = new AWS.DynamoDB.DocumentClient();


app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())



const logRequest = (req, res, next) => {
  console.log(req)
  next()
}

app.get('/get/:type', list.list)
app.put('/proposal/ratify/:userId/:proposalId/:currentUser', update.getNewProtocolNum, update.post)
app.get('/proposal/:userId/:proposalId', logRequest, get.getProtocol)
app.put('/proposal/:userId/:proposalId', logRequest, update.post)
app.put('/proposal/amend/:userId/:proposalId/:currentUser', logRequest, update.post)
app.get('/protocol/:id', get.getProtocol)
app.delete('/protocol/:userId/:proposalId', deleteItem.deleteProposal)
app.post('/submit-proposal/',  create.post)
// app.post('/get', parseSubmission, query)

module.exports.handler = serverless(app);