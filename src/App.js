
import { useEffect, useState } from 'react';
import ToDoService from './API/ToDoService';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useFetching } from './hooks/useFetching';

function App() {
  const [tasks, setTasks] = useState([])
  const [fetchingTasks, isLoadingTasks, errorTasks] = useFetching(async () => {
    const response = await ToDoService.getAll()
    setTasks(response.data.data)
  })

  const createTask = (newTask) => {
    setTasks([...tasks, newTask])
    // const fetching = async () => {
    //   await ToDoService.setTask(input.title, input.description, false)
    // }
    // fetching()
  }
  const clearAll = () => {
    setTasks([])
  }
  const clearComplete = () => {
    setTasks(tasks.filter(t => !t.attributes.status))
  }
  const toggleCheckbox = (task) => {
    task.attributes.status ? task.attributes.status = false : task.attributes.status = true
    let copy = Object.assign([], tasks)
    setTasks(copy)
  }

  useEffect(() => {
    fetchingTasks()
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
