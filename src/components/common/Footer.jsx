import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand__mark">F</span>
            <span className="brand__text">Foodie</span>
          </div>
          <p className="footer-copy">
            Delivering handcrafted meals and neighborhood favorites with speed, care, and consistency.
          </p>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="mailto:support@foodie.com">Support</a></li>
            <li><a href="tel:+14155550134">+1 (415) 555-0134</a></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
