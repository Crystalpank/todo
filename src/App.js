
import { useEffect, useState } from 'react';
import ToDoService from './API/ToDoService';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useFetching } from './hooks/useFetching';

function App() {
  const [tasks, setTasks] = useState([])
  // const [fetchingTasks, isLoadingTasks, errorTasks] = useFetching(async () => {
  //   const response = await ToDoService.getAll()
  //   setTasks(response.data.data)
  // })

  const createTask = (newTask) => {
    setTasks([...tasks, newTask])
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]))
  }
  const clearAll = () => {
    setTasks([])
    localStorage.setItem("tasks",JSON.stringify([]))
  }
  const clearComplete = () => {
    const filteredTasks = tasks.filter(t => !t.attributes.status)
    setTasks(filteredTasks)
    localStorage.setItem("tasks", JSON.stringify(filteredTasks))
  }
  const toggleCheckbox = (task) => {
    task.attributes.status ? task.attributes.status = false : task.attributes.status = true
    let copy = Object.assign([], tasks)
    setTasks(copy)
  }

  useEffect(() => {
    // fetchingTasks()
    localStorage.getItem("tasks") ? setTasks(JSON.parse(localStorage.getItem("tasks"))) : setTasks([])
  }, []);


  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div className="todo_wrapper">
        <TodoForm clearAll={clearAll} createTask={createTask} clearComplete={clearComplete} />
        <TodoList tasks={tasks} toggleCheckbox={toggleCheckbox} />
      </div>
    </div>
  );
}

export default App;
