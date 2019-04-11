const express = require('express')
require('./db/mongoose')
const User = require('./models/user') // Call Model
const Task = require('./models/task') // Calling Model
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT 
// const port = process.env.PORT || 3000
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

//next() passes flow to route handler
//app.use((req, res, next) => {
 //   if (req.method == 'GET') {
 //       next()
 //   }
 //   else {
//        res.send('Get request in Process')
 //   }
   
//})

const main = async () => {
//try{
    const user = await User.findById("5c7f48663f6e4fc12748633c")
    //user.populate('tasks').execPopulate()
   // console.log(user.tasks)
//}catch(e) {
 //   throw new Error('Found Error in Relation of Task and User!')
//}
}

main()
// Without middleware new request --> run route handler
// Without middleware new request --> do something in middleware --> run route handler
app.listen(port,() => {
    console.log('Server is up on the port'+ port)
})

const encryptFunction = async () => {
    const password = 'Red12345!'
    const hashPassword = await bcrypt.hash(password, 8)
    
    //    const token = jwt.sign({_id: 'abc123'}, 'this is my token check')
    console.log(password)
    console.log(hashPassword)
    //    const data = jwt.verify(token, 'this is my token check')
//    console.log(data)
}

encryptFunction()

// const myFunctionToken = async () => {
  //  const token = jwt.sign({_id: 'abc123' }, 'thisismyNode', {expiresIn: '1 days'})
   // console.log('Token :',token)
   // const data = jwt.verify(token, 'thisismyNode')
  //  console.log(data)
//}


//myFunctionToken()

// ##################Express Middleware #######################
//With middleware: new request --> do something  --> run route handler
app.use((req, res, next)  => {
    console.log(req.method, req.path)
    if (req.method === 'GETs') {
        res.send('Site is Under Maintenance, Please check back again..')
    }
    else {
        next()
    }

})
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



