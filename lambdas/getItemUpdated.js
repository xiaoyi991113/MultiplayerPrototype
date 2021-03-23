// Random string generator
const randomBytes = require('crypto').randomBytes;

// Object for the function library that can access other AWS Services
const AWS = require('aws-sdk');

// Create a client that can talk to DyanmoDb
const ddb = new AWS.DynamoDB.DocumentClient();


exports.handler = (event, context, callback) => {
    
    let gameId = event['pathParameters']['gameid']
    console.log('Received event (', gameId, '): ', event);
    
    updateState(gameId, event.body).then(() => {
        // You can use the callback function to provide a return value from your Node.js
        // Lambda functions. The first parameter is used for failed invocations. The
        // second parameter specifies the result data of the invocation.

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        callback(null, {
            statusCode: 201,
            body: JSON.stringify("it worked!"),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error(err);

        // If there is an error during processing, catch it and return
        // from the Lambda function successfully. Specify a 500 HTTP status
        // code and provide an error message in the body. This will provide a
        // more meaningful error response to the end client.
        errorResponse(err.message, context.awsRequestId, callback)
    });
};

function updateState(gameId,board){
    return ddb.put({
        TableName: 'GameState',
         Item: {
            GameId: gameId,
            Board: board
        },
    }).promise();
  
}

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}
