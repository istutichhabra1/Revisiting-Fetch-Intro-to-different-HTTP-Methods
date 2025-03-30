const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("city");
const weatherDisplay = document.getElementById("weather");
const API_KEY = "f368c1268283a09b9a33b358da795950";
// Event listener for form submission
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) {
        weatherDisplay.innerHTML = `<p class="error">Please enter a city name.</p>`;
        return;
    }
    fetchWeather(city);
});
// Function to fetch weather data
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found. Please enter a valid city name.");
        }
        const data = await response.json();
        // Extract necessary weather details
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;
        // Display weather details
        weatherDisplay.innerHTML = `
            <p><strong>City:</strong> ${cityName}</p>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Condition:</strong> ${description}</p>
        `;
    } catch (error) {
        weatherDisplay.innerHTML = `<p class="error">${error.message}</p>`;
    }
}
