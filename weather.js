var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.search-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const cityInput = document.querySelector('.city-input').value;
        await fetchWeather(cityInput);
    });
});

async function fetchWeather(city) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        console.error(error.message);
        alert('Error: ' + error.message);
    }
}

function updateWeatherInfo(data) {
    document.querySelector('.city').textContent = `${data.name}, ${data.sys.country}`;
    document.querySelector('.temp').textContent = `${data.main.temp}°C`;
    document.querySelector('.description-text').textContent = data.weather[0].description;
    document.querySelector('.wind-speed').textContent = `${data.wind.speed} m/s`;
    document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
    document.querySelector('.visibility-distance').textContent = `${data.visibility / 1000} km`;

    // Optionally, you can update the date as well
    const date = new Date();
    document.querySelector('.date').textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    const weatherIconName = getWeatherIconName(data.weather[0].main);
    document.querySelector('.material-icons').innerHTML = `<i class="material-icons">${weatherIconName}</i>`
}
function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "cloud",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "blur_on",
        Smoke: "smoking_rooms",
        Haze: "wb_cloudy",
        Fog: "cloud_queue",
    };
    return iconMap[weatherCondition] || "help_outline";
}
