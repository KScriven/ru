'use strict';


const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const slackId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const slackToken = process.env.SLACK_VERIFICATION_TOKEN;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3333, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});


const httpstatus = {

  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  208: 'Already Reported',
  226: 'IM Used',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: 'Switch Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required',
  103: '[Unofficial] Checkpoint',
  420: '[Unofficial] Method Failure (Spring Framework), Enhance Your Calm (Twitter)',
  419: '[Unofficial] I\'m a fox (Smoothwall/Foxwall)',
  450: '[Unofficial] Blocked by Windows Parental Controls (Microsoft)',
  498: '[Unofficial] Invalid Token (Esri)',
  499: '[Unofficial] Token Required (Esri), Request has been forbidden by antivirus (wget), Client Closed Request (nginx)',
  509: '[Unofficial] Bandwidth Limit Exceeded (Apache Web Server/cPanel)',
  530: '[Unofficial] Site is frozen (Pantheon)',
  440: '[Unofficial] Login Timeout (Internet Information Services)',
  449: '[Unofficial] Retry With (Internet Information Services)',
  444: '[Unofficial] No Response (nginx)',
  495: '[Unofficial] SSL Certificate Error (nginx)',
  496: '[Unofficial] SSL Certificate Required (nginx)',
  497: '[Unofficial] HTTP Request Sent to HTTPS Port (nginx)',
  520: '[Unofficial] Unknown Error (CloudFlare)',
  521: '[Unofficial] Web Server Is Down (CloudFlare)',
  522: '[Unofficial] Connection Timed Out (CloudFlare)',
  523: '[Unofficial] Origin Is Unreachable (CloudFlare)',
  524: '[Unofficial] A Timeout Occurred (CloudFlare)',
  525: '[Unofficial] SSL Handshake Failed (CloudFlare)',
  526: '[Unofficial] Invalid SSL Certificate (CloudFlare)'
};

// Auth

app.get('/slack', function(req, res){
  if (!req.query.code) { // access denied
    res.redirect('http://www.girliemac.com/slack-httpstatuscats/');
    return;
  }
  var data = {form: {
      client_id: slackId,
      client_secret: clientSecret,
      code: req.query.code
  }};
  request.post('https://slack.com/api/oauth.access', data, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Get an auth token
      let token = JSON.parse(body).access_token;

      // Get the team domain name to redirect to the team URL after auth
      request.post('https://slack.com/api/team.info', {form: {token: token}}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          if(JSON.parse(body).error == 'missing_scope') {
            res.send('HTTP Status Cats has been added to your team!');
          } else {
            let team = JSON.parse(body).team.domain;
            res.redirect('http://' +team+ '.slack.com');
          }
        }
      });
    }
  })
});

/* *******************************
/* HTTP Status Cats Slash Command
/* ***************************** */

app.get('/', (req, res) => {
  handleQueries(req.query, res);
});

app.post('/', (req, res) => {
  handleQueries(req.body, res);
});

/*
response:
{ token: '2P429UX-------',
  team_id: 'T1L---',
  team_domain: 'girliemac',
  channel_id: 'C1L---',
  channel_name: 'general',
  user_id: 'U1L----',
  user_name: 'girlie_mac',
  command: '/httpstatus',
  text: '405',
  response_url: 'https://hooks.slack.com/commands/--- }
*/

function handleQueries(q, res) {
  if(q.token !== process.env.SLACK_VERIFICATION_TOKEN) {
    // the request is NOT coming from Slack!
    return;
  }
  if (q.text) {
    let code = q.text;

    if(! /^\d+$/.test(code)) { // not a digit
      res.send('U R DOIN IT WRONG. Enter a status code like 200 😒');
      return;
    }

    let status = httpstatus[code];
    if(!status) {
      res.send('Bummer, ' + code + ' is not an official HTTP status code 🙃');
      return;
    }

    let image = 'https://http.cat/' + code;
    let data = {
      response_type: 'in_channel', // public to the channel
      text: code + ': ' + status,
      attachments:[
      {
        image_url: image
      }
    ]};
    res.json(data);
  } else {
    let data = {
      response_type: 'ephemeral', // private message
      text: 'How to use /httpstatus command:',
      attachments:[
      {
        text: 'Type a status code after the command, e.g. `/httpstatus 404`',
      }
    ]};
    res.json(data);
  }
}


exports.handler = (event, context, callback) => {
    if (slackId) {
        handleQueries(event, callback);
    } else {
        callback('Error in Slack configuration');
    }
};