import { useState } from 'react'

import Navbar from './components/Navbar'
import Header from './components/Header'
import Button from './components/Button'
import Form from './components/Form'
import Input from './components/Input'

import Task from './models/Task'

import TaskService from './services/TaskService'

import './App.css'
import { Activity02Icon, CancelCircleIcon, CheckmarkCircle03Icon, Delete02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

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
      <div className='px-2 py-1'>
        <h1 className='text-2xl'>Dashboard</h1>
        <div className="cards mt-2 mb-2">
          <div className="card__item">
            <div className="card__item-icon">
              <HugeiconsIcon icon={Activity02Icon} height={50} color='' />
            </div>
            <div className="card__item-info">
              <div className="card__item-info-header">
                <span>Total</span>
              </div>
              <div className="card__item-info-body">
                <span className="card__item-info-body-count">{tasks.length}</span>
                <span className="card__item-info-body-count-label">task{tasks.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          <div className="card__item">
            <div className="card__item-icon">
              <HugeiconsIcon icon={Activity02Icon} height={50} color='' />
            </div>
            <div className="card__item-info">
              <div className="card__item-info-header">
                <span>Pending</span>
              </div>
              <div className="card__item-info-body">
                <span className="card__item-info-body-count">{tasks.filter(task => !task.completedAt).length}</span>
                <span className="card__item-info-body-count-label">task{tasks.filter(task => !task.completedAt).length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
          <div className="card__item">
            <div className="card__item-icon">
              <HugeiconsIcon icon={Activity02Icon} height={50} color='' />
            </div>
            <div className="card__item-info">
              <div className="card__item-info-header">
                <span>Completed</span>
              </div>
              <div className="card__item-info-body">
                <span className="card__item-info-body-count">{tasks.filter(task => task.completedAt).length}</span>
                <span className="card__item-info-body-count-label">task{tasks.filter(task => task.completedAt).length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task */}
        <Form onSubmit={(data: { title: string; description: string }) => {
          if (data.title.trim() === '') return;
          taskService.addTask(data.title);
          setTasks(taskService.getTasks());
        }}>
          <div className="flex mb-2">
            <Input className='border flex-1 p-2 rounded ' name="title" placeholder="New task title..." />
            <Button type="submit" className='bg-blue-500 px-2 rounded text-white ml-2'>Add Task</Button>
          </div>
        </Form>

        <ul className='tasks'>
          {tasks.map(task => (
            <li className='task mb-2 flex bg-slate-50 rounded p-2 h-14 justify-between items-center' key={task.id}>
              <div className="task__title">
                <p>{task.title}</p>
                {task.completedAt ? <p>Completed at {new Date(task.completedAt).toLocaleDateString('pt-BR')}</p> : ''}
              </div>
              <div className="task__buttons">
                <button 
                  className={`task__button task__button--complete ${task.completedAt ? 'task__button--completed' : ''}`}
                  onClick={() => {
        
                    taskService.toggleTaskCompletion(task.id);
                    setTasks(taskService.getTasks());

                  }}
                  >
                  <HugeiconsIcon icon={task.completedAt ? CancelCircleIcon : CheckmarkCircle03Icon} height={20} color={task.completedAt ? 'red' : 'green'} />
                </button>
                <button className="task__button task__button--delete">
                  <HugeiconsIcon icon={Delete02Icon} height={20} color='red' />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
