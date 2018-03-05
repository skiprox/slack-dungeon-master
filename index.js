const CREDENTIALS = require('./credentials.json');
const express = require('express');
const app = express();
const Bot = require('slackbots');
app.use(express.json());
app.set('port', (process.env.PORT || 5000));

class DungeonMaster {
    constructor() {
        this.bot = null;
        this.setup();
        this.listen();
    }
    setup() {
        this.bot = new Bot({
            token: CREDENTIALS.botToken,
            name: "dungeon_master"
        });
    }
    listen() {
        app.get('/', (req, res) => {
            console.log('we got a get request');
            res.send(req.query["challenge"] || 'hello world');
        });
        app.post('/events', (req, res) => {
            console.log('we got a post request', req.body);
            if (req.body.token === CREDENTIALS.verificationToken) {
                if (req.body.event.text.indexOf('!dice') !== -1) {
                    this.bot.postMessageToChannel('bot-test', Math.floor(Math.random() * 21));
                }
            }
            //res.send(req.body.challenge || 'hello world');
            // const text = req.body.event.text;
            // if (text.indexOf('!dice') !== -1) {
            //     res.send(Math.floor(Math.random() * 21));
            // }
        });
        app.listen(app.get('port'), () => {
            console.log(`Listening on port ${app.get('port')}`)
        })
    }
}

new DungeonMaster();
