"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/post', (req, res, next) => {
    const newtodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newtodo);
    res.status(201).json({ message: 'added todo', todos: todos });
});
router.put('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    const todoIndex = todos.findIndex(todoItem => {
        return todoItem.id === id;
    });
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(201).json({ message: 'updated todo', todos: todos });
    }
    res.status(401).json({ message: 'failed to update todo' });
});
//  router.delete('/todo/:id',(req,res,next)=>{
//     const newtodos =todos.filter(todoItem=>todoItem.id!==req.params.id);
//     res.status(200).json({message:'Deleted todo',todos:newtodos});
// });
router.delete('/todo/:id', (req, res, next) => {
    const idToDelete = req.params.id; // Get the ID to delete from request params
    todos = todos.filter(todoItem => todoItem.id !== idToDelete);
    res.status(200).json({ message: 'Deleted todo', todos: todos });
});
exports.default = router;
