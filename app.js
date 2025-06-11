const API_KEY = "445ce7a15f4d4a2ebf8110239241906";

async function getWeatherData(city) {
    document.querySelector(".loading-screen").style.display = "flex"; // Show loading
    try {
        const URL = `https://api.weatherapi.com/v1/forecast.json?q=${city}&key=${API_KEY}`;
        let response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Location not found");
        }

        response = await response.json();

        let current = response.current;
        let forecast = response.forecast;
        let sevenDaysForecast = forecast.forecastday[0].hour.slice(0, 7);
        let data = new getData(current, forecast, sevenDaysForecast);
        displayData(data);
    } catch (err) {
        console.log("Error:", err);
        document.querySelector(
            ".data-field"
        ).innerHTML = `<p style="color:red; font-weight:bold;">❌ Location not found. Please try again.</p>`;
        document.querySelector(".seven-days").style.display = "none";
    } finally {
        document.querySelector(".loading-screen").style.display = "none"; // Hide loading
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
    document.querySelector(".curr-weather").textContent = obj.cWeather;
    document.querySelector(".curr-icon").src = obj.cIcon;
    (document.querySelector(".curr-tmp").textContent = obj.cTemp), "°c";
    (document.querySelector(".curr-feels-like").textContent = obj.cFeelsLike),
        "°c";
    document.querySelector(".curr-humidity").textContent = obj.cHumidity;

    // forecast
    document.querySelector(".for-weather").textContent = obj.fWeather;
    document.querySelector(".for-icon").src = obj.fIcon;
    (document.querySelector(".for-tmp").textContent = obj.fTemp), "°c";
    document.querySelector(".for-humidity").textContent = obj.fHumidity;

    // data for 8 days
    showDataFor8Days(obj);
}

function DOM() {
    document.querySelector(".show8data").addEventListener("click", () => {
        document.querySelector(".seven-days").style.display = "block";
    });

    document.querySelector("#searchBtn").addEventListener("click", () => {
        const location = document.querySelector(".location").value.trim();

        if (location === "") return;

        document.querySelector(".client-location").textContent =
            location.toUpperCase();
        getWeatherData(location);
        document.querySelector(".location").value = "";
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const coords = await getLongAndLat();
        document.querySelector(".client-location").textContent =
            "Your Location";
        await getWeatherData(coords);
    } catch (err) {
        document.querySelector(".data-field").textContent =
            "Location access denied.";
    } finally {
        document.querySelector(".loading-screen").style.display = "none";
    }
});

function showDataFor8Days(obj) {
    document.querySelector(".weather1").textContent = obj.day1Weather;
    document.querySelector(".icon1").src = obj.day1Icon;
    document.querySelector(".weather2").textContent = obj.day2Weather;
    document.querySelector(".icon2").src = obj.day2Icon;
    document.querySelector(".weather3").textContent = obj.day3Weather;
    document.querySelector(".icon3").src = obj.day3Icon;
    document.querySelector(".weather4").textContent = obj.day4Weather;
    document.querySelector(".icon4").src = obj.day4Icon;
    document.querySelector(".weather5").textContent = obj.day5Weather;
    document.querySelector(".icon5").src = obj.day5Icon;
    document.querySelector(".weather6").textContent = obj.day6Weather;
    document.querySelector(".icon6").src = obj.day6Icon;
    document.querySelector(".weather7").textContent = obj.day7Weather;
    document.querySelector(".icon7").src = obj.day7Icon;
    document.querySelector(".weather8").textContent = obj.day8Weather;
    document.querySelector(".icon8").src = obj.day8Icon;
}

DOM();

function getLongAndLat() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                resolve(`${latitude},${longitude}`);
            },
            (error) => {
                console.error("Error getting location:", error.message);
                reject(error);
            }
        );
    });
}

const locationInput = document.querySelector(".location");
const suggestionsBox = document.querySelector(".suggestions");

locationInput.addEventListener("input", async () => {
    const query = locationInput.value.trim();

    if (query.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    const endpoint = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${query}`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (data.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }

        suggestionsBox.innerHTML = "";
        data.forEach((place) => {
            const li = document.createElement("li");
            li.textContent = `${place.name}, ${place.region}, ${place.country}`;
            li.addEventListener("click", () => {
                locationInput.value = `${place.name}, ${place.region}, ${place.country}`;
                suggestionsBox.style.display = "none";
                triggerSearch();
            });
            suggestionsBox.appendChild(li);
        });
        suggestionsBox.style.display = "block";
    } catch (err) {
        console.error("Suggestion fetch error:", err);
        suggestionsBox.style.display = "none";
    }
});

function triggerSearch() {
    const location = locationInput.value.trim();
    if (!location) return;

    document.querySelector(".client-location").textContent =
        location.toUpperCase();
    getWeatherData(location);
    locationInput.value = "";
    suggestionsBox.style.display = "none";
}

document.querySelector("#searchBtn").addEventListener("click", triggerSearch);

locationInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        triggerSearch();
    }
});

const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    // Optional: toggle icon between moon and sun
    if (body.classList.contains("dark-mode")) {
        toggleBtn.classList.remove("fa-moon");
        toggleBtn.classList.add("fa-sun");
    } else {
        toggleBtn.classList.remove("fa-sun");
        toggleBtn.classList.add("fa-moon");
    }
});
