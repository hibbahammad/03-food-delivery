import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="page-container container empty-state card-surface not-found">
      <h1>404</h1>
      <h3>Page not found</h3>
      <p>The page you were looking for does not exist or has been moved.</p>
      <Link to="/" className="button">
        Back home
      </Link>
    </div>
  )
}

export default NotFoundPage
