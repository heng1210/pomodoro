interface Props {
  completed: number
  total: number
}

export default function Stats({ completed, total }: Props) {
  return (
    <div className="stats">
      <span>今日完成: {completed}/{total}</span>
    </div>
  )
}
