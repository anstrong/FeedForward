const express = require("express");
const dao = require("./dao.js");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


function queryDAO(operation, req, res) {
    dao.call(operation, req, (result) => {
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
    console.log("We found Post Login")
    queryDAO('authenticate', req, res);
});

app.get("/users/:username/entries", (req, res) => {
    queryDAO('get_entries', req, res);
});

app.get("/users/:username", (req, res) => {
    queryDAO('get_user', req, res);
});

app.get("/users/:username/direct_reports", (req, res) => {
    queryDAO('get_reports', req, res);
});

app.post("/send", (req, res) => {
    queryDAO('post_entry', req, res);
});


const port = 3000;
console.log("server starting on port " + port);
app.listen(port);
