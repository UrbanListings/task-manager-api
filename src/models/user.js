const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
mongoose.Promise = require('bluebird');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// 3 Step process of Schema setup to model register to Export Model
// Create Schema as mongoose.Schema({})
// instantiate/Register model as mongoose.model(modelName, schemaName)
// Export the module as module.exports=modelName


const userSchema = new mongoose.Schema({ 

    name: {
        type: String,
        required: true,
        trim: true
        
    },
    email: {
        type: String,
        unique: true,
        requried: true,
        trim: true,
        lowercase: true,
        validate(value) {
            // validator.isEmail(value) return true for matching value
          if (!validator.isEmail(value)){
               throw new Error('Email is invalid')
           } 
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,

      //  default: 0
        validate(value) {
           if (value.toLowerCase().includes('password')) {
              throw new Error('Pasword cannot contain password')
            }

        }

    },
    tokens: [{
        token: {
        type: String,
        required: true
        }
    }]
 })
// this code for Relational link of User to Task Model
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// static methods are accessible on model methods
// Token works in 2 steps::
 //    --> 1. jwt.sign (Create the Token)
//     ..> 2. assign token to user model
userSchema.methods.generateAuthToken = async function () { 
    const user = this
    // create the token using jwt.sign
    const token = jwt.sign({ _id: user._id.toString()}, 'thisismytokencheck', {expiresIn: '1 days'})
    // Next step is to add token to user
    user.tokens = user.tokens.concat({ token })
    await user.save()
    console.log('Auth token: ', token)
    return token
}
 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw new Error('Unable to Login as User not Found!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error ('Password did not Match!')
    }
    return user
}

// ###################################################################################
// ############### b4 saving to middleware perform task like encryption or debugger
// ###################################################################################
// hash the plain text password b4 saving

userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log('just before saving!')
    next()
})


// Register User model in userSchema
const User = mongoose.model('User', userSchema)
// Export the User module
module.exports = User