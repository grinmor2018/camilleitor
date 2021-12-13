const express = require('express');
const router = express.Router();
const task = require('../controllers/task.controller');

router.get('/', task.getTasks);
router.post('/', task.createTask);
router.get('/:id', task.getTask);
router.put('/:id', task.updateTask);
router.delete('/:id', task.deleteTask);

module.exports = router;