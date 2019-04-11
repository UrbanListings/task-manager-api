
const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


router.post('/tasks', async (req, res) => {
   // const task = new Task({
        //  establish relation between user and task
     //   ...req.body,
     //   owner: req.user._id
   // })
   const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
        console.log(res)
    }catch(e)  {
        res.status(400).send(e)
    }
})

router.get('/tasks/pending', async (req, res) => {
    try{
        const task = await Task.find({})
        res.send(task)
        
    } catch(e)  { 
        res.status(500).send()
    }
 })

router.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    //console.log(req.params)
    Task.findById(_id).then((task) => {
        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) =>{
        res.send(500).send()
    })
})

// GET /tasks?completed=true
// Issue regarding relation of Task and User objects
// need enough of practicse
router.get('/tasks', async (req, res) => {
    const match ={}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
  }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit)
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates =['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Operation!'})
    }
    try{
      //  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
            
        await task.save()
      
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    
    } catch(e) {
        res.status(400).send(e)
    }

})

module.exports = router