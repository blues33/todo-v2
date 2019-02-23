const express = require('express');
const passport = require('passport');

const router = express.Router();

// Load Todo model
const Todo = require('../models/Todo');
// Load validation
const validateTodoInput = require('../validation/todo');

// @route   GET api/todos/
// @desc    Get all todos
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Todo.find({ user: req.user.id })
    .sort({ created_at: -1 })
    .then(todos => res.json(todos))
    .catch(err => res.status(404).json(err));
});

// @route   POST api/todos/
// @desc    Create a new todo
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateTodoInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

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
    .catch(err => res.status(404).json(err));
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
