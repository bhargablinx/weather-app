const API_KEY = "445ce7a15f4d4a2ebf8110239241906";
const searchBtn = document.querySelector(".search");
const weatherHolder = document.querySelector(".weather");
const tempHolder = document.querySelector(".temp");
const humidityHolder = document.querySelector(".humidity");

searchBtn.addEventListener('click', (e) => {
    const city = document.querySelector(".city-name-holder").value;
    console.log(city);
    getWeatherData(city);
    e.preventDefault();
})

async function getWeatherData(city) {
    try {
        const URL = `http://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`
        let response = await fetch(URL);
        response = await response.json();
        let mainObj = response.current;
        weatherHolder.textContent = `Weather: ${mainObj.condition.text}`;
        tempHolder.textContent = `${mainObj.temp_c} °C`;
        humidityHolder.textContent = mainObj.humidity;
    } catch (err) {
        alert("Something went wrong, please enter valid input", err);
    }
}