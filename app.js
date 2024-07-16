const API_KEY = "445ce7a15f4d4a2ebf8110239241906";

async function getWeatherData(city) {
    try {
        const URL = `http://api.weatherapi.com/v1/forecast.json?q=${city}&key=${API_KEY}`
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
    this.cIcon = (current.condition.icon).substring(2);
    this.cHumidity = current.humidity;
    this.cTemp = current.temp_c;
    this.cFeelsLike = current.feelslike_c;

    // forecast (average)
    this.fWeather = forecast.forecastday[0].day.condition.text;
    this.fIcon = (forecast.forecastday[0].day.condition.icon).substring(2);
    this.fHumidity = forecast.forecastday[0].day.avghumidity;
    this.fTemp = forecast.forecastday[0].day.avgtemp_c;

    // forecast (7 days)
    this.day1Weather = sevenDaysForecast[0].condition.text;
    this.day1Icon = (sevenDaysForecast[0].condition.icon).substring(2);
    this.day2Weather = sevenDaysForecast[1].condition.text;
    this.day2Icon = (sevenDaysForecast[1].condition.icon).substring(2);
    this.day3Weather = sevenDaysForecast[2].condition.text;
    this.day3Icon = (sevenDaysForecast[2].condition.icon).substring(2);
    this.day4Weather = sevenDaysForecast[3].condition.text;
    this.day4Icon = (sevenDaysForecast[3].condition.icon).substring(2);
    this.day5Weather = sevenDaysForecast[4].condition.text;
    this.day5Icon = (sevenDaysForecast[4].condition.icon).substring(2);
    this.day6Weather = sevenDaysForecast[5].condition.text;
    this.day6Icon = (sevenDaysForecast[5].condition.icon).substring(2);
    this.day7Weather = sevenDaysForecast[6].condition.text;
    this.day7Icon = (sevenDaysForecast[6].condition.icon).substring(2);
    this.day8Weather = sevenDaysForecast[6].condition.text;
    this.day8Icon = (sevenDaysForecast[6].condition.icon).substring(2);
}

function displayData(obj) {
    // current
    document.querySelector('.curr-weather').textContent = obj.cWeather;
    document.querySelector('.curr-icon').src = `https://${obj.cIcon}`;
    document.querySelector('.curr-tmp').textContent = obj.cTemp, '°c';
    document.querySelector('.curr-feels-like').textContent = obj.cFeelsLike, '°c';
    document.querySelector('.curr-humidity').textContent = obj.cHumidity;

    // forecast
    document.querySelector('.for-weather').textContent = obj.fWeather;
    document.querySelector('.for-icon').src = `https://${obj.fIcon}`;
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
    document.querySelector('.icon1').src = `https://${obj.day1Icon}`;
    document.querySelector('.weather2').textContent = obj.day2Weather;
    document.querySelector('.icon2').src = `https://${obj.day2Icon}`;
    document.querySelector('.weather3').textContent = obj.day3Weather;
    document.querySelector('.icon3').src = `https://${obj.day3Icon}`;
    document.querySelector('.weather4').textContent = obj.day4Weather;
    document.querySelector('.icon4').src = `https://${obj.day4Icon}`;
    document.querySelector('.weather5').textContent = obj.day5Weather;
    document.querySelector('.icon5').src = `https://${obj.day5Icon}`;
    document.querySelector('.weather6').textContent = obj.day6Weather;
    document.querySelector('.icon6').src = `https://${obj.day6Icon}`;
    document.querySelector('.weather7').textContent = obj.day7Weather;
    document.querySelector('.icon7').src = `https://${obj.day7Icon}`;
    document.querySelector('.weather8').textContent = obj.day8Weather;
    document.querySelector('.icon8').src = `https://${obj.day8Icon}`;
}

DOM();