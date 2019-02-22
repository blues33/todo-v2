const express = require('express');
const passport = require('passport');

const router = express.Router();

// Load User model
const User = require('../models/User');
// Load Todo model
const Todo = require('../models/Todo');

// @route   GET api/todos
// @desc    Get all todos
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo.find({ user: req.user.id })
    .then(todos => res.json(todos))
    .catch(err => res.status(404).json(err));
});

// @route   POST api/todos/
// @desc    Create a new todo
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
    priority: req.body.priority,
    user: req.user.id,
    get_done_by: req.body.get_done_by
  });

  newTodo.save().then(todo => res.json(todo));
});

// @route   DELETE api/todos/:id
// @desc    Delete todo
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo.findById(req.params.id)
    .then((todo) => {
      // Delete
      todo.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ data: err }));
});

// @route   PUT api/todos/:id
// @desc    Update todo
// @access  Private
router.put('/:id', (req, res) => {
  Todo.findByIdAndUpdate(req.params.id)
    .then((todo) => {
      todo.completed ? (todo.completed = false) : (todo.completed = true);
      todo.save();
    })
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json({ data: err }));
});

module.exports = router;
