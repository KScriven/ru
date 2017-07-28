# ru

ruBot is a bot library that can be required and to communicate with a BBC Slack channel named #academyimporter.  ru responds to direct Slack messages and posts an epigram to the Slack channel once per day.  

# Installation

Using webhooks within Slack is the easiest way to POST a message to a channel.  You will need a Slack webhook URL and channel name in order to use this library. Use the following URL to get it setup prior to using ru. 

    Slack webhook setup: https://api.slack.com/incoming-webhooks
    
# Examples

In order for ru to run correctly two environment variables need to be supplied on the command line.

E.g.:
    SLACK_WEBHOOK_URL=(insert webhook uri here) SLACK_CHANNEL=(# insert channel name) node index.js 
    
    Or using the slack native webclient use the API bot token e.g.:  SLACK_API_TOKEN=(API bot token) node index.js

# Dependencies

ru depends on the following:

    - epigrams-on-programming: required to push a message of the day to the Slack channel.
    Use the git repo: git@github.com:KScriven/epigrams-on-programming.git
    
    - SlackAPI: allows for native Slack channel integration
    Use the git repo:  git@github.com:slackapi/node-slack-sdk.git
    
# Contributions

Contributions to ru are possible.  Please submit a pull request on Git. 