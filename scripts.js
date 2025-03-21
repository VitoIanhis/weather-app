const apiKey = "a3c0649f5484efb61c917551f8274489"; // Coloque sua chave da API aqui

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const countryName = document.getElementById("country");
const temperature = document.getElementById("temperature");
const temperature2 = document.getElementById("temperature-2");
const weatherIcon = document.getElementById("weather-icon");
const humidity = document.getElementById("umidity");
const wind = document.getElementById("wind");
const errorMessage = document.getElementById("error-message");

const iconMap = {
  "01d": "sun.svg",
  "01n": "moon clouds.svg",
  "02d": "sun clouds.svg",
  "02n": "moon clouds.svg",
  "03d": "sun cloud.svg",
  "03n": "moon clouds.svg",
  "04d": "sun clouds.svg",
  "04n": "moon clouds.svg",
  "09d": "rain-2.svg",
  "09n": "rain-2.svg",
  "10d": "rain-2.svg",
  "10n": "rain-2.svg",
  "11d": "rain-2.svg",
  "11n": "rain-2.svg",
  "13d": "snow_day.png",
  "13n": "snow_night.png",
  "50d": "mist_day.png",
  "50n": "mist_night.png",
};

const fetchWeather = async (city) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      throw new Error("Cidade não encontrada");
    }

    cityName.textContent = data.name;
    countryName.textContent = `${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    temperature2.textContent = `${Math.round(data.main.temp)}°`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.innerHTML = `${Math.round(
      data.wind.speed
    )} <span class="speed">km/h</span>`;

    const iconCode = data.weather[0].icon;

    weatherIcon.src = `/images/${iconMap[iconCode] || "default.png"}`;

    errorMessage.classList.add("hide");
  } catch (error) {
    errorMessage.classList.remove("hide");
    console.error("Erro ao buscar clima:", error);
  }
};

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});

fetchWeather("São Paulo");
