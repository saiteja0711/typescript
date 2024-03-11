"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/post', (req, res, next) => {
    const body = req.body;
    const newtodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newtodo);
    res.status(201).json({ message: 'added todo', todos: todos });
});
router.put('/edit/:id', (req, res, next) => {
    const Params = req.body;
    const body = req.body;
    const id = Params.id;
    const todoIndex = todos.findIndex(todoItem => {
        return todoItem.id === id;
    });
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(201).json({ message: 'updated todo', todos: todos });
    }
    res.status(401).json({ message: 'failed to update todo' });
});
router.delete('/delete/:id', (req, res, next) => {
    const Params = req.body;
    const idToDelete = Params.id;
    todos = todos.filter(todoItem => todoItem.id !== idToDelete);
    res.status(200).json({ message: 'Deleted todo', todos: todos });
});
exports.default = router;
