const button = document.getElementById("btn");
const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const icon = document.getElementById("weatherIcon");

const API_KEY = "e7c8c2c97fa34732b09115243261601";

button.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    result.innerHTML = `
      <div class="search-icon">⚠️</div>
      <p>Please enter a city name</p>
    `;
    return;
  }

  fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
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

      const condition = data.current.condition.text.toLowerCase();

      // simple icon logic
      if (condition.includes("rain")) icon.textContent = "🌧️";
      else if (condition.includes("cloud")) icon.textContent = "☁️";
      else if (condition.includes("sun")) icon.textContent = "☀️";
      else icon.textContent = "🌤️";

      result.innerHTML = `
        <p><strong>${data.location.name}, ${data.location.country}</strong></p>
        <p>🌡 Temperature: ${data.current.temp_c} °C</p>
        <p>🌥 Condition: ${data.current.condition.text}</p>
        <p>💧 Humidity: ${data.current.humidity}%</p>
      `;
    })
    .catch(() => {
      result.innerHTML = `
        <div class="search-icon">❌</div>
        <p>Something went wrong</p>
      `;
    });
});
