import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatters'

function FoodCard({ food, onAddToCart }) {
  return (
    <article className="food-card card-surface">
      <Link to={`/food/${food.id}`} className="image-link" aria-label={`View ${food.name}`}>
        <img src={food.image} alt={food.name} />
      </Link>
      <div className="food-card__content">
        <div className="food-card__top">
          <span className="rating-badge">★ {food.rating}</span>
          <span className="pill">{food.category}</span>
        </div>

        <h3>{food.name}</h3>
        <p>{food.description}</p>

        <div className="food-card__footer">
          <span className="food-price">{formatPrice(food.price)}</span>
          <div className="food-card__actions">
            <Link to={`/food/${food.id}`} className="button button--ghost small-button">
              Details
            </Link>
            <button type="button" className="button small-button" onClick={() => onAddToCart(food)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default FoodCard
