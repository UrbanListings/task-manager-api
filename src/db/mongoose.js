const mongoose = require('mongoose')
//const validator = require('validator')
// adding code for deprecation of mongoose
mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
//mongoose.Promise = require('q').Promise;
//import es6Promise from 'es6-promise';
//mongoose.Promise = es6Promise.Promise;
// setting Up Environment for DEV and PRODUCTION for HEROKU Server
var promise = mongoose.connect('mongodb://127.0.0.1:27017/task-manager',{

    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useMongoClient: true
})

