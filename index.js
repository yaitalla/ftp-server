const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const upload = require('express-fileupload');
const app = express();
const helmet = require('helmet');
const user = require('./routes/userRoute');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload());
app.use('/users', user);
app.use(express.static('./static'));
/*
app.get('/', (req, res) => {
  res.send('hello');
});
*/

app.listen(process.env.port || 4000, () => {
  console.log('Server listening on http://localhost:4000 or http://127.0.0.1:4000')
});