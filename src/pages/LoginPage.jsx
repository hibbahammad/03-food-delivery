import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  if (user) {
    return <Navigate to="/profile" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = login(form)

    if (!result.success) {
      setMessage(result.message)
      return
    }

    setMessage('')
    navigate('/profile')
  }

  return (
    <div className="page-container container auth-page">
      <div className="auth-card card-surface">
        <div className="auth-card__header">
          <span className="eyebrow">Welcome back</span>
          <h1>Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field-group">
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label className="field-group">
            <span>Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>

          <div className="auth-row">
            <label className="checkbox-inline">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          {message ? <p className="form-message error">{message}</p> : null}

          <button type="submit" className="button full-width">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
