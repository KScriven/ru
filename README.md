# ru :bowtie:

ru is a bot library that can be required and integrated and used within a BBC Slack channel.  ru is able to respond to direct Slack messages, channel actions and configured Slash commands. 

# Installation

Using webhooks within Slack is the easiest way to POST a message to a channel.  You will need a Slack webhook URL configuration.  Use the following URL to get Slack WebHooks configured.

    Slack webhook setup: https://api.slack.com/incoming-webhooks

ru will require access to a public URL, as an example AWS API Gateway endpoint. This public endpoint allows access to a Lambda function, which will in turn run the necessary code.  These setup instructions work with AWS Gateway and Lambda configurations.
    
# Examples

In order for ru to run correctly environment variables need to be supplied and it is HIGHLY recommended that no Slack token or bot OAuth token is saved to any config file.  Where possible use Lambda process.env[] to host these secret keys. 

The folder /src has been created to host the configuration file for the Lambda code. 


## Packaging for Distribution

Use the `npm run-scripts` feature to create a deployment package suitable for uploading to AWS.

In order to build the zip file to upload to AWS us the following details:

```
FUNC=webhook STAGE=prod npm run package
```

* Valid `FUNC` names refer to the file basename of a lambda file in the root of the `src/` folder.
* Valid `STAGE` names are: "prod".
* The distribution package (zip) will appear in the `dist/` folder.



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