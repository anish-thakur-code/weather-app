const button = document.getElementById("btn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const icon = document.getElementById("weatherIcon");

const API_KEY = "e7c8c2c97fa34732b09115243261601";

function getWeather() {
  const city = cityInput.value.trim();

  if (!city) {
    result.innerHTML = `
      <div class="search-icon">⚠️</div>
      <p>Please enter a city name</p>
    `;
    return;
  }

  result.innerHTML = `
    <div class="search-icon">⏳</div>
    <p>Fetching weather...</p>
  `;

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
      city
    )}&aqi=yes`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        result.innerHTML = `
          <div class="search-icon">🔍</div>
          <p><strong>City "${city}" not found</strong></p>
          <span>Try: New York, London, Tokyo, Paris</span>
        `;
        return;
      }

      const conditionText = data.current.condition.text;
      const condition = conditionText.toLowerCase();

      if (condition.includes("rain")) icon.textContent = "🌧️";
      else if (condition.includes("cloud")) icon.textContent = "☁️";
      else if (condition.includes("sun") || condition.includes("clear"))
        icon.textContent = "☀️";
      else icon.textContent = "🌤️";

      result.innerHTML = `
        <p><strong>${data.location.name}, ${data.location.country}</strong></p>
        <p>🌡 Temperature: ${data.current.temp_c} °C</p>
        <p>🌥 Condition: ${conditionText}</p>
        <p>💧 Humidity: ${data.current.humidity}%</p>
      `;
    })
    .catch(() => {
      result.innerHTML = `
        <div class="search-icon">❌</div>
        <p>Network error. Please try again.</p>
      `;
    });
}

button.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});
