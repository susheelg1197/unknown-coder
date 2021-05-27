const bodyParser = require('body-parser');
const cors = require('cors');
const exec = require('child_process').execSync;
const express = require('express');
const fs = require('fs');
const path = require('path');

const CODE_FOLDER = "code";

function testCode(req, res) {
  let code = req.body["code"];

  try {
    fs.writeFileSync(path.join(__dirname, CODE_FOLDER, "abcd.go"), code);
    const proc = exec("go run " + path.join(CODE_FOLDER, "abcd.go"));
    const results = proc.toString();

    return res.send(results);
  } catch (error) {
    console.log("An error occurred");
    console.log(error);

    return res.send("An error occurred.");
  }
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/test/', testCode);

app.listen(process.env.PORT || 3030, () =>
  console.log(`Listening on port 5000.`),
);