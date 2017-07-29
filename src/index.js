'use strict';

const AWS = require('aws-sdk');
const url = require('url');
const https = require('https');
const epigrams = require('epigrams-on-programming');
const stringDecoder = require('string_decoder').StringDecoder;

// The Slack channel to send a message to stored in the slackChannel environment variable
const slackChannel = process.env.slackChannel;
let hookUrl = process.env.hookUrl;


/**
 * @param {object} message
 * @param {string} message.text
 */
function postMessage(message, callback) {
    const body = JSON.stringify(message);
    const options = url.parse(hookUrl);
    options.method = 'POST';
    options.headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
    };

    const postReq = https.request(options, (res) => {
        let decoder = new stringDecoder('utf-8');
        let data = [ ];
        
        res.on('data', (chunk) => {
            data += decoder.write(chunk)
            });
        
        res.on('end', () => {
                if (callback) {
                callback ({
                    body: data += decoder.end(), 
                    statusCode: res.statusCode, 
                    statusMessage: res.statusMessage,
                
                    });
                }
            });
        
        return res;
        
    });
        
    postReq.write(body);
    postReq.end();
}

function processEvent(event, callback) {

    let epigramOfTheDay = epigrams[Math.floor(Math.random()*epigrams.length)];
    
    let slackMessage = {
        channel: slackChannel,
        text: epigramOfTheDay,
        username: 'ruBot'
    };

    postMessage(slackMessage, (response) => {
        if (response.statusCode < 400) {
            console.info('Message posted successfully');
            callback(null);
        } else if (response.statusCode < 500) {
            console.error(`Error posting message to Slack API: ${response.statusCode} - ${response.statusMessage}`);
            callback(null);  // Don't retry because the error is due to a problem with the request
        } else {
            // Let Lambda retry
            callback(`Server error when processing message: ${response.statusCode} - ${response.statusMessage}`);
        }
    });
}


exports.handler = (event, context, callback) => {
    if (hookUrl) {
        processEvent(event, callback);
    } else {
        callback('Hook URL has not been set.');
    }
};
