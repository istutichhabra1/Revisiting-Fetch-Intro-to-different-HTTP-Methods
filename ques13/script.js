const API_URL = "https://fakestoreapi.com/products"; // API Endpoint
const productContainer = document.getElementById("product-container");
const errorMessage = document.getElementById("error-message");
// Function to fetch products
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch products. Please try again later.");
        }
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}
// Function to display products
function displayProducts(products) {
    productContainer.innerHTML = ""; // Clear container before rendering
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="viewDetails('${product.title}', '${product.price}')">View Details</button>
        `;
        productContainer.appendChild(productDiv);
    });
}
// Function to show details (For demonstration, it just alerts)
function viewDetails(title, price) {
    alert(`Product: ${title}\nPrice: $${price}`);
}
// Fetch products on page load
fetchProducts();
