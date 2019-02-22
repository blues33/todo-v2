const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

require('dotenv').config();

const app = express();

// Routes
const users = require('./routes/users');
const todos = require('./routes/todos');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./auth/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/todos', todos);

app.use(express.static('dist'));
app.get('/api/', (req, res) => res.send('heroo'));

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
