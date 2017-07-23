'use strict';

let eps = require('epigrams-on-programming');
let incomingWebhook = require('@slack/client').IncomingWebhook

const url = process.env.SLACK_WEBHOOK_URL || '';
const slackChannel = process.env.SLACK_CHANNEL || '';

const webhook = new incomingWebhook(url);
const epigramsOfTheDay = (eps[Math.floor(Math.random()*eps.length)]);
      
webhook.send(epigramsOfTheDay, function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent:', res);
    }
});
