# ru

ru is a bot library that can be required and integrated with a BBC Slack channel.  ru is able to respond to direct Slack messages and Slack slash commands 

# Installation

Using webhooks within Slack is the easiest way to POST a message to a channel.  You will need a Slack webhook URL and channel name in order to use this library. Use the following URL to get it setup prior to using ru. 

    Slack webhook setup: https://api.slack.com/incoming-webhooks

ru also requires access to a public URL, which as an example could be an AWS API Gateway endpoint, backed by a Lambda.  As of writing ru AWS Gateway API with a supporting Lambda function is the preferred infrastructure setup. 
    
# Examples

In order for ru to run correctly environment variables need to be supplied and it is HIGHLY recommended that no Slack token or bot OAuth token is saved to any config file.  Where possible use Lambda process.env[] to host these secret keys. 

DESCRIBE INSTALL and SETUP of ru and EXAMPLE code (including how to build to zip)

# Dependencies

ru depends on the following:

    - epigrams-on-programming: required to push a message of the day to the Slack channel.
    Use the git repo: git@github.com:KScriven/epigrams-on-programming.git
    
    - SlackAPI: allows for native Slack channel integration
    Use the git repo:  git@github.com:slackapi/node-slack-sdk.git
    
    - AWS Gateway and API services for provisioning a public endpoing and hosting the codebase to respond to Slash commands
    Use the AWS API Gateway URL for chatops setup: https://aws.amazon.com/blogs/aws/new-slack-integration-blueprints-for-aws-lambda/
    
# Contributions

Contributions to ru are possible.  Please submit a pull request on Git. 