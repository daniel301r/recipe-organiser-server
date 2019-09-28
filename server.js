const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const users = require('./api/routes/users');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/', users);

//see if this solves the problem with adding the recipe
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected')
});


app.listen(process.env.PORT || 3001, ()=>{
    console.log('listening');
})