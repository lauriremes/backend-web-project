const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

router.use(auth)

router.post('/', async (req, res) => {
  const { title, completed } = req.body; // get title/completed from request

  // double check if title
  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }
  try {
    const newTask = new Task({
      title,
      completed: completed || false,
      userId: req.user.id
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("create task error:", err.message);
    res.status(500).json({ error: 'server error creating task' });
  }
});

//get all tasks for the logged-in user
router.get('/', async (req, res) => {
  try {
    // find tasks only where userId matches the user id
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 }); // sort by newest
    res.json(tasks);
  } catch (err) {
    console.error("get tasks error:", err.message);
    res.status(500).json({ error: 'server error fetching tasks' });
  }
});

// get a single task by id
router.get('/:id', async (req, res) => {
  try {
    // find task by its id and make sure the userid matches the logged user
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      //task not found or task doesnt belong to this user
      return res.status(404).json({ error: 'task not found' });
    }
    res.json(task);
  } catch (err) {
     // handle potential invalid objectid format errors
     if (err.kind === 'ObjectId') {
        return res.status(404).json({ error: 'task not found (invalid id format)' });
     }
    console.error("get single task error:", err.message);
    res.status(500).json({ error: 'server error fetching task' });
  }
});

// update a task
router.put('/:id', async (req, res) => {
  const { title, completed } = req.body;

  // build a task object
  const taskFields = {};
  if (title !== undefined) taskFields.title = title; //allow update title
  if (completed !== undefined) taskFields.completed = completed; // allow update status

  // make sure there is somethign to update
  if (Object.keys(taskFields).length === 0) {
      return res.status(400).json({ message: 'no fields provided for update' });
  }
   // title cannot be empty if given
  if (title === '') {
      return res.status(400).json({ message: 'title cannot be empty' });
  }


  try {
    // find task by id and owner then update
    // return modified document
    //makes sure updates follows schema rules
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // find by id and owner
      { $set: taskFields }, // apply changes
      { new: true, runValidators: true }
    );

    if (!task) {
      // task not found or wrong user
      return res.status(404).json({ error: 'task not found' });
    }
    res.json(task);
  } catch (err) {
     // handle potential invalid objectid format errors or validation errors
     if (err.kind === 'ObjectId') {
        return res.status(404).json({ error: 'task not found (invalid id format)' });
     }
     if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
     }
    console.error("update task error:", err.message);
    res.status(500).json({ error: 'server error updating task' });
  }
});


//delete a task
router.delete('/:id', async (req, res) => {
  try {
    // find task by id and owner then delete
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      // task not found or task doesnt belong to this user
      return res.status(404).json({ error: 'task not found' });
    }
    res.json({ message: 'task deleted successfully' });
  } catch (err) {
     // handle potential invalid objectid format errors
     if (err.kind === 'ObjectId') {
        return res.status(404).json({ error: 'task not found (invalid id format)' });
     }
    console.error("delete task error:", err.message);
    res.status(500).json({ error: 'server error deleting task' });
  }
});

module.exports = router;
