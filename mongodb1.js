//CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

//const {MongoClient, ObjectID} = require('mongodb')

//const id = new ObjectID()
//console.log(id)
//console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
//try{
    MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {

        if(error) {

            return console.log('Unable to connect to database!')
        }
        const db = client.db(databaseName)
        console.log('Connection Successful')

        //######## Inserting a Single Record #########
     //   db.collection('users').insertOne({
        //    _id:id,
    //        name: 'Mahim',
    //        age: '27'
   // })
//console.log('Isnerted record Successfully')
//})
    //, (error, result) => {
    //    if(error){
    //        return console.log('Unable to Insert record')
    //    }
    //    console.log(result.ops)
   // })
    // Inserting Multiple Records
//    db.collection('CreditCard').insertMany([
//        {
        
//        Customer_Name: 'Roger Moose1',
//        Credit_Score: '620',
//        FICO_Score: '550',
//        LTV: '0.9'
//        },
//        {
       
//        Customer_Name: 'Shelly bee1',
//        Credit_Score: '630',
//        FICO_Score: '500',
 //       LTV: '0.7'  
 //       }
 //   ], (error, result) => {
 //   if(error){
 //       return console.log('Unable to Insert record')
  //            }   
  //  console.log(result.ops)
//})
//})

//db.collection('superuser').findOne({ _id: new ObjectID("5c79f2046affdf0c7724a3e5")}, (error, age) => {
//    if(error){
//        return console.log('Unable to fetch Document from Collection')
//    }
 //   console.log(age)
    // Returning id: <Buffer 5c 7a e6 4c 67 a1 41 0f 6b 5b 72 c8> }
    // Need further research why object name, age not returned?
// })

db.collection('users').find({ age: '27' }).toArray((error, users) => {
    console.log('Inside Search Function..')
    console.log(users)
})

// ############## Count Document for the object Count ##########
db.collection('users').find({ age: '27' }).count((error, count) => {
    console.log(count)
})

// ############## update Document ####################
const updatePromise = db.collection('users').updateOne({
    _id: new ObjectID("5c7af5475321cf1001b91040")
}, {
    $set: {
        name: 'Mike'
    }
})

updatePromise.then((result) =>{
    console.log(result)
}).catch((error) => {
    console.log(error)
})

// ############ update Many Document ###################
// db.collection('tasks').updateMany({
//   completed: false
//},{
//    $set: {
//        completed: true
//    }

//}).then((result) =>{
//    console.log(result.modifiedCount)
//}).catch((error) => {
//    console.log(error)
//})

db.collection('users').deleteMany({

    age: '27'

}).then((result) =>{

    console.log(result)
}).catch((error) =>{
    console.log(error)
})

})

//} catch(error) {
 //   alert(error.message)
//}
  
