import { useState } from 'react';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Button from './components/Button';
import Form from './components/Form';
import Input from './components/Input';

import Task from './models/Task';
import TaskService from './services/TaskService';

import './App.css';
import {
  ClipboardDocumentCheckIcon,
  ClockIcon,
  CheckBadgeIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

import {
  CheckCircleIcon as SolidCheckCircleIcon
} from '@heroicons/react/24/solid';

function App() {
  const taskService = new TaskService();

  const [tasks, setTasks] = useState<Task[]>(() => {
    const storedTasks = taskService.getTasks();
    return storedTasks ? storedTasks : [];
  });

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(task => !task.completedAt).length;
  const completedTasks = tasks.filter(task => task.completedAt).length;
  const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const renderTask = (task: Task) => {
    const isCompleted = !!task.completedAt;
    return (
      <div 
        key={task.id} 
        className={`group flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
          isCompleted 
            ? 'bg-slate-50/70 border-slate-100 shadow-none opacity-80' 
            : 'bg-white border-slate-200 hover:border-indigo-200 shadow-sm hover:shadow-md'
        }`}
      >
        <div className="flex items-center gap-4 flex-1 overflow-hidden pr-4">
          {/* Checkbox button */}
          <button 
            onClick={() => {
              taskService.toggleTaskCompletion(task.id);
              setTasks(taskService.getTasks());
            }}
            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
              isCompleted 
                ? 'text-teal-500 scale-110' 
                : 'text-slate-300 hover:text-indigo-400 border-2 border-slate-200 hover:border-indigo-300 bg-white'
            }`}
          >
            {isCompleted && <SolidCheckCircleIcon className="w-8 h-8 drop-shadow-sm" />}
          </button>
          
          {/* Task Info */}
          <div className="flex flex-col truncate overflow-hidden">
            <p className={`font-semibold text-[1.05rem] truncate transition-all duration-300 ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
              {task.title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              {isCompleted ? (
                <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full inline-block">
                  Completed {new Date(task.completedAt as unknown as string).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
                </span>
              ) : (
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Pending
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus-within:opacity-100">
          <button 
            onClick={() => {
              taskService.deleteTask(task.id);
              setTasks(taskService.getTasks());
            }}
            className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/20 active:scale-95"
            title="Delete task"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      <Header />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Overview
            </h1>
            <p className="text-slate-500 mt-2 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
              </span>
              You have {pendingTasks} pending task{pendingTasks !== 1 && 's'} today
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-inner ring-4 ring-indigo-50">
               {completionRate}%
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">Completion</span>
              <span className="text-xs text-slate-400 font-medium">Overall progress</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Card */}
          <div className="group bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border flex flex-col justify-between border-slate-100 relative overflow-hidden hover:-translate-y-1 transition-all duration-300 min-h-[140px]">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full opacity-60 group-hover:scale-[1.5] transition-transform duration-500"></div>
            <div className="relative flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <ClipboardDocumentCheckIcon className="w-6 h-6" />
              </div>
            </div>
            <div className="relative">
              <p className="text-sm font-semibold text-slate-500 mb-1">Total Tasks</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-800">{totalTasks}</span>
              </div>
            </div>
          </div>

          {/* Pending Card */}
          <div className="group bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border flex flex-col justify-between border-slate-100 relative overflow-hidden hover:-translate-y-1 transition-all duration-300 min-h-[140px]">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full opacity-60 group-hover:scale-[1.5] transition-transform duration-500"></div>
            <div className="relative flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                <ClockIcon className="w-6 h-6" />
              </div>
            </div>
            <div className="relative">
              <p className="text-sm font-semibold text-slate-500 mb-1">In Progress</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-slate-800">{pendingTasks}</span>
              </div>
            </div>
          </div>

          {/* Completed Card */}
          <div className="group bg-gradient-to-br flex flex-col justify-between from-indigo-500 to-purple-600 rounded-[2rem] p-6 shadow-xl shadow-indigo-200 relative overflow-hidden hover:-translate-y-1 transition-all duration-300 text-white min-h-[140px] border border-indigo-400">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-[1.5] transition-transform duration-500"></div>
            <div className="relative flex justify-between items-start mb-4">
              <div className="p-3 bg-white/20 rounded-2xl text-white backdrop-blur-md">
                <CheckBadgeIcon className="w-6 h-6" />
              </div>
            </div>
            <div className="relative">
              <p className="text-sm font-semibold text-indigo-100 mb-1">Completed</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{completedTasks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Area */}
        <div className="mb-12">
          <Form onSubmit={(data: { title: string; description: string }) => {
            if (data.title.trim() === '') return;
            taskService.addTask(data.title);
            setTasks(taskService.getTasks());
            
            // clear the input
            const input = document.querySelector('input[name="title"]') as HTMLInputElement;
            if(input) input.value = '';
          }}>
            <div className="relative group max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <PlusIcon className="h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <Input 
                className='w-full pl-14 pr-36 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300 text-slate-700 font-medium placeholder:text-slate-400 text-lg' 
                name="title" 
                placeholder="What needs to be done?" 
                autoComplete="off"
              />
              <Button 
                type="submit" 
                className='absolute right-2 top-2 bottom-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 rounded-xl font-semibold transition-colors duration-300 shadow-sm flex items-center gap-2'
              >
                Add 
              </Button>
            </div>
          </Form>
        </div>

        {/* Task Lists */}
        <div>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 border-dashed rounded-[2rem] shadow-sm">
              <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                <ClipboardDocumentCheckIcon className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-700">No tasks yet</h3>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto text-center leading-relaxed">You have a clean slate! Add a task above to start tracking your progress.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Pending Tasks Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    To Do
                    <span className="bg-amber-100 text-amber-700 text-xs py-1 px-2.5 rounded-full font-bold">{pendingTasks}</span>
                  </h2>
                </div>
                {pendingTasks === 0 ? (
                  <p className="text-slate-500 text-sm py-2 italic">All caught up! No pending tasks right now.</p>
                ) : (
                  <div className="space-y-3">
                    {tasks.filter(task => !task.completedAt).map(task => renderTask(task))}
                  </div>
                )}
              </div>

              {/* Completed Tasks Section */}
              {completedTasks > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                      Completed
                      <span className="bg-teal-100 text-teal-700 text-xs py-1 px-2.5 rounded-full font-bold">{completedTasks}</span>
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {tasks.filter(task => task.completedAt).map(task => renderTask(task))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App

