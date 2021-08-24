const Express = require('express');
const app = Express();
const { contentFetcher } = require('./src/info');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 8080));

app.get('/info', async (req, res) => contentFetcher(req, res));

app.get('/', (req, res) => res.send('Running'));

app.listen(app.get('port'), () => {
    console.log('Express is running on port', app.get('port'));
});