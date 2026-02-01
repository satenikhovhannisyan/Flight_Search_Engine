Flight Search Engine

A responsive flight search application built with React + Vite that allows users to search flights, apply complex filters, and visualize price trends in real time.
This project was developed as a take-home assignment to demonstrate frontend architecture, UI/UX decisions, and data handling.

#Features

Flight Search
Advanced Filtering
Live Price Graph
Responsive Design
Material UI (MUI)

#Tech Stack

React (Vite)
Material UI (MUI)
Recharts (price visualization)
Amadeus Self-Service API (Test environment)

#Architecture Highlights

Clear separation of concerns:
    components/ – reusable UI components
    hooks/ – custom hooks for data fetching & validation
    api/ – Amadeus API integration
    utils/ – helpers and validation rules

Controlled form with validation
Client-side filtering (no unnecessary refetching)
Responsive behavior handled via MUI breakpoints
Autocomplete optimized to avoid redundant API calls

#Setup & Run Locally

1. Clone the repository

git clone https://github.com/your-username/Flight_Search_Engine.git
cd Flight_Search_Engine

2. Install dependencies

npm install

3. Environment variables

Create a .env file in the root:

VITE_AMADEUS_API_KEY=your_api_key
VITE_AMADEUS_API_SECRET=your_api_secret

These are sandbox keys from Amadeus Test API.

4. Run the app

npm run dev


LIVE DEMO URL

https://flight-search-engine-smoky.vercel.app/
