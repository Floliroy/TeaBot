var meteorologist = require('./app');
var cities = require('cities');
var express = require('express');
var redis = require('redis');
var app = express();

app.listen(4000);
console.log('http://localhost:4000');
