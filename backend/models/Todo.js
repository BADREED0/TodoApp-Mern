const mongoose = require('mongoose')
const Joi = require('joi')

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        min: 1,
        required: true
    }
})

const Todo = mongoose.model( "Todo" , todoSchema )

const validateCreateTodo = (obj) => {
    const schema = Joi.object({
        text: Joi.string().min(1).trim().required()
    })
    return schema.validate(obj)
}

const validateUpdateTodo = (obj) => {
    const schema = Joi.object({
        text: Joi.string().min(1).trim()
    })
    return schema.validate(obj)
}

module.exports = {
    Todo,
    validateCreateTodo,
    validateUpdateTodo
} 