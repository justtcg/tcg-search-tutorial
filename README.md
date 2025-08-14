# JustTCG API: TCG Search Tutorial

![Tutorial - Basic Search Bar](./images/title.png)

This repository contains the source code for the blog post, **"From Zero to Search: Build a Live TCG Card Finder with the JustTCG API"**.

It demonstrates how to use the JustTCG API to build a powerful, client-side search interface using only vanilla HTML, CSS, and JavaScript.

**➡️ Read the full tutorial here: [Link to Blog Post](https://justtcg.com/blog/from-zero-to-search-build-a-live-tcg-card-finder-with-the-justtcg-api)**

-----

### Features Demonstrated

  * **Keyword Search**: Find cards across multiple TCGs with a simple query.
  * **Dynamic Filtering**: Refine search results by game, set, condition, and printing.
  * **Multi-Value Parameters**: How to search for multiple conditions at once (e.g., `condition=NM,LP`).
  * **Best Practices**: Proper handling of URL encoding for query parameters.

-----

### Getting Started

To get this project running on your local machine, follow these simple steps.

#### Prerequisites

You'll need a free API key from JustTCG.

  * **[Sign up for your free key at justtcg.com](https://justtcg.com/dashboard)**

#### Installation & Configuration

1.  Clone this repository to your local machine:
    ```bash
    git clone https://github.com/JustTCG/tcg-search-tutorial.git
    ```
2.  Navigate into the project directory:
    ```bash
    cd tcg-search-tutorial
    ```
3.  Open the `main.js` file in your code editor.
4.  Find the line `const API_KEY = 'YOUR_API_KEY_HERE';` and replace `'YOUR_API_KEY_HERE'` with your actual JustTCG API key.

#### Running the App

Simply open the `index.html` file in your web browser. That's it\! You can now start searching for cards.

-----

### ⚠️ Security Notice

This project makes API calls directly from client-side JavaScript **for demonstration purposes only**.

This is **not a secure practice for production applications** because it exposes your API key to anyone viewing the browser's source code. In a real-world application, you should proxy your API requests through a secure backend server where your API key can be stored safely as an environment variable.

-----

### About JustTCG

JustTCG is the **dedicated, simple, and reliable pricing API for Trading Card Games**, built by collectors for developers. We provide accurate, lightning-fast data, specializing exclusively in TCGs to eliminate bloat and irrelevant information.

  * 🔗 **Website:** [justtcg.com](https://justtcg.com)
  * 📚 **API Documentation:** [docs.justtcg.com](https://justtcg.com/docs)

-----

### License

This project is licensed under the MIT License. See the `LICENSE` file for details.