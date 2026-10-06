import { Link, useParams } from 'react-router-dom'
import { getOrders } from '../services/api'
import { formatPrice } from '../utils/formatters'

function OrderDetailsPage() {
  const { id } = useParams()
  const orders = getOrders()
  const order = orders.find((entry) => entry.id === id)

  if (!order) {
    return (
      <div className="page-container container empty-state card-surface">
        <h3>Order not found</h3>
        <p>This order cannot be found in your records.</p>
        <Link to="/orders" className="button">
          Back to orders
        </Link>
      </div>
    )
  }

  return (
    <div className="page-container container order-details-page">
      <div className="section-header">
        <h1>Order details</h1>
      </div>

      <div className="order-detail-layout">
        <div className="card-surface order-detail-card">
          <div className="order-card__top">
            <div>
              <span className="eyebrow">{order.id}</span>
              <h3>{order.restaurant}</h3>
            </div>
            <span className="status-badge">{order.status}</span>
          </div>

          <div className="order-card__meta">
            <span>{new Date(order.date).toLocaleString()}</span>
            <span>{order.deliveryMethod}</span>
          </div>

          <ul className="order-items-list">
            {order.items?.map((item) => (
              <li key={`${order.id}-${item.id}`}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </li>
            ))}
          </ul>
        </div>

        <aside className="card-surface order-summary-card">
          <h3>Delivery info</h3>
          <div className="info-list">
            <div>
              <span>Customer</span>
              <strong>{order.contactName}</strong>
            </div>
            <div>
              <span>Address</span>
              <strong>{order.deliveryAddress}</strong>
            </div>
            <div>
              <span>Phone</span>
              <strong>{order.contactPhone}</strong>
            </div>
            <div>
              <span>Payment</span>
              <strong>{order.payment}</strong>
            </div>
          </div>

          <div className="summary-list">
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(order.subtotal)}</strong>
            </div>
            <div>
              <span>Delivery fee</span>
              <strong>{formatPrice(order.deliveryFee)}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default OrderDetailsPage
