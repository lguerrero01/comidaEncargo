const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const dotenv = require('dotenv')
const router = express.Router();


dotenv.config();
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//rutas 

app.use('/api', require("./orders/orders.controller"));

app.use('/api', require("./meals/meals.controller"));

app.listen(3000, () => console.log("escuchando en puerto 3000"))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
