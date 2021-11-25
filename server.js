const path = require('path'); //nodejs core module

const express = require('express');
const app = express();

// set public folder as static folder => we can access html files and frontend
app.use(express.static(path.join(__dirname, 'public'))); //after adding this browser will show index.html

const PORT = 8080 || process.env.PORT;

// app.get('/', (req, res) => {
//   res.send("HOME PAGE");
// })

app.listen(PORT, () => {
  `Servel Listening on PORT: ${PORT}`;
});