const { SNS } = require("@aws-sdk/client-sns");

const sendResponse = (statusCode, result) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
  },
  body: JSON.stringify(result),
});

const sns = new SNS({
  region: "us-east-1",
});

const sendMessageToSNS = async (message, topicArn) => {
  const params = {
    Message: JSON.stringify(message),
    TopicArn: topicArn,
  };
  return await sns.publish(params);
};

module.exports = { sendResponse, sendMessageToSNS };
