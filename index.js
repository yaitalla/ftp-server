const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const upload = require('express-fileupload');
const app = express();
const helmet = require('helmet');
const api = require('./routes/api');
const checkToken = require('./controllers/authCtrl');
const cors = require('cors');

app.use(cors({"origin": "*"}));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload());
app.use('/api', checkToken, api);

app.use(express.static('../client'));

/*
const checkToken = () => (req, res, next) => {
  if (req.headers['authorization']) {
    next()
  }
}
*/

app.listen(process.env.port || 4000, () => {
  console.log('Server listening on http://localhost:4000 or http://127.0.0.1:4000')
});
