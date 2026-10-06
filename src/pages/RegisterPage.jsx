import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RegisterPage() {
  const navigate = useNavigate()
  const { user, register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
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

    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    const result = register(form)

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
          <span className="eyebrow">Start fresh</span>
          <h1>Create account</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field-group">
            <span>Name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>

          <label className="field-group">
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </label>

          <label className="field-group">
            <span>Password</span>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>

          <label className="field-group">
            <span>Confirm password</span>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          </label>

          {message ? <p className="form-message error">{message}</p> : null}

          <button type="submit" className="button full-width">
            Register
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
