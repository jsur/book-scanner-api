const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const apiRouter = require('./routes');

const port = 3000;

app.use(bodyParser.json({ limit: '20mb', extended: true }));

app.use('/', apiRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));