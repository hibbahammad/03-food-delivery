import { Link } from 'react-router-dom'
import { getOrders } from '../services/api'
import { formatPrice } from '../utils/formatters'

function OrdersPage() {
  const orders = getOrders()

  if (!orders.length) {
    return (
      <div className="page-container container empty-state card-surface">
        <h3>No orders yet</h3>
        <p>Your recent orders will appear here once you place a fresh delivery.</p>
        <Link to="/restaurants" className="button">
          Order now
        </Link>
      </div>
    )
  }

  return (
    <div className="page-container container orders-page">
      <div className="section-header">
        <h1>Orders</h1>
      </div>

      <div className="order-list">
        {orders.map((order) => (
          <Link key={order.id} to={`/orders/${order.id}`} className="order-card card-surface">
            <div className="order-card__top">
              <div>
                <span className="eyebrow">{order.id}</span>
                <h3>{order.restaurant}</h3>
              </div>
              <span className="status-badge">{order.status}</span>
            </div>
            <div className="order-card__meta">
              <span>{new Date(order.date).toLocaleDateString()}</span>
              <span>{order.items?.length || 0} items</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="order-card__items">
              {order.items?.slice(0, 3).map((item) => (
                <span key={`${order.id}-${item.id}`}>
                  {item.name} × {item.quantity}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
