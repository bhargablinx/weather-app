const API_KEY = "445ce7a15f4d4a2ebf8110239241906";

async function getWeatherData(city) {
    try {
        const URL = `http://api.weatherapi.com/v1/forecast.json?q=${city}&key=${API_KEY}`
        let response = await fetch(URL);
        response = await response.json();
        let current = response.current;
        let forecast = response.forecast;
        let sevenDaysForecast = (forecast.forecastday[0].hour).slice(0, 7);
        console.log(sevenDaysForecast);
        let data = new getData(current, forecast, sevenDaysForecast);
        console.log(data);
        // displayData(data);
    } catch (err) {
        alert("Something went wrong, please enter valid input", err);
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
}

function displayData(obj) {
    console.log('Current Temperature is ', obj.cTemp, '°c');
    console.log('Current Weather Status: ', obj.cWeather);
    console.log('Present Humidity is ', obj.cHumidity);
    console.log('It Feels like', obj.cFeelsLike, '°c');
    console.log('Tomorrow the weather may be: ', obj.fWeather);
    console.log('Tomorrow the humidity may be', obj.fHumidity);
    console.log('Tomorrow average temperature may be', obj.fTemp, '°c');
}