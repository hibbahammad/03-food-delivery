# Foodie — Food Delivery Website

Foodie is a polished food delivery storefront built with React, Vite, and React Router. It includes restaurant browsing, search, cart management, checkout, order tracking, and a demo auth flow powered by localStorage.

## Features

- Responsive home page and landing experience
- Restaurant listing with category and filter controls
- Restaurant detail pages and food detail pages
- Functional catalog search for restaurants, dishes, and categories
- Real frontend cart state with local persistence
- Checkout flow with demo order creation and local order storage
- Orders and order detail pages
- Demo login and registration screens with localStorage-based session handling
- Profile page with editable user details and saved addresses

## Technologies

- React
- Vite
- React Router DOM
- JavaScript
- CSS Modules-style custom CSS
- LocalStorage for demo persistence

## Screenshots

Add screenshots here when the app is running locally.

## Folder structure

- src/components — shared UI parts such as header, footer, cards, and layout
- src/context — cart and auth providers
- src/data — mock restaurants, foods, categories, and initial orders
- src/pages — route-level pages
- src/services — mock API layer
- src/utils — formatting and storage helpers

## Installation

npm install

## Run locally

npm run dev

## Production build

npm run build

## Deployment

This frontend is ready to be deployed to any static hosting provider such as Vercel, Netlify, or GitHub Pages.

## Future backend integration

The app uses a mock service layer in src/services/api.js so a real backend can later be plugged in without changing the UI logic.
