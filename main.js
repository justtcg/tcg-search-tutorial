// --- CONSTANTS & CONFIGURATION ---
// ⚠️ For demo purposes only. Never expose your API key in client-side code in production!
// In a real application, this key should be on a server and loaded from an environment variable.
const API_KEY = 'YOUR_API_KEY_HERE';
const API_BASE_URL = 'https://api.justtcg.com/v1';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Let's create a helper to build the URL  
  const queryUrl = buildQueryUrl();
  if (!queryUrl) return; // Don't search if there's no query  
  try {
    const response = await fetch(queryUrl, {
      headers: { 'x-api-key': API_KEY }
    });
    const data = await response.json();
    renderResults(data.data);
  } catch (error) {
    console.error("Failed to fetch cards:", error);
  }
});
function buildQueryUrl() {
  const params = new URLSearchParams();

  if (searchInput.value) {
    params.append('q', searchInput.value);
  } else {
    return null;
  }

  const game = document.getElementById('game-filter').value;
  if (game) {
    params.append('game', game);
  }

  // Example for a set input (you would add this to your HTML)  
  // const set = document.getElementById('set-filter').value;  
  // if (set) {  
  //     params.append('set', set);  
  // }  
  // Example for multiple conditions from checkboxes  
  // const conditions = [];  
  // document.querySelectorAll('input[name="condition"]:checked').forEach(checkbox => {  
  //     conditions.push(checkbox.value);  
  // });  
  // if (conditions.length > 0) {  
  //     params.append('condition', conditions.join(','));  
  // }  

  return `${API_BASE_URL}/cards?${params.toString()}`;
}
function renderResults(cards) {
  resultsContainer.innerHTML = '';
  if (!cards || cards.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }
  // We'll build this out more later  
  resultsContainer.innerHTML = `<pre>${JSON.stringify(cards, null, 2)}</pre>`;
}