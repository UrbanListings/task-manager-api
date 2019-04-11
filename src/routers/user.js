const express = require('express')
const User = require('../models/user')
//const auth = require('.../db/middleware/auth')
const auth = require('../models/auth')
const router = new express.Router()
const { sendWelcomeEmail } = require('../emails/account')
// auth is shitty library, not defined properly causing so many apis to fail.
// restricitng auth out of practicse from now!!


router.get('/users/me', (req, res) => {
    res.send('checking user router')
})
// async await makes it easy to work with Promise
// async always returns Promise. Value of Promise needs to be defined in Response
// Task Manager application is using async in each route handler
// aysnc is useful using await opertor
// aync allows synchonity of calling a function
// Instead of Promise chaining await allows synchronous calling
// adding async in get/post api does not require Promise as Response is returned
// ################## Unable to Match auth Token in POSTMAN API #########
router.get('/users', auth, async (req, res) => {
    //  res.send(req.user)
      console.log(req.user)
         try{
          const users_mdl = await User.find({})
          res.status(200).send(users_mdl)
          
      } catch(e)  { 
          res.status(500).send()
      }
  })


router.post('/users', async (req, res) => {
    const user = new User(req.body)
   
        try{
            await user.save()
            sendWelcomeEmail(user.email, user.name)
// generate auth token for saved user
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })

    } catch(e) {
        res.status(400).send(e)
    }
    // res.send('testing')

   // try{
    //    await user.save()
   //     res.status(201).send(user)
   
  //  }catch (e) {
  //      res.status(400).send(e)
  //  }
  //  user.save().then(() => {
   //         res.status(201).send(user)
  //  }).catch((error) =>{
  //      res.status(400).send(error)
  //  })    
})


router.post('/users/login', async (req, res) => {
    try{
        // findByCredentials is customer middleware
        // defined in User model
        console.log('Inside Login Router!!')
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        console.log(req.body.email, req.body.password)
        res.send({user, token})
    }catch(e) {
        res.status(400).send()
    }
})

//###################auth boiler-plate code ######################
//const auth = async (req, res, next) => {
//    try{
     //   const token = req.header('Authorization').replace('Bearer ', '')
      //  const decoded = jwt.verify(token, 'thisismytokencheck')
      //  const user = await User.findOne( { _id: decoded._id, 'tokens.token': token })
     //   console.log(token)
     //   console.log('User: ', req.user)
  //      console.log('auth middleware')
    //    if(!user) {
    //        throw new Error('Cannot find auth library!')
     //   }
     //   req.user = user
  //      next()
  //  }catch (e) {
  //      res.status(401).send({error: 'Please authenticate'})
  //  }
  //      console.log('auth middleware')
       
   // }
    


// auth is for using middleware route
router.get('/users/me', async (req, res) => {
    res.send(req.user)
    //   try{
 //       const users = await User.find({})
 //       res.send(users)
        
 //   } catch(e)  { 
 //       res.status(500).send()
 //   }
})



router.get('/users/:id', async (req, res) => {
    // _id is string ID, which is converted to Object ID by mongoose
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user) {
            return res.status(400).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send(e)
    }
    //console.log(req.params)
   // User.findById(_id).then((user) => {
   //     if (!user){
   //         return res.status(404).send()
   //     }
   //     res.send(user)
   // }).catch((e) =>{

   // })
})
// applyting Update patch
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates =['name', 'email', 'password']
   // every takes Call Back function. for 4 updates, 4 Call backs
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Operation!'})
    }
    try{
      //  const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
            
        await user.save()
        
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    
    } catch(e) {
        res.status(400).send(e)
    }

})

router.post('/users/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
}catch(e) {
    res.status(500).send()
}
})

module.exports = router

