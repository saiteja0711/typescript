import { Router } from "express";
 import {todo} from "../models/todo"

let todos:todo[] =[];
type bodyRequest = {text:string}
type bodyParams ={id:string}

const router = Router();
 router.get('/',(req,res,next) =>{
    res.status(200).json ({todos:todos})
 })

 router.post('/post',(req,res,next)=>{
    const body = req.body as bodyRequest
    const newtodo:todo = {
        id:new Date().toISOString(),
        text:body.text
    }
    todos.push(newtodo);
    res.status(201).json({message:'added todo',todos:todos})
 })

 router.put('/edit/:id',(req,res,next) =>{
    const Params = req.body as bodyParams
    const body = req.body as bodyRequest
    const id =Params.id;
    const todoIndex = todos.findIndex(todoItem =>{
        return todoItem.id===id
    })
    if(todoIndex >= 0){
        todos[todoIndex]={ id:todos[todoIndex].id, text:body.text}
        return res.status(201).json({message:'updated todo',todos:todos})
    }
    res.status(401).json({message:'failed to update todo'})
    
 })

router.delete('/delete/:id', (req, res, next) => {
    const Params = req.body as bodyParams
    const idToDelete = Params.id; 
    todos = todos.filter(todoItem => todoItem.id !== idToDelete);
    res.status(200).json({ message: 'Deleted todo', todos: todos });
});



export default router