let now = new Date();
let update = document.querySelector("#updated");
let hours = now.getHours();
if (hours < 10) {
  hours = `0 ${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0 ${minutes}`;
}
update.innerHTML = `${hours} : ${minutes}`;
let calender = document.querySelector("#newDate");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let dates = now.getDate();
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let second = document.querySelector("#newDate");
second.innerHTML = `${day} , ${dates} ${month}`;

function displayWeatherCondition(response) {
  console.log(response);

  document.querySelector("#chooseCity").innerHTML = response.data.name;
  celTempreture = response.data.main.temp;
  document.querySelector("#display").innerHTML = Math.round(celTempreture);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "96b2b5e5443c7e65bbc05aacca3fdf89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "96b2b5e5443c7e65bbc05aacca3fdf89";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function changefahr(event) {
  event.preventDefault();
  fahrlink.classList.add("active");
  cellink.classList.remove("active");
  let ftemp = (celTempreture * 9) / 5 + 32;
  let temElement = document.querySelector("#display");
  temElement.innerHTML = Math.round(ftemp);
}

function changecel(event) {
  event.preventDefault();
  let temElement = document.querySelector("#display");
  temElement.innerHTML = Math.round(celTempreture);
}
let celTempreture = null;
let searchForm = document.querySelector("#forcastOne");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrlink = document.querySelector("#flink");
fahrlink.addEventListener("click", changefahr);

let cellink = document.querySelector("#clink");
cellink.addEventListener("click", changecel);
