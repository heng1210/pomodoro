import { Task } from '../App'

interface Props {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty">暂无任务，添加一个开始吧！</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
              />
              <span>{task.text}</span>
            </label>
            <button className="delete-btn" onClick={() => onDelete(task.id)}>
              ×
            </button>
          </div>
        ))
      )}
    </div>
  )
}
