import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatters'

function CartPage() {
  const navigate = useNavigate()
  const { items, subtotal, deliveryFee, total, updateQuantity, removeItem, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const applyPromo = () => {
    const normalized = promoCode.trim().toUpperCase()

    if (normalized === 'SAVE10') {
      setDiscount(subtotal * 0.1)
      return
    }

    setDiscount(0)
  }

  const discountedTotal = Math.max(total - discount, 0)

  if (!items.length) {
    return (
      <div className="page-container container empty-state card-surface">
        <h3>Your cart is empty</h3>
        <p>Pick a delicious meal and bring it back to your cart.</p>
        <div className="empty-actions">
          <Link to="/restaurants" className="button">
            Explore restaurants
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container container cart-page">
      <div className="section-header">
        <h1>Your cart</h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item card-surface">
              <img src={item.image} alt={item.name} />

              <div className="cart-item__details">
                <div className="cart-item__header">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.restaurantName}</p>
                  </div>
                  <button type="button" className="link-button" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>

                <div className="cart-item__actions">
                  <div className="qty-picker">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-summary card-surface">
          <h3>Order summary</h3>
          <div className="summary-list">
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div>
              <span>Delivery fee</span>
              <strong>{formatPrice(deliveryFee)}</strong>
            </div>
            <div>
              <span>Discount</span>
              <strong>{formatPrice(discount)}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(discountedTotal)}</strong>
            </div>
          </div>

          <div className="promo-field">
            <input
              type="text"
              value={promoCode}
              onChange={(event) => setPromoCode(event.target.value)}
              placeholder="Promo code"
            />
            <button type="button" className="button button--secondary" onClick={applyPromo}>
              Apply
            </button>
          </div>

          <div className="checkout-actions">
            <button type="button" className="button button--secondary" onClick={clearCart}>
              Clear cart
            </button>
            <button type="button" className="button" onClick={() => navigate('/checkout')}>
              Checkout
            </button>
          </div>

          <Link to="/restaurants" className="link-button inline-link">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}

export default CartPage
