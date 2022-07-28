import React from "react";
import Input from "./UI/Input"
import Textarea from "./UI/Textarea"
import Button from "./UI/Button";
import { useState } from "react";

const TodoForm = ({ clearAll, createTask, clearComplete }) => {
    const [input, setInput] = useState({ title: '', description: '', status: false })

    const clearAllTasks = () => {
        clearAll()
    }
    const createNewTask = () => {
        if (!(input.title || input.description)) {
            return
        }
        const newTask = {
            attributes: {
                title: input.title,
                description: input.description,
                status: false
            }
        }

        createTask(newTask)
        setInput({ title: '', description: '' })
    }
    const clearCompleteTasks = () => {
        clearComplete()
    }

    return (
        <div className="todo_header">
            <div className="todo_inputs">
                <Input
                    value={input.title}
                    onChange={e => setInput({ ...input, title: e.target.value })}
                    placeholder="Title"
                    type="text" />
                <Textarea
                    value={input.description}
                    onChange={e => setInput({ ...input, description: e.target.value })}
                    placeholder="Text"
                    type="text" />
            </div>
            <div className="todo_btns">
                <Button onClick={createNewTask}>Добавить</Button>
                <Button onClick={clearCompleteTasks}>Убрать выполненные</Button>
                <Button onClick={clearAllTasks}>Очистить всё</Button>
            </div>
        </div>

    )
}
export default TodoForm