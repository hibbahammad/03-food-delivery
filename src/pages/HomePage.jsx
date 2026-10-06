import { Link } from 'react-router-dom'
import FoodCard from '../components/common/FoodCard'
import RestaurantCard from '../components/common/RestaurantCard'
import SectionHeader from '../components/common/SectionHeader'
import { useCart } from '../context/CartContext'
import { categories } from '../data/categories'
import { getFoods, getRestaurants } from '../services/api'

function HomePage() {
  const restaurants = getRestaurants()
  const foods = getFoods()
  const { addItem } = useCart()

  return (
    <div className="page-container home-page">
      <section className="hero-section container">
        <div className="hero-copy">
          <span className="eyebrow">Fast delivery in 25 minutes</span>
          <h1>Craving the best bite in town?</h1>
          <p>
            Explore handpicked restaurants, sizzling meals, and neighborhood favorites delivered right to your door.
          </p>
          <div className="hero-actions">
            <Link to="/restaurants" className="button">
              Order now
            </Link>
            <Link to="/search?q=burgers" className="button button--secondary">
              Discover deals
            </Link>
          </div>
          <div className="stats-row">
            <div>
              <strong>12k+</strong>
              <span>happy users</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>average rating</span>
            </div>
            <div>
              <strong>150+</strong>
              <span>food partners</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card--main card-surface">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
              alt="Freshly prepared meal"
            />
            <div className="floating-badge">
              <span>Restaurant of the day</span>
              <strong>Bistro Bloom</strong>
            </div>
          </div>
          <div className="hero-card hero-card--mini card-surface">
            <span>Delivery</span>
            <strong>22 min</strong>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeader eyebrow="Browse by taste" title="Popular categories" />
        <div className="category-grid">
          {categories.map((category) => (
            <Link to={`/search?q=${category.name}`} key={category.id} className="category-card card-surface">
              <span className="category-icon">{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHeader eyebrow="Local favorites" title="Popular restaurants" description="Handpicked spots loved by your neighborhood." />
        <div className="restaurant-grid">
          {restaurants.slice(0, 4).map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <section className="promo-banner container">
        <div className="promo-copy">
          <span className="eyebrow">Weekend deals</span>
          <h2>Free delivery for orders over $25</h2>
          <p>Fresh meals, weekly specials, and easy ordering from your favorite spots.</p>
        </div>
        <Link to="/restaurants" className="button button--secondary">
          Explore offers
        </Link>
      </section>

      <section className="section container">
        <SectionHeader eyebrow="Best sellers" title="Popular foods" description="Satisfying favorites from top-rated kitchens." />
        <div className="food-grid">
          {foods.slice(0, 4).map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={(item) => addItem(item, 1)} />
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHeader eyebrow="For you" title="Recommended restaurants" description="Fresh picks based on your latest cravings." />
        <div className="restaurant-grid">
          {restaurants.slice(2, 6).map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <section className="app-promo container">
        <div className="app-promo__content">
          <span className="eyebrow">Download the app</span>
          <h2>Order ahead and save more.</h2>
          <p>Get curated deals, track your order live, and order from the best local spots in seconds.</p>
          <div className="app-promo__badges">
            <span>App Store</span>
            <span>Google Play</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
