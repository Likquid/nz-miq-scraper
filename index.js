const Express = require('express');
const app = Express();
require('dotenv').config()
const { getMiqStatus } = require('./src/getMiqStatus');
const { channelBlast } = require('./src/channelBlast');

const basicAuth = require('express-basic-auth');
const basicAuthOptions = {
    challenge: true,
    users: {}
};
basicAuthOptions.users[`${process.env.AUTH_USERNAME}`] = process.env.AUTH_PASSWORD;
const basicAuthChallenge = basicAuth(basicAuthOptions);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 8080));

app.post('/miqstatus', async (req, res) => getMiqStatus(req, res));

app.get('/channelblast', basicAuthChallenge, async (req, res) => channelBlast(req, res));

app.get('/', (req, res) => res.send('Running'));

app.listen(app.get('port'), () => {
    console.log('Express is running on port', app.get('port'));
});