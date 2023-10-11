const express = require("express");
const dao = require("./dao.js");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

function queryDAO(operation, req, res) {
    dao.call(operation, req, (result) => {
      if (result.body && result.status < 400) {
        res.send(result.body);
        res.sendStatus(result.status);
      } else {
        console.log(req.body)
        res.sendStatus(result.status);
        res.end;
      }
    });
  }


app.post('/login', (req, res) => {
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



const port = 8080;
console.log("server starting on port " + port);
app.listen(port);
