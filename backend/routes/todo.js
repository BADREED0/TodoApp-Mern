const express = require('express')
const asyncHandler = require('express-async-handler')
const { validateCreateTodo, Todo, validateUpdateTodo } = require('../models/Todo')


// Init
const router = express.Router()


router.get( '/' , asyncHandler( async (req,res) => {
    const todos = await Todo.find()
    res.status(200).json(todos)
}))

router.post( '/', asyncHandler( async (req,res) => {
    const { error } = validateCreateTodo(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    const isTodoExist = await Todo.findOne({text: req.body.text})
    if(isTodoExist){
        return res.status(404).json({message: "Task already exist"})
    }

    const todo = new Todo(req.body)
    const result = await todo.save()
    res.status(201).json(result)
}))

router.put( '/:id' , asyncHandler( async (req,res) => {
    const {error} = validateUpdateTodo(req.body)
    if(error){
        return res.status(400).json(error.details[0].message)
    }

    const todo = await Todo.findById(req.params.id)
    if(!todo){
        return res.status(404).json({message: "Task not found"})
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {$set: {
        text: req.body.text
    }},{new: true})
    res.status(200).json(updatedTodo)
}))

router.delete( '/:id' , asyncHandler(async (req,res) => {
    const todo = await Todo.findById(req.params.id)
    if(!todo){
        return res.status(404).json({message: "Task not found"})
    }

    await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "Task has been deleted"})
}))

module.exports = router