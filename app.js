const bodyParser = require('body-parser');

const express = require('express'),
  app = express(),
  config = require('./config'),
  apiRoutes = require('./routes/app.routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send({
    message: 'In the root route',
    status: 200,
  })
})

app.use('/api', apiRoutes);

app.use((req, res, next) => {
  res.status(400).send({
    message: 'Resource Not Found',
    status: 400,
  })
})

app.listen(config.port, () => {
  console.log('Listening in port ', config.port);
})