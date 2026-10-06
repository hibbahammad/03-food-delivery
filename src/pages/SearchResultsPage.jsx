import { Link, useSearchParams } from 'react-router-dom'
import FoodCard from '../components/common/FoodCard'
import RestaurantCard from '../components/common/RestaurantCard'
import SectionHeader from '../components/common/SectionHeader'
import { useCart } from '../context/CartContext'
import { searchCatalog } from '../services/api'

function SearchResultsPage() {
  const { addItem } = useCart()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { restaurants, foods } = searchCatalog(query)

  return (
    <div className="page-container container search-page">
      <SectionHeader
        eyebrow="Search results"
        title={query ? `Results for “${query}”` : 'Browse all options'}
        description={`${restaurants.length + foods.length} matches found`}
      />

      {!query ? (
        <div className="empty-state card-surface">
          <h3>Search something delicious</h3>
          <p>Try a cuisine, dish, or restaurant name to discover options near you.</p>
          <Link to="/restaurants" className="button">
            Explore restaurants
          </Link>
        </div>
      ) : (
        <>
          <div className="search-results-group">
            <div className="search-results-header">
              <h3>Restaurants</h3>
              <span>{restaurants.length} results</span>
            </div>
            {restaurants.length ? (
              <div className="restaurant-grid">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="empty-state compact card-surface">
                <p>No restaurant results for this search.</p>
              </div>
            )}
          </div>

          <div className="search-results-group">
            <div className="search-results-header">
              <h3>Foods</h3>
              <span>{foods.length} results</span>
            </div>
            {foods.length ? (
              <div className="food-grid">
                {foods.map((food) => (
                  <FoodCard key={food.id} food={food} onAddToCart={(item) => addItem(item, 1)} />
                ))}
              </div>
            ) : (
              <div className="empty-state compact card-surface">
                <p>No food results for this search.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchResultsPage
