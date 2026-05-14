import { ReactNode } from 'react'

interface Props {
  progress: number
  mode: 'focus' | 'break'
  children: ReactNode
}

export default function CircularProgress({ progress, mode, children }: Props) {
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference
  const color = mode === 'focus' ? '#e74c3c' : '#2ecc71'

  return (
    <div className="circular-progress">
      <svg width="220" height="220" viewBox="0 0 220 220">
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#2a2a4a"
          strokeWidth="12"
        />
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 110 110)"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="progress-content">{children}</div>
    </div>
  )
}
