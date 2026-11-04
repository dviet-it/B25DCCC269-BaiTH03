import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AlertCircle, Eye, EyeOff, Lock, LogIn, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (login(username, password)) navigate(from, { replace: true })
    else setError('Sai tên đăng nhập hoặc mật khẩu')
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-icon">
          <LogIn size={26} />
        </div>
        <h1>Chào mừng trở lại</h1>
        <p className="muted">
          {from === '/checkout' ? 'Đăng nhập để tiếp tục thanh toán' : 'Đăng nhập để mua sắm'}
        </p>

        <label className="field">
          <User size={18} />
          <input
            placeholder="Tên đăng nhập"
            value={username}
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value)
              setError('')
            }}
          />
        </label>

        <label className="field">
          <Lock size={18} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
          />
          <button
            type="button"
            className="eye"
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </label>

        {error && (
          <p className="login-error">
            <AlertCircle size={16} /> {error}
          </p>
        )}

        <button type="submit" className="login-submit">Đăng nhập</button>
      </form>
    </div>
  )
}
