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

const test = (req, res) => {
  console.log(req)
  res.status(200).send('works')
  res.end()
}



const logRequest = (req, res, next) => {
  console.log(req)
  next()
}

app.get('/proposals/', list.getProposalsParams, list.query)
app.get('/protocols/', list.getProtocolsParams, list.query)
app.get('/dossiers/', list.getDossiersParams, list.scan)
app.post('/proposal/submit/', create.getPostParams, create.post)
app.put('/proposal/ratify/:userId/:proposalId/:currentUser', update.getNewProtocolNum, update.post)
app.get('/proposal/:userId/:proposalId', logRequest, get.getProtocol)
app.put('/proposal/:userId/:proposalId', logRequest, update.post)
app.put('/proposal/amend/:userId/:proposalId/:currentUser', logRequest, update.post)
app.get('/protocol/:id', get.getProtocol)
app.get('/protocol/comments/:id', list.getCommentsParams, list.query)
app.post('/protocol/:id/comment/:userId', logRequest, create.getCommentParams, create.post)
app.delete('/protocol/:userId/:proposalId', deleteItem.deleteProposal)
// app.post('/get', parseSubmission, query)

module.exports.handler = serverless(app);