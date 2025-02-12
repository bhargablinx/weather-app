const API_KEY = "445ce7a15f4d4a2ebf8110239241906";

async function getWeatherData(city) {
    try {
        const URL = `https://api.weatherapi.com/v1/forecast.json?q=${city}&key=${API_KEY}`; // Changed to HTTPS
        let response = await fetch(URL);
        response = await response.json();
        let current = response.current;
        let forecast = response.forecast;
        let sevenDaysForecast = (forecast.forecastday[0].hour).slice(0, 7);
        let data = new getData(current, forecast, sevenDaysForecast);
        displayData(data);
    } catch (err) {
        alert("Something went wrong, please enter valid input", err);
        document.querySelector('.data-field').textContent = 'Try Again';
    }
}

function getData(current, forecast, sevenDaysForecast) {
    // Current
    this.cWeather = current.condition.text;
    this.cIcon = `https:${current.condition.icon}`;
    this.cHumidity = current.humidity;
    this.cTemp = current.temp_c;
    this.cFeelsLike = current.feelslike_c;

    // forecast (average)
    this.fWeather = forecast.forecastday[0].day.condition.text;
    this.fIcon = `https:${forecast.forecastday[0].day.condition.icon}`; // Ensure HTTPS
    this.fHumidity = forecast.forecastday[0].day.avghumidity;
    this.fTemp = forecast.forecastday[0].day.avgtemp_c;

    // forecast (7 days)
    this.day1Weather = sevenDaysForecast[0].condition.text;
    this.day1Icon = `https:${sevenDaysForecast[0].condition.icon}`; // Ensure HTTPS
    this.day2Weather = sevenDaysForecast[1].condition.text;
    this.day2Icon = `https:${sevenDaysForecast[1].condition.icon}`; // Ensure HTTPS
    this.day3Weather = sevenDaysForecast[2].condition.text;
    this.day3Icon = `https:${sevenDaysForecast[2].condition.icon}`; // Ensure HTTPS
    this.day4Weather = sevenDaysForecast[3].condition.text;
    this.day4Icon = `https:${sevenDaysForecast[3].condition.icon}`; // Ensure HTTPS
    this.day5Weather = sevenDaysForecast[4].condition.text;
    this.day5Icon = `https:${sevenDaysForecast[4].condition.icon}`; // Ensure HTTPS
    this.day6Weather = sevenDaysForecast[5].condition.text;
    this.day6Icon = `https:${sevenDaysForecast[5].condition.icon}`; // Ensure HTTPS
    this.day7Weather = sevenDaysForecast[6].condition.text;
    this.day7Icon = `https:${sevenDaysForecast[6].condition.icon}`; // Ensure HTTPS
    this.day8Weather = sevenDaysForecast[6].condition.text;
    this.day8Icon = `https:${sevenDaysForecast[6].condition.icon}`; // Ensure HTTPS
}

function displayData(obj) {
    // current
    document.querySelector('.curr-weather').textContent = obj.cWeather;
    document.querySelector('.curr-icon').src = obj.cIcon;
    document.querySelector('.curr-tmp').textContent = obj.cTemp, '°c';
    document.querySelector('.curr-feels-like').textContent = obj.cFeelsLike, '°c';
    document.querySelector('.curr-humidity').textContent = obj.cHumidity;

    // forecast
    document.querySelector('.for-weather').textContent = obj.fWeather;
    document.querySelector('.for-icon').src = obj.fIcon;
    document.querySelector('.for-tmp').textContent = obj.fTemp, '°c';
    document.querySelector('.for-humidity').textContent = obj.fHumidity;

    // data for 8 days
    showDataFor8Days(obj);
}

function DOM() {
    document.querySelector('.show8data').addEventListener('click', () => {
        document.querySelector('.seven-days').style.display = 'block';
    });

    document.querySelector('#searchBtn').addEventListener('click', () => {
        const location = document.querySelector('.location').value;
        document.querySelector('.client-location').textContent = location.toUpperCase();
        console.log(location);
        getWeatherData(location);
        document.querySelector('.location').value = '';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const city = prompt('Enter you current city name: ');
    document.querySelector('.client-location').textContent = city.toUpperCase();
    getWeatherData(city);
})

function showDataFor8Days(obj) {
    document.querySelector('.weather1').textContent = obj.day1Weather;
    document.querySelector('.icon1').src = obj.day1Icon;
    document.querySelector('.weather2').textContent = obj.day2Weather;
    document.querySelector('.icon2').src = obj.day2Icon;
    document.querySelector('.weather3').textContent = obj.day3Weather;
    document.querySelector('.icon3').src = obj.day3Icon;
    document.querySelector('.weather4').textContent = obj.day4Weather;
    document.querySelector('.icon4').src = obj.day4Icon;
    document.querySelector('.weather5').textContent = obj.day5Weather;
    document.querySelector('.icon5').src = obj.day5Icon;
    document.querySelector('.weather6').textContent = obj.day6Weather;
    document.querySelector('.icon6').src = obj.day6Icon;
    document.querySelector('.weather7').textContent = obj.day7Weather;
    document.querySelector('.icon7').src = obj.day7Icon;
    document.querySelector('.weather8').textContent = obj.day8Weather;
    document.querySelector('.icon8').src = obj.day8Icon;
}

DOM();