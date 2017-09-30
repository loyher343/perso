const express = require("express");
const bodyParser = require('body-parser');

const port = 3000;
const kyu ="```人◕‿‿◕人```"

const app = express();

app.listen(() => {
    console.log(`${kyu}`)
})