import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Restaurants', to: '/restaurants' },
  { label: 'Orders', to: '/orders' },
  { label: 'Profile', to: '/profile' },
]

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!searchTerm.trim()) {
      navigate('/restaurants')
      return
    }

    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    setSearchTerm('')
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Go to homepage">
          <span className="brand__mark">F</span>
          <span className="brand__text">Foodie</span>
        </Link>

        <div className="header-location">
          <span className="location-label">Deliver to</span>
          <strong>Downtown, CA</strong>
        </div>

        <form className="header-search" onSubmit={handleSubmit}>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search food or restaurants"
            aria-label="Search for food or restaurants"
          />
          <button type="submit" className="button small-button">
            Search
          </button>
        </form>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-button" aria-label="View cart">
            <span>Cart</span>
            <strong>{itemCount}</strong>
          </Link>

          {user ? (
            <div className="profile-chip">
              <span>{user.name?.split(' ')[0] || 'Guest'}</span>
              <button type="button" className="button button--ghost small-button" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="button small-button">
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
            Cart ({itemCount})
          </Link>
        </div>
      ) : null}
    </header>
  )
}

export default Header
