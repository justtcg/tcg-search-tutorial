### From Zero to Search: Build a Live TCG Card Finder with the JustTCG API

#### Tired of clunky, bloated data APIs? Let’s build something better. In the next 10 minutes, you’ll create a lightning-fast TCG search tool with just a few lines of vanilla JavaScript, powered by the JustTCG API.

![](./images/title.png)

We’re going to build a simple but powerful search bar that can find any card — from a broad search for “Pikachu” to a hyper-specific query for a “1st Edition Holofoil Base Set Charizard.” The best part? No backend, no complex libraries. Just pure, fast, dedicated TCG data when you need it.

Let’s dive in.

### Prerequisites

To follow along, you’ll just need a couple of things:

-   A **free JustTCG API Key**. You can grab one from your [JustTCG Dashboard](https://justtcg.com/dashboard).
-   A code editor like VS Code.
-   Basic knowledge of HTML and JavaScript.

### Part 1: Setting the Stage — The HTML Structure

First, let’s create our search interface. We’ll keep the HTML and CSS simple and clean. Create a file named `index.html` and another named `style.css`.

![](./images/card-search-screenshot.png)

**index.html**
```html
<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>JustTCG Search</title>  
    <link rel="stylesheet" href="style.css">  
</head>  
<body>  
    <div class="container">  
        <h1>JustTCG Card Search</h1>  
        <form id="search-form">  
            <input type="text" id="search-input" placeholder="Enter card name (e.g., Charizard)">  
            <select id="game-filter">  
                <option value="">All Games</option>  
                <option value="pokemon">Pokémon</option>  
                <option value="disney-lorcana">Lorcana</option>  
                <option value="magic-the-gathering">Magic: The Gathering</option>  
                </select>  
            <button type="submit">Search</button>  
        </form>  
        <div id="results-container" class="results-grid">  
            </div>  
    </div>  
    <script src="main.js"></script>  
</body>  
</html>
```
**style.css**
```css
/* Add your clean, modern CSS here, consistent with our brand style */  
body { font-family: sans-serif; background-color: #f4f7f9; }  
.container { max-width: 800px; margin: 2rem auto; padding: 1rem; }  
/* ... etc. ... */
```
This gives us a basic but functional interface to work with. Now for the fun part.

----------

### Part 2: The Foundational Query — Searching by Name

Let’s start by making our first API call. Create a file named `main.js`. Inside, we'll write a function to search for cards based on the text input.

Our base endpoint for searching cards is `/v1/cards`. We can pass it a `q` parameter for our keyword search.

In `main.js`, add the following code. Don't forget to **replace** `**'YOUR_API_KEY_HERE'**` **with your actual API key**.

**`main.js`** **(Initial Version)**
```javascript
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
    const query = searchInput.value;  
    if (!query) return;  
    const url = `${API_BASE_URL}/cards?q=${encodeURIComponent(query)}`;  
    try {  
        const response = await fetch(url, {  
            headers: { 'x-api-key': API_KEY }  
        });  
        const data = await response.json();  
        renderResults(data.data);  
    } catch (error) {  
        console.error("Failed to fetch cards:", error);  
    }  
});  
function renderResults(cards) {  
    resultsContainer.innerHTML = '';  
    if (!cards || cards.length === 0) {  
        resultsContainer.innerHTML = '<p>No results found.</p>';  
        return;  
    }  
    // We'll build this out more later  
    resultsContainer.innerHTML = `<pre>${JSON.stringify(cards, null, 2)}</pre>`;  
}
```
Open `index.html` in your browser, type "Charizard" in the search box, and hit enter. You should see an array of Charizard card data!

![](./images/results-screenshot.png)

### ⚠️Heads Up: A Quick Note on API Key Security⚠️

> *The method we’re using here — making a `fetch` request directly from a client-side JavaScript file—is perfect for learning and quick demos. However, you should **never use this method in a production application.**
> Why? Because it exposes your `API_KEY` to anyone who views the page's source code. In a real-world project, you should always make API calls from a secure server-side backend (like a Node.js/Express server or a serverless function). Your API key should be stored safely as an **environment variable** on that server, not written in the code. Your front-end application would then call your backend, which in turn securely calls the JustTCG API.
> For this tutorial, we’ll keep it simple and client-side, but always keep security in mind for your live projects!*

----------

### Part 3: The Refined Query — Layering on Filters

A keyword search is good, but real power comes from filtering. Let’s update our code to use the “Game” dropdown. We’ll build a dynamic query string that adds parameters only if they have a value.

We’ll replace our event listener logic with a more robust function.

**`main.js`** **(Updated `submit` handler)**
```javascript
// ... (keep constants and element references the same)  
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
        return null; // A keyword is required for this tutorial  
    }  
      
    const game = document.getElementById('game-filter').value;  
    if (game) {  
        params.append('game', game);  
    }  
      
    return `${API_BASE_URL}/cards?${params.toString()}`;  
}  
// ... (keep renderResults the same for now)
```
Now, if you search for “Charizard” and select “Pokémon” from the dropdown, the generated URL will be `/v1/cards?q=charizard&game=pokemon`. This is how you start to add precision. You can apply this same logic for `set`, `condition`, and more.

![](./images/requests-screenshot.png)

----------

### Part 4: The Power Query — Advanced Filtering for Collectors

What if you need to find a card in either Near Mint (NM) or Lightly Played (LP) condition? Our API makes this easy. You can pass a comma-separated list to parameters like `condition`.

Let’s also add the concept of **URL encoding**. Set names like “Base Set” have a space, which needs to be encoded in a URL to `Base%20Set`. Using `URLSearchParams` (as we did above) or `encodeURIComponent()` handles this automatically and is a crucial best practice.

Let’s build out our final, powerful query builder.

**`main.js`** **(Final `buildQueryUrl` function)**
```javascript
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
```
With this logic, you can easily construct a “Power Query” like this: `/v1/cards?q=charizard&game=pokemon&set=Base%20Set&condition=NM,LP&printing=1st%20Edition%20Holofoil`

This gives you the exact data you need, with no bloat.

### Your Search is Just the Beginning

Congratulations! You’ve just built a fully functional, multi-filter TCG search tool. You’ve seen how to go from a simple keyword search to a precise, powerful query with just a few lines of code.

**Next Steps:**

-   **Build a proper UI:** Update the `renderResults` function to create nice-looking result cards instead of just printing JSON.
-   **Add Pagination:** Use the `_metadata` object in our API response to build "Next" and "Previous" page buttons.
-   **Link to Marketplaces:** Use the `tcgplayerId` from the card data to construct direct links to TCGplayer.

The full, final code for this tutorial is available on our [GitHub](https://github.com/justtcg/tcg-search-tutorial).

Happy building!