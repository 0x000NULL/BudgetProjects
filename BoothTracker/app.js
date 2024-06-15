const express = require('express');
const messages = require('./messages');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
  const MVA = req.body.MVA;
  const EMP_ID = req.body.EMP_ID;
  const date = new Date();
  const timestamp = date.toISOString();

  console.log(`MVA submitted: ${MVA}`);
  console.log(`EMP_ID submitted: ${EMP_ID}`);

  // CSV file path
  const csvFilePath = path.join(__dirname, 'submissions.csv');

  // CSV data format
  const csvData = `${timestamp},${MVA},${EMP_ID}\n`;

  // Check if the file exists
  if (!fs.existsSync(csvFilePath)) {
    // If not, write the headers first
    const headers = 'Timestamp,MVA,EMP_ID\n';
    fs.writeFileSync(csvFilePath, headers, 'utf8');
  }

  // Append the new data
  fs.appendFileSync(csvFilePath, csvData, 'utf8');

  // Redirect back to the index page
  res.redirect('/');
});

app.use((req, res) => {
  res.status(404).send(messages.notFound);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something Went Wrong!');
});
