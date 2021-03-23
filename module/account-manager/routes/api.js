/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express = require('express');
var usersRouter = require('./users');
var authenticationRouter = require('./authentication');

var app = express();

app.use('/account/user', usersRouter);
app.use('/account/authentication', authenticationRouter);

module.exports = app;