const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;

app.get('/', (req, res) => {
  res.send("HOME PAGE");
})

app.listen(PORT, () => {
  `Servel Listening on PORT: ${PORT}`;
});