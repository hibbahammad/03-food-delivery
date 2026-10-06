import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getOrders } from '../services/api'
import { formatPrice, getInitials } from '../utils/formatters'

function ProfilePage() {
  const { user, isLoggedIn, logout, updateProfile } = useAuth()
  const orders = getOrders()

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  if (!isLoggedIn) {
    return (
      <div className="page-container container empty-state card-surface">
        <h3>Login to view your profile</h3>
        <p>Create an account or sign in to manage orders and saved details.</p>
        <div className="empty-actions">
          <Link to="/login" className="button">
            Login
          </Link>
          <Link to="/register" className="button button--secondary">
            Register
          </Link>
        </div>
      </div>
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSave = (event) => {
    event.preventDefault()
    updateProfile({ name: form.name, email: form.email })
    setEditing(false)
  }

  return (
    <div className="page-container container profile-page">
      <div className="section-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-grid">
        <div className="card-surface profile-card">
          <div className="profile-avatar">{getInitials(user?.name || user?.email || 'User')}</div>
          <div className="profile-card__content">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
            <button type="button" className="button button--secondary" onClick={() => setEditing((value) => !value)}>
              {editing ? 'Cancel' : 'Edit profile'}
            </button>
          </div>
        </div>

        <div className="card-surface profile-card">
          <h3>Saved addresses</h3>
          <ul className="address-list">
            {(user?.savedAddresses || []).map((address) => (
              <li key={address.id || address.line}>
                <strong>{address.label}</strong>
                <span>{address.line}</span>
                <span>{address.city} {address.zip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="card-surface profile-form">
          <label className="field-group">
            <span>Name</span>
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
          <label className="field-group">
            <span>Email</span>
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </label>
          <button type="submit" className="button">
            Save changes
          </button>
        </form>
      ) : null}

      <div className="card-surface profile-orders">
        <div className="section-header compact-header">
          <h3>Recent orders</h3>
        </div>
        {orders.length ? (
          <ul className="mini-order-list">
            {orders.slice(0, 3).map((order) => (
              <li key={order.id}>
                <div>
                  <strong>{order.restaurant}</strong>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <span>{formatPrice(order.total)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent orders yet.</p>
        )}
      </div>

      <div className="profile-actions">
        <Link to="/orders" className="button button--secondary">
          View all orders
        </Link>
        <button type="button" className="button button--ghost" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
