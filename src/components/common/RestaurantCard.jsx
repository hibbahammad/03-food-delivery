import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatters'

function RestaurantCard({ restaurant }) {
  return (
    <article className="restaurant-card card-surface">
      <Link to={`/restaurants/${restaurant.id}`} className="image-link" aria-label={`View ${restaurant.name}`}>
        <img src={restaurant.image} alt={restaurant.name} />
      </Link>
      <div className="restaurant-card__content">
        <div className="restaurant-card__row">
          <div>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.cuisine}</p>
          </div>
          <span className="rating-badge">★ {restaurant.rating}</span>
        </div>

        <div className="meta-row">
          <span>{restaurant.deliveryTime}</span>
          <span>{restaurant.location}</span>
          <span>{restaurant.deliveryFee === 0 ? 'Free delivery' : `${formatPrice(restaurant.deliveryFee)}`}</span>
        </div>

        <div className="restaurant-card__footer">
          <span className="price-tier">{restaurant.priceLevel}</span>
          <Link to={`/restaurants/${restaurant.id}`} className="button button--secondary small-button">
            View Menu
          </Link>
        </div>
      </div>
    </article>
  )
}

export default RestaurantCard
