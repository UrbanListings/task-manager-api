const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
try{
// when Authorization is specified in POSTMAN --> Bearer token to appear on Console
   const token = req.header('Authorization').replace('Bearer ', '')
   const decoded = jwt.verify(token, 'thisismytokencheck')
   const user = await User.findOne( { _id: decoded._id, 'tokens.token': token })
   console.log('Value of Token in auth.js', token)
   if(!user) {
      throw new Error('Cannot find auth library!')
    }
    req.token = token
    req.user = user
    next()
}catch (e) {
    res.status(401).send({error: 'Please authenticate'})
}
    console.log('auth middleware')
    next()
}

module.exports = auth