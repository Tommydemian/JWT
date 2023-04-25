const Goal = require('../models/goalModel.js');
const tryCatch = require('../utils/tryCatch')
const { createNewCustomAPIError } = require('../errors/customAPIError')

// get all goals
const getAllGoals = tryCatch(async(req, res, next) => {
    const { name, completed } = req.query
    const queryObject = {}

    if (name) {
        queryObject.name = name
    }

    if (completed){
        queryObject.completed = completed === true ? true  : false
    }

    // goals definition.
    let goals
    if ( Object.keys(queryObject).length > 0) {
        goals = await Goal.find(queryObject)
    } else {
        goals = await Goal.find({})
    }
    // no goals case.
    if (!goals){
        return next(createNewCustomAPIError(404, 'products not found'))
    }

    res.status(200).json({ data: goals, success: true, nHits: goals.length })
});

const getOne = tryCatch( async(req, res, next) => {
    const { id } = req.params      
    const goal = await Goal.findOne({ _id: id })
    
    if (!goal) {
        return next(createNewCustomAPIError(404, 'no goal foaund with such id: ' + id))
    }
    res.status(200).json({data: goal, success: true })
});

const createOne = tryCatch(async(req, res, next) => {
    const newGoal = await Goal.create(req.body)
    res.send(201).json({message: 'goal created successfully', success: true})

});

const updateOne = tryCatch(async(req, res, next) => {
    const { id } = req.params
    const goal = await Goal.findOneAndUpdate({ _id: id })
    if (!goal) {
        return next(createNewCustomAPIError(404, 'no goal foaund with such id:' + id))
    }
    res.status(200).json({ data: goal, success: true })
})

const replaceOne = tryCatch( async (req, res, next) => {
  const { id } = req.params
  const goal = await Goal.findOneAndReplace({ _id: id })
  if (!goal) {
    return next(createNewCustomAPIError(404, 'no goal foaund with such id:' + id))
  }
})

module.exports = { getAllGoals, getOne, createOne }