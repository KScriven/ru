'use strict';

var WebClient = require('@slack/client').WebClient;

var token = process.env.SLACK_API_TOKEN || ''; //see section above on sensitive data

var web = new WebClient(token);
web.chat.postMessage('#general', 'Hello there', function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent: ', res);
    }
});