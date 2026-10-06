import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import RestaurantCard from '../components/common/RestaurantCard'
import SectionHeader from '../components/common/SectionHeader'
import { categories } from '../data/categories'
import { getRestaurants } from '../services/api'

const priceOptions = {
  all: 'All prices',
  $: 'Budget',
  $$: 'Mid-range',
  $$$: 'Premium',
}

function RestaurantsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const restaurants = getRestaurants()

  const query = searchParams.get('q') || ''
  const selectedCategory = searchParams.get('category') || 'all'
  const selectedRating = Number(searchParams.get('rating') || 0)
  const selectedPrice = searchParams.get('price') || 'all'
  const sortBy = searchParams.get('sort') || 'popular'

  const updateFilter = (key, value) => {
    const nextParams = Object.fromEntries(searchParams.entries())

    if (!value || value === 'all') {
      delete nextParams[key]
    } else {
      nextParams[key] = value
    }

    setSearchParams(nextParams)
  }

  const filteredRestaurants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const filtered = restaurants.filter((restaurant) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          restaurant.name,
          restaurant.category,
          restaurant.cuisine,
          restaurant.location,
          ...(restaurant.categories || []),
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      const matchesCategory =
        selectedCategory === 'all' ||
        restaurant.categories?.includes(selectedCategory) ||
        restaurant.category.toLowerCase() === selectedCategory.toLowerCase()

      const matchesRating = restaurant.rating >= selectedRating
      const matchesPrice =
        selectedPrice === 'all' ||
        (selectedPrice === '$' && restaurant.priceLevel === '$') ||
        (selectedPrice === '$$' && restaurant.priceLevel === '$$') ||
        (selectedPrice === '$$$' && restaurant.priceLevel === '$$$')

      return matchesQuery && matchesCategory && matchesRating && matchesPrice
    })

    return filtered.sort((a, b) => {
      if (sortBy === 'delivery') return a.deliveryTime.localeCompare(b.deliveryTime)
      if (sortBy === 'rating') return b.rating - a.rating
      return b.rating - a.rating
    })
  }, [query, restaurants, selectedCategory, selectedRating, selectedPrice, sortBy])

  return (
    <div className="page-container restaurants-page container">
      <SectionHeader
        eyebrow="Discover"
        title="Restaurants near you"
        description="Search by favorite cuisines, budget, and top-rated picks."
      />

      <div className="filters-panel card-surface">
        <div className="filter-row">
          <label className="text-field">
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => updateFilter('q', event.target.value)}
              placeholder="Try pizza or burgers"
            />
          </label>

          <label className="select-field">
            <span>Sort</span>
            <select value={sortBy} onChange={(event) => updateFilter('sort', event.target.value)}>
              <option value="popular">Popular</option>
              <option value="rating">Highest rating</option>
              <option value="delivery">Fastest delivery</option>
            </select>
          </label>

          <label className="select-field">
            <span>Rating</span>
            <select value={selectedRating} onChange={(event) => updateFilter('rating', event.target.value)}>
              <option value="0">All ratings</option>
              <option value="4.5">4.5+</option>
              <option value="4.7">4.7+</option>
              <option value="4.8">4.8+</option>
            </select>
          </label>

          <label className="select-field">
            <span>Price</span>
            <select value={selectedPrice} onChange={(event) => updateFilter('price', event.target.value)}>
              {Object.entries(priceOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="category-filter-list">
          <button
            type="button"
            className={selectedCategory === 'all' ? 'filter-pill active' : 'filter-pill'}
            onClick={() => updateFilter('category', 'all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={selectedCategory === category.id ? 'filter-pill active' : 'filter-pill'}
              onClick={() => updateFilter('category', category.id)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {filteredRestaurants.length ? (
        <div className="restaurant-grid list-grid">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="empty-state card-surface">
          <h3>No restaurants match your filters</h3>
          <p>Try a different category or clear the search filters to explore more choices.</p>
          <Link to="/restaurants" className="button">
            Clear filters
          </Link>
        </div>
      )}
    </div>
  )
}

export default RestaurantsPage
