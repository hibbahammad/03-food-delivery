import { categories } from '../data/categories'
import foods from '../data/foods'
import { demoOrders } from '../data/orders'
import restaurants from '../data/restaurants'
import { readStorage, writeStorage } from '../utils/formatters'

const normalizeQuery = (value = '') => value.trim().toLowerCase()

export const getRestaurants = () => [...restaurants]

export const getFoods = () => [...foods]

export const getCategories = () => [...categories]

export const getRestaurantById = (restaurantId) =>
  restaurants.find((restaurant) => restaurant.id === restaurantId) || null

export const getFoodById = (foodId) => foods.find((food) => food.id === foodId) || null

export const getRestaurantFoods = (restaurantId) =>
  foods.filter((food) => food.restaurantId === restaurantId)

export const searchCatalog = (query = '') => {
  const trimmed = normalizeQuery(query)

  if (!trimmed) {
    return { restaurants: [...restaurants], foods: [...foods] }
  }

  return {
    restaurants: restaurants.filter((restaurant) => {
      const searchable = [
        restaurant.name,
        restaurant.category,
        restaurant.cuisine,
        restaurant.location,
        ...(restaurant.categories || []),
      ]
        .join(' ')
        .toLowerCase()
      return searchable.includes(trimmed)
    }),
    foods: foods.filter((food) => {
      const searchable = [food.name, food.category, food.description, ...(food.tags || [])]
        .join(' ')
        .toLowerCase()
      return searchable.includes(trimmed)
    }),
  }
}

export const getOrders = () => readStorage('food-delivery-orders', demoOrders)

export const saveOrder = (order) => {
  const currentOrders = getOrders()
  const nextOrder = { ...order, date: order.date || new Date().toISOString() }
  const savedOrders = [nextOrder, ...currentOrders]
  writeStorage('food-delivery-orders', savedOrders)
  return nextOrder
}
