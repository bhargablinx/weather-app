const API_KEY = "445ce7a15f4d4a2ebf8110239241906";

async function getWeatherData(city) {
    try {
        const URL = `http://api.weatherapi.com/v1/forecast.json?q=${city}&key=${API_KEY}`
        let response = await fetch(URL);
        response = await response.json();
        let current = response.current;
        let forecast = response.forecast;
        let data = new getData(current, forecast);
        displayData(data);
    } catch (err) {
        alert("Something went wrong, please enter valid input", err);
    }
}

function getData(current, forecast) {
    this.cWeather = current.condition.text;
    this.cIcon = (current.condition.icon).substring(2);
    this.cHumidity = current.humidity;
    this.cTemp = current.temp_c;
    this.cFeelsLike = current.feelslike_c;
    this.fWeather = forecast.forecastday[0].day.condition.text;
    this.fIcon = (forecast.forecastday[0].day.condition.icon).substring(2);
    this.fHumidity = forecast.forecastday[0].day.avghumidity;
    this.fTemp = forecast.forecastday[0].day.avgtemp_c;
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