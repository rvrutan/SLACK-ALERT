const axios = require("axios");

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const handler = async (event) => {
  try {
    // Iterate over each record (message) in the SNS event
    for (const record of event.Records) {
      const snsMessage = record.Sns.Message;

      const slackPayload = {
        text: `${snsMessage}`,
      };

      await axios.post(SLACK_WEBHOOK_URL, slackPayload);

      console.log(`Message "${snsMessage}" successfully posted to Slack.`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Messages successfully posted to Slack",
      }),
    };
  } catch (error) {
    console.error("Error posting messages to Slack:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to post messages to Slack" }),
    };
  }
};

module.exports = { handler };
