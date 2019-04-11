const mongoose = require('mongoose')
const mongodb = require('mongodb')
mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const taskSchema = new mongoose.Schema({

    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
//    owner: {
//        type: mongoose.Schema.Types.ObjectId,
 //       required: true,
 //       ref: 'User'
        
//    }
})


//const task = new Task({

//    description: 'Learning Node Express',
//    completed: false
//})

// task.save().then(() =>{
//    console.log(task)
//}).catch((error) =>{
//    console.log(error)
// })

//taskSchema.pre('save', async function (next) {
//    const task = this
 //   if(task.isModified('description')) {
//        task.description = await bcrypt.hash(task.description, 8)
//    }
//    console.log('just before saving!')
//    next()
//})

// Registering Task Model in taskSchema
const Task = mongoose.model('Task', taskSchema)
module.exports = Task