import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import Stats from './components/Stats'
import './styles.css'

export interface Task {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // 尝试从本地存储加载任务
    const saved = localStorage.getItem('pomodoro-tasks')
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTasks(prev => [newTask, ...prev])
  }

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const todayCompleted = tasks.filter(t =>
    t.completed && t.createdAt.startsWith(new Date().toISOString().split('T')[0])
  ).length

  return (
    <div className="app">
      <h1>番茄钟</h1>
      <Stats completed={todayCompleted} total={tasks.length} />
      <Timer />
      <TaskInput onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App
