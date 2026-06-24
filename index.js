let apiKey = "1e1cb74ecefd5a7o05tdff4f07af3619";
let temperatureElement = document.querySelector("#temperature");
let currentTemperature = null;

function showWeather(response) {
  currentTemperature = response.data.temperature.current;

  document.querySelector("#city-display").innerHTML = response.data.city;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  temperatureElement.innerHTML = Math.round(currentTemperature);
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
}

function searchCity(city) {
  let apiKeyUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiKeyUrl).then(showWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function celsiusTemperature(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round(currentTemperature);
}

function fahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = (currentTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitTemperature);

searchCity("Cape Town");
