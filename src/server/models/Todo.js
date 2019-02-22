const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define Schema
const TodoSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  get_done_by: {
    type: Date
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = Todo = mongoose.model('todos', TodoSchema);
