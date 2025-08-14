// main.js

// 1. --- CONSTANTS & CONFIGURATION ---
// Store your API key and the base API endpoint URL here.
const API_KEY = 'YOUR_API_KEY_HERE'; // Remind user to replace this
const API_BASE_URL = 'https://api.justtcg.com/v1';

// 2. --- DOM ELEMENT REFERENCES ---
// Get references to all the interactive elements from the HTML.
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const gameFilter = document.getElementById('game-filter');
// ... other filter elements
const resultsContainer = document.getElementById('results-container');

// 3. --- EVENT LISTENERS ---
// The primary entry point for our application logic.
searchForm.addEventListener('submit', handleSearchSubmit);

// 4. --- CORE FUNCTIONS ---

/**
 * Handles the form submission event.
 * @param {Event} event The form submission event.
 */
async function handleSearchSubmit(event) {
  event.preventDefault(); // Prevents the page from reloading
  // Logic to show a loading state...
  
  const queryUrl = buildQueryUrl();
  
  try {
    const cards = await fetchCards(queryUrl);
    renderResults(cards);
  } catch (error) {
    renderError(error.message);
  }
  
  // Logic to hide loading state...
}

/**
 * Constructs the final API query URL based on form inputs.
 * @returns {string} The complete, encoded URL for the API request.
 */
function buildQueryUrl() {
  const params = new URLSearchParams();
  
  // Add query from text input
  if (searchInput.value) {
    params.append('q', searchInput.value);
  }
  
  // Add game from dropdown
  if (gameFilter.value) {
    params.append('game', gameFilter.value);
  }

  // ... logic to build the rest of the query string ...
  
  return `${API_BASE_URL}/cards?${params.toString()}`;
}

/**
 * Fetches card data from the JustTCG API.
 * @param {string} url The API endpoint to fetch from.
 * @returns {Promise<Array>} A promise that resolves to an array of card objects.
 */
async function fetchCards(url) {
    const response = await fetch(url, {
        headers: {
            'x-api-key': API_KEY
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unknown error occurred.');
    }

    const data = await response.json();
    return data.data; // Return the array of cards from the response
}


/**
 * Renders the card results to the DOM.
 * @param {Array} cards An array of card objects.
 */
function renderResults(cards) {
  resultsContainer.innerHTML = ''; // Clear previous results

  if (!cards || cards.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }
  
  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    // ... logic to create and append the card HTML ...
    resultsContainer.appendChild(cardElement);
  });
}

/**
 * Renders an error message to the DOM.
 * @param {string} message The error message to display.
 */
function renderError(message) {
  resultsContainer.innerHTML = ''; // Clear previous results
  resultsContainer.innerHTML = `<p class="error">Error: ${message}</p>`;
}
