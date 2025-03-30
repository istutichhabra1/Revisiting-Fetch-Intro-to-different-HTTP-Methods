const API_URL = "https://fakestoreapi.com/products";
const CATEGORY_API = "https://fakestoreapi.com/products/categories";
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const productContainer = document.getElementById("productContainer");
const productCount = document.getElementById("productCount");
let allProducts = []; // Store all products globally
// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        productContainer.innerHTML = "<p>Failed to fetch products. Please try again later.</p>";
    }
}
// Fetch categories from API and populate dropdown
async function fetchCategories() {
    try {
        const response = await fetch(CATEGORY_API);
        const categories = await response.json();
        categories.forEach(category => {
            let option = document.createElement("option");
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryFilter.appendChild(option);
        });
    } catch (error) {
        console.error("Failed to fetch categories.");
    }
}
// Display products dynamically
function displayProducts(products) {
    productContainer.innerHTML = "";
    productCount.textContent = `Showing ${products.length} products`;
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
// Search products by title
searchInput.addEventListener("input", () => {
    filterProducts();
});
// Filter products by category
categoryFilter.addEventListener("change", () => {
    filterProducts();
});
// Sort products by price
sortFilter.addEventListener("change", () => {
    filterProducts();
});
// Filtering function
function filterProducts() {
    let filteredProducts = allProducts;
    // Search by title
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
    }
    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }
    // Sort by price
    if (sortFilter.value === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortFilter.value === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    displayProducts(filteredProducts);
}
// View product details alert
function viewDetails(title, price) {
    alert(`Product: ${title}\nPrice: $${price}`);
}
// Initialize the app
fetchProducts();
fetchCategories();
