
require('../src/db/mongoose')
//mongoose.Promise = global.Promise
const User = require('../src/models/user')
//const User = require('../src/model/user')

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    // const count = await User.countDocuments({age})
    return 1
}


updateAgeAndCount('5c7c45875b9f08bd156608ec', 2).then((count) =>{
    console.log('updated')
}).catch((e) => {
    console.log(e)
})
// 5c7c4642d57006c215d78d16

const deleteUserAndCount = async (id) => {
    const user = await User.findByIdAndDelete(id)
    const count = await User.countDocuments({completed: false})
    return count
}


deleteUserAndCount('5c7c4642d57006c215d78d16').then((count) =>{
    console.log('Deleted ', count)
}).catch((e) => {
    console.log(e)
})
