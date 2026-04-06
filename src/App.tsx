import { useState } from 'react'

import Navbar from './components/Navbar'
import Header from './components/Header'
import Button from './components/Button'
import Form from './components/Form'
import Input from './components/Input'

import {
  PlusCircleIcon, TrashIcon,
  CheckCircleIcon, XCircleIcon
} from '@heroicons/react/24/outline'

import Task from './models/Task'

import TaskService from './services/TaskService'

import './App.css'

function App() {

  const taskService = new TaskService();

  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = taskService.getTasks();
    return storedTasks ? storedTasks : [];
  });

  return (
    <>
      <Header />
      <Navbar />
      <div className='bg-slate-300 min-h-screen'>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
          <div className="mb-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500">No tasks yet. Add a task to get started!</p>
            ) : (
              <ul className="space-y-2">
                {tasks.map(task => (
                  <li key={task.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{task.title}</p>
                      {task.completed && task.completedAt && (
                        <p className="text-sm text-gray-500">Completed on {new Date(task.completedAt).toLocaleDateString()}</p>
                      )}
                    </div>
                    
                    <div>
                      {/* Toggle Complete */}
                      <button className={`text-sm ${task.completed ? 'text-red-500' : 'text-green-500'} hover:underline ml-4`} onClick={() => {
                        taskService.toggleTaskCompletion(task.id);
                        setTasks((currentTasks) => currentTasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
                      }}>
                        {task.completed ? <XCircleIcon className="h-5 w-5" /> : <CheckCircleIcon className="h-5 w-5" />}
                      </button>
                      {/* Delete Task */}
                      <button className="text-sm text-red-500 hover:underline ml-4" onClick={() => {
                        taskService.deleteTask(task.id);
                        setTasks((currentTasks) => currentTasks.filter(t => t.id !== task.id));
                      }}>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Form onSubmit={({ title }) => {
            const taskService = new TaskService();
            const newTask = taskService.addTask(title);
            setTasks((currentTasks) => [...currentTasks, newTask]);
          }}>
            <Input name="title" placeholder="Task Title" required />
            <Button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded flex items-center'>
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add Task
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default App
