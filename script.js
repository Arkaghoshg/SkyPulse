const apiKey = 'ENTER YOUR API KEY'; // Replace with your Weatherstack API key

document.getElementById('searchBtn').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    const locationName = document.getElementById('locationName');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');

    if (data.error) {
        locationName.textContent = 'Error fetching weather data';
        temperature.textContent = '';
        conditions.textContent = '';
        return;
    }

    locationName.textContent = `${data.location.name}, ${data.location.country}`;
    temperature.textContent = `Temperature: ${data.current.temperature}°C`;
    conditions.textContent = `Conditions: ${data.current.weather_descriptions[0]}`;
}

// Optionally, fetch weather data based on user's current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${lat},${lon}`)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
}
