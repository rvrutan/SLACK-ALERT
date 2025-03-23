const { sendResponse, sendMessageToSNS } = require("./utils");

//event in args is going to be the POST request sent from thunder
const handler = async (event) => {
    //grab the body from the post
    const body = JSON.parse(event.body);

    try {
        //sendMessageToSNS takes 2 args, the message (body.message) and the topic identifier
        await sendMessageToSNS(body.message, "arn:aws:sns:us-east-1:440744241803:BOOTCAMP_TOPIC");
        //we'll exit the try block on error, but if we don't we assume success and execute this message
        return sendResponse(200, { success: true, message: "Message posted" });
    } catch (error) {
        return sendResponse(500, { error: error.message });
    }
};


module.exports = { handler }

