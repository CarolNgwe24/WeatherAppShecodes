let apiKey = "1e1cb74ecefd5a7o05tdff4f07af3619";
let temperatureElement = document.querySelector("#temperature");
let currentTemperature = null;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  return days[date.getDay()];
}

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

function showForecast(response) {
  let forecastDays = response.data.daily;
  forecastDays.forEach(function (forecastDay, index) {
      let forecastIcon = document.querySelector(`#icon-${index}`);
      forecastIcon.setAttribute("src", forecastDay.condition.icon_url);
      forecastIcon.setAttribute("alt", forecastDay.condition.description);

      document.querySelector(`#temp-max-${index}`).innerHTML = `${Math.round(
        forecastDay.temperature.maximum
      )}°`;
      document.querySelector(`#temp-min-${index}`).innerHTML = `${Math.round(
        forecastDay.temperature.minimum
      )}°`;
    }
  });
}

function searchCity(city) {
  let apiKeyUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiKeyUrl).then(showWeather);

  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(showForecast);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Cape Town");

