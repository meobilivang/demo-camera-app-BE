const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require("cors");
const port = process.env.PORT || 1609;
const sql = require("./db/db");

const routes = require('./routes/routes');

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);

//app.use(expressValidator())


app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});