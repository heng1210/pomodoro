import { useState, useEffect, useRef } from 'react'
import CircularProgress from './CircularProgress'

const FOCUS_TIME = 25 * 60 // 25分钟
const BREAK_TIME = 5 * 60  // 5分钟

const PRESETS = [
  { label: '15分钟', minutes: 15 },
  { label: '25分钟', minutes: 25 },
  { label: '45分钟', minutes: 45 },
  { label: '60分钟', minutes: 60 },
]

type Mode = 'focus' | 'break'

export default function Timer() {
  const [mode, setMode] = useState<Mode>('focus')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [totalTime, setTotalTime] = useState(25 * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false)
      // 切换模式
      if (mode === 'focus') {
        setMode('break')
        setTimeLeft(5 * 60)
        setTotalTime(5 * 60)
      } else {
        setMode('focus')
        setTimeLeft(25 * 60)
        setTotalTime(25 * 60)
      }
      // 播放提示音
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleVcQNpHW+NueZVQ1Wq/w/5xkPzJJlub/p2caL1GS2vypZh43W6/w/5xiQTlHktT8pWIaM1qp8P+cYz85R5LV/KRjGjRaqfD/nGM/OUeS1vykYxs1W6nw/5xjQDhHktX8pGIaNVup8P+cYz84R5LV/KRiGzVcqPD/nGM/OEeS1fykYhs1Xanw/5xjPzhHktX8pGIbNV2p8P+cYz84R5LV/KRiGzVdqfD/nGM/OEeS1fykYhs1Xanw/5xjPzhHktX8pGIbNV2p8P+cYz84R5LV/KRiGzVdqfD/nGM/OEeS1fykYhs=')
        audio.play()
      } catch {}
    }
  }, [timeLeft, mode])

  const toggle = () => setIsRunning(prev => !prev)

  const reset = () => {
    setIsRunning(false)
    setTimeLeft(totalTime)
  }

  const switchMode = (m: Mode) => {
    setIsRunning(false)
    setMode(m)
    const t = m === 'focus' ? 25 * 60 : 5 * 60
    setTimeLeft(t)
    setTotalTime(t)
  }

  const setPreset = (minutes: number) => {
    setIsRunning(false)
    setTimeLeft(minutes * 60)
    setTotalTime(minutes * 60)
  }

  const progress = ((totalTime - timeLeft) / totalTime) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="timer">
      <div className="mode-switch">
        <button
          className={mode === 'focus' ? 'active' : ''}
          onClick={() => switchMode('focus')}
        >
          专注
        </button>
        <button
          className={mode === 'break' ? 'active' : ''}
          onClick={() => switchMode('break')}
        >
          休息
        </button>
      </div>

      <div className="presets">
        {PRESETS.map(p => (
          <button
            key={p.minutes}
            className={`preset-btn ${totalTime === p.minutes * 60 ? 'active' : ''}`}
            onClick={() => setPreset(p.minutes)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <CircularProgress progress={progress} mode={mode}>
        <div className="time-display">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <div className="mode-label">
          {mode === 'focus' ? '专注时间' : '休息时间'}
        </div>
      </CircularProgress>

      <div className="timer-controls">
        <button className="btn-primary" onClick={toggle}>
          {isRunning ? '暂停' : '开始'}
        </button>
        <button className="btn-secondary" onClick={reset}>
          重置
        </button>
      </div>
    </div>
  )
}
