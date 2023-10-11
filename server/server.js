const express = require("express");
const dao = require("./dao.js");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


function queryDAO(operation, req, res) {
    dao.call(operation, req.params, (result) => {
      if (result.body && result.status != 404) {
        console.log(result.body);
        res.send(result.body);
      } else {
        res.sendStatus(404);
        res.end;
      }
    });
  }


app.post('/login', (req, res) => {
    queryDAO('authenticate', req, res);
});

app.get("/users/:user/entries", (req, res) => {
    queryDAO('get_entries', req, res);
});

app.get("/users/:user", (req, res) => {
    queryDAO('get_reports', req, res);
});

app.get("/users/:user/direct_reports", (req, res) => {
    queryDAO('get_reports', req, res);
});

app.post("/:sender/:recipient/:body", (req, res) => {
    queryDAO('post_entry', req, res);
});

const port = 3000;
console.log("server starting on port " + port);
app.listen(port);




/*
const express = require('express');
const dao = require('./dao.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

function queryDAO(operation, req, res) {
    dao.call(operation, req.params, (result) => {
        if (result.body && result.status != 404) {
            console.log(result.body);
            res.send(result.body);
        } else {
            res.sendStatus(404);
            res.end;
        };
    });
}

app.get("/authenticate/:user/:pass", (req, res) => {
    queryDAO('check_user', req, res);
});

app.get("/:user/entries", (req, res) => {
    queryDAO('get_entries', req, res);
});

app.get("/:user/direct_reports", (req, res) => {
    queryDAO('get_reports', req, res);
});

app.post("/:sender/:recipient/:body", (req, res) => {
    queryDAO('post_entry', req, res);
});


const port = 3000;
console.log('server starting on port ' + port);
app.listen(port);
*/
