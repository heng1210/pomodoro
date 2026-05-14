import { useState } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export default function TaskInput({ onAdd }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="添加新任务..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit">添加</button>
    </form>
  )
}
