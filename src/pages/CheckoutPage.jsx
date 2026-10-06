import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { saveOrder } from '../services/api'
import { createOrderId, formatPrice } from '../utils/formatters'

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, total, clearCart } = useCart()
  const { user } = useAuth()
  const [orderPlaced, setOrderPlaced] = useState(null)
  const [form, setForm] = useState({
    address: user?.savedAddresses?.[0]?.line || '21 Maple Street, Downtown',
    phone: '+1 (415) 555-0134',
    contactName: user?.name || 'Alya Khan',
    paymentMethod: 'Credit Card',
    deliveryMethod: 'Standard',
  })

  if (!items.length && !orderPlaced) {
    return (
      <div className="page-container container empty-state card-surface">
        <h3>Your cart is empty</h3>
        <p>Before checking out, add an item or two to your cart.</p>
        <Link to="/restaurants" className="button">
          Browse restaurants
        </Link>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="page-container container success-state card-surface">
        <div className="success-icon">✓</div>
        <h2>Order placed successfully</h2>
        <p>
          Your order <strong>{orderPlaced.id}</strong> is being prepared and will be delivered soon.
        </p>
        <div className="success-actions">
          <Link to="/orders" className="button">
            View orders
          </Link>
          <Link to="/restaurants" className="button button--secondary">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handlePlaceOrder = (event) => {
    event.preventDefault()

    if (!user) {
      navigate('/login')
      return
    }

    const order = {
      id: createOrderId(),
      restaurant: items[0]?.restaurantName || 'Foodie favorites',
      restaurantId: items[0]?.restaurantId || 'featured',
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      deliveryFee,
      total,
      status: 'Preparing',
      date: new Date().toISOString(),
      deliveryAddress: form.address,
      contactName: form.contactName,
      contactPhone: form.phone,
      payment: form.paymentMethod,
      deliveryMethod: form.deliveryMethod,
    }

    const savedOrder = saveOrder(order)
    setOrderPlaced(savedOrder)
    clearCart()
  }

  return (
    <div className="page-container container checkout-page">
      <div className="section-header">
        <h1>Checkout</h1>
      </div>

      <form className="checkout-layout" onSubmit={handlePlaceOrder}>
        <div className="checkout-form card-surface">
          <div className="field-group">
            <label htmlFor="contactName">Contact name</label>
            <input id="contactName" name="contactName" value={form.contactName} onChange={handleChange} />
          </div>

          <div className="field-group">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div className="field-group">
            <label htmlFor="address">Delivery address</label>
            <textarea id="address" name="address" value={form.address} onChange={handleChange} rows="3" />
          </div>

          <div className="field-grid">
            <div className="field-group">
              <label htmlFor="deliveryMethod">Delivery method</label>
              <select id="deliveryMethod" name="deliveryMethod" value={form.deliveryMethod} onChange={handleChange}>
                <option value="Standard">Standard</option>
                <option value="Priority">Priority</option>
                <option value="Pickup">Pickup</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="paymentMethod">Payment method</label>
              <select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                <option value="Credit Card">Credit Card</option>
                <option value="Apple Pay">Apple Pay</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
          </div>
        </div>

        <aside className="checkout-summary card-surface">
          <h3>Order summary</h3>
          <div className="summary-list">
            {items.map((item) => (
              <div key={item.id}>
                <span>
                  {item.name} x {item.quantity}
                </span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div>
              <span>Delivery fee</span>
              <strong>{formatPrice(deliveryFee)}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>

          <button type="submit" className="button full-width">
            Place order
          </button>
        </aside>
      </form>
    </div>
  )
}

export default CheckoutPage
