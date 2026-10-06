import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getFoodById, getRestaurantById } from '../services/api'
import { formatPrice } from '../utils/formatters'

const addOnOptions = ['Extra cheese', 'Avocado', 'Olive oil', 'Hot sauce']

function FoodDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedAddOns, setSelectedAddOns] = useState(['Extra cheese'])
  const [specialInstructions, setSpecialInstructions] = useState('')

  const food = getFoodById(id)

  if (!food) {
    return (
      <div className="page-container container empty-state card-surface">
        <h3>Food item not found</h3>
        <p>The item you selected is not currently available.</p>
        <Link to="/restaurants" className="button">
          Explore menu
        </Link>
      </div>
    )
  }

  const restaurant = getRestaurantById(food.restaurantId)
  const totalPrice = food.price * quantity + selectedAddOns.length * 1.5

  const handleAddOnToggle = (option) => {
    setSelectedAddOns((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    )
  }

  const handleAddToCart = () => {
    addItem(
      {
        id: food.id,
        name: food.name,
        price: food.price,
        image: food.image,
        restaurantName: restaurant?.name || 'Restaurant',
      },
      quantity,
    )

    navigate('/cart')
  }

  return (
    <div className="page-container container food-details-page">
      <div className="food-details-grid">
        <div className="food-image-panel card-surface">
          <img src={food.image} alt={food.name} />
        </div>

        <div className="food-details-panel">
          <span className="eyebrow">{food.category}</span>
          <h1>{food.name}</h1>
          <div className="meta-row">
            <span>★ {food.rating}</span>
            <span>{restaurant?.name}</span>
          </div>
          <p className="food-description">{food.description}</p>

          <div className="food-price-row">
            <strong>{formatPrice(totalPrice)}</strong>
            <div className="qty-picker">
              <button type="button" onClick={() => setQuantity((count) => Math.max(1, count - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((count) => count + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="option-group">
            <h3>Add-ons</h3>
            <div className="checkbox-list">
              {addOnOptions.map((option) => (
                <label key={option} className="check-option">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(option)}
                    onChange={() => handleAddOnToggle(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label htmlFor="instructions">Special instructions</label>
            <textarea
              id="instructions"
              value={specialInstructions}
              onChange={(event) => setSpecialInstructions(event.target.value)}
              placeholder="No peanuts, extra spicy, less onion..."
            />
          </div>

          <div className="food-action-row">
            <button type="button" className="button" onClick={handleAddToCart}>
              Add to cart
            </button>
            <Link to={restaurant ? `/restaurants/${restaurant.id}` : '/restaurants'} className="button button--secondary">
              Back to menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodDetailsPage
