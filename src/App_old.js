
import { useEffect, useState } from 'react';
import ToDoService from './API/ToDoService';
import './App.css';

function App() {
  const [input, setInput] = useState({ title: '', description: '', status: false })
  const [tasks, setTasks] = useState([])

  const createTask = () => {
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

    setTasks([...tasks, newTask])

    const fetching = async () => {
      await ToDoService.setTask(input.title, input.description, false)
    }
    fetching()
    
    setInput({ title: '', description: '' })
  }

  const clearAll = () => {
    setTasks([])
  }
  const clearComplete = () => {
    setTasks(tasks.filter(t => !t.attributes.status))
  }


  useEffect(() => {
    const fetching = async () => {
      const response = await ToDoService.getAll()
      setTasks(response.data.data)
    }
    fetching()
  }, []);


  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className="todo_wrapper">
        <div className="todo_header">
          <div className="todo_inputs">
            <input className="todo_input todo_input__title" value={input.title} onChange={e => setInput({ ...input, title: e.target.value })} placeholder="Title" type="text" />
            <textarea className="todo_input todo_input__text" value={input.description} onChange={e => setInput({ ...input, description: e.target.value })} placeholder="Text" type="text" />
          </div>
          <div className="todo_btns">
            <button className="todo_btn" onClick={createTask}>Добавить</button>
            <button className="todo_btn" onClick={clearComplete}>Убрать выполненные</button>
            <button className="todo_btn" onClick={clearAll}>Очистить всё</button>
          </div>
        </div>
        <div className="todo_content">
          {
            tasks.map((task, index) =>
              <div key={task.attributes.title} className={task.attributes.status ? "todo_item complete" : "todo_item"}>
                <div className="todo_item_btns">
                  <input className="todo_checkbox" id={"checkbox" + index} type="checkbox" onChange={() => {
                    task.attributes.status ? task.attributes.status = false : task.attributes.status = true
                    let copy = Object.assign([], tasks)
                    setTasks(copy)
                  }
                  } />
                  <label htmlFor={"checkbox" + index}></label>
                </div>
                <div className="todo_description">
                  <div className="todo_description__title">
                    <h3>{task.attributes.title}</h3>
                  </div>
                  <div className="todo_description__text">
                    <p>{task.attributes.description}</p>
                  </div>
                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default App;
