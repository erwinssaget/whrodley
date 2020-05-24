# Twilio Hackathon App

[Motivation](https://dev.to/erwinssaget/placeholder-title-2d6g)

## About

This app was built to facilitate communication via sms when handling students via a remote classroom.

### How it works

An instructor signs up and chooses a phone number to represent their class. From there they can invite students to the class via text, and communicate back and forth.

## Features

- Docker workflow
- Node.js web server using [Express.js](https://npm.im/express)
- Basic web user interface using [Handlebars](https://npm.im/express-handlebars) for templating and Bootstrap for UI
- Unit tests using [`mocha`](https://npm.im/mocha) and [`chai`](https://npm.im/chai)
- Linting and formatting using [ESLint](https://npm.im/eslint) and [Prettier](https://npm.im/prettier)

## How to use it
1. Install Docker
2. Change env.example to .env and fill in variables
3. Run docker-compose up --build

## Set up

### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)
- A Pusher Account - [sign up with Github](https://dashboard.pusher.com/accounts/sign_up)
- Ngrok - to get messages in real time [download here](https://ngrok.com/download)
- Mailtrap - [sign up with Github](https://mailtrap.io/register/signup?ref=header)


### App .env Variables

| Config&nbsp;Value   | Description                                                                                                                                                  |
| :----------------  | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HOST               | The ngrok url that you get after running `ngrok http 3030` (use reg http, not https)|
| TWILIO_ACCOUNT_SID | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| TWILIO_AUTH_TOKEN  | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| PUSHER_APP_ID      | Your pusher app id|
| PUSHER_APP_KEY     | Your pusher app App key (this also needs to be added into the assets/pusher.js file) |
| PUSHER_APP_SECRET  | Your pusher app secret|
| PUSHER_CLUSTER     | The cluster your app region is in|
| MAIL_USER          | mailtrap user - shown in dashboard |
| MAIL_PASSWORD      | mailtrap password - also shown in dashboard |


### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone git@github.com:erwinssaget/whrodley.git
cd whrodley
```

2. Set your environment variables

```bash
cp .env.example .env
```
See above to locate the necessary environment variables.

3. Build and Run

```bash
docker-compose up --build
```

5. Navigate to your Ngrok host and view the application.

That's it!

### Tests

You can run the tests locally by typing:

```bash
npm test
```
Testing is not complete however...

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.

[twilio]: https://www.twilio.com
