const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const posts = require('./routes/post.routes');
const noAuth = require('./routes/no-auth/login.routes')(express);
const apiPort = 3000;

const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cookieParser());

app.use('/api', noAuth);
app.use('/api', posts);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
