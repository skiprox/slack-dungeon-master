const CREDENTIALS = require('./credentials.json');
const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));

class DungeonMaster {
    constructor() {
        this.listen();
    }
    listen() {
        app.get('/', (req, res) => {
            res.send('Nerd!!!!');
            console.log('New user');
        });
        app.listen(app.get('port'), () => {
            console.log(`Listening on port ${app.get('port')}`)
        })
    }
}

new DungeonMaster();
