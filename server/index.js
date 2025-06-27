const express = require('express');
const logsRoute = require('./routes/logs');
const app = express();

app.use(express.json());
app.use(logsRoute);

app.listen(3001, () => {
  console.log('API listening on http://localhost:3001');
});
