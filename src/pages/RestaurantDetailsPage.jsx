import { Link, useParams } from 'react-router-dom'
import FoodCard from '../components/common/FoodCard'
import { useCart } from '../context/CartContext'
import { getRestaurantById, getRestaurantFoods } from '../services/api'
import { formatPrice } from '../utils/formatters'

function RestaurantDetailsPage() {
  const { id } = useParams()
  const { addItem } = useCart()
  const restaurant = getRestaurantById(id)

  if (!restaurant) {
    return (
      <div className="page-container container empty-state card-surface">
        <h3>Restaurant not found</h3>
        <p>The place you are looking for is not available right now.</p>
        <Link to="/restaurants" className="button">
          Browse restaurants
        </Link>
      </div>
    )
  }

  const menu = getRestaurantFoods(restaurant.id)

  return (
    <div className="page-container restaurant-page">
      <div className="restaurant-hero">
        <img src={restaurant.coverImage} alt={restaurant.name} />
      </div>

      <div className="container restaurant-detail-shell">
        <div className="restaurant-summary card-surface">
          <div className="restaurant-summary__info">
            <div className="restaurant-summary__image-wrap">
              <img src={restaurant.image} alt={restaurant.name} />
            </div>

            <div>
              <span className="eyebrow">{restaurant.category}</span>
              <h1>{restaurant.name}</h1>
              <p>{restaurant.description}</p>
              <div className="meta-row">
                <span>★ {restaurant.rating}</span>
                <span>{restaurant.deliveryTime}</span>
                <span>{restaurant.location}</span>
                <span>{restaurant.deliveryFee === 0 ? 'Free delivery' : formatPrice(restaurant.deliveryFee)}</span>
              </div>
            </div>
          </div>

          <div className="summary-box">
            <div>
              <span>Minimum order</span>
              <strong>{formatPrice(restaurant.minOrder)}</strong>
            </div>
            <div>
              <span>Delivery</span>
              <strong>{restaurant.deliveryTime}</strong>
            </div>
          </div>
        </div>

        <section className="restaurant-section">
          <div className="section-header">
            <h2>Popular menu</h2>
          </div>

          <div className="food-grid">
            {menu.map((food) => (
              <FoodCard key={food.id} food={food} onAddToCart={(item) => addItem(item, 1)} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default RestaurantDetailsPage
