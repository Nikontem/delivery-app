const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const orderRouter = require('./routes/orders');
const menuItemsRouter = require('./routes/menu-items');
const extraOptionsRouter = require('./routes/extra-options');

const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags: 'a'}
);

app.use(logger('dev', {skip : function (req, res){return res.status.Code<400}}));
app.use(logger('combined', {stream: accessLogStream}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', orderRouter);
app.use('/menu-items',menuItemsRouter);
app.use('/extra-options', extraOptionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    next(createError(err));
});

module.exports = app;
