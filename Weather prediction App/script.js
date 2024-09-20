document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '67c7428b09d142ff5b1e6472b2a9f0aa';

    // Initialize the map centered on India
    const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India with zoom level 5

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(map);

    function fetchWeatherByLocation(lat, lon, city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            updateStatsSection(city, data);
            addMarkerToMap(lat, lon, city, data);
        })
        .catch(error => {
            console.error('Error fetching data from OpenWeatherMap API:', error);
        });
    }

    function addMarkerToMap(lat, lon, city, data) {
        map.setView([lat, lon], 10); // Zoom in on the selected location
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${city}</b><br>Temp: ${data.main.temp}°C<br>Humidity: ${data.main.humidity}%<br>Wind Speed: ${data.wind.speed} m/s`)
            .openPopup();
    }

    function updateStatsSection(city, data) {
        document.getElementById('current-temperature').innerText = `${data.main.temp}°C current temperature`;
        document.getElementById('location').innerText = `Location: ${city}`;
        document.getElementById('temperature').innerText = `${data.main.temp}°C`;
        document.getElementById('humidity').innerText = `${data.main.humidity}%`;
        document.getElementById('wind-speed').innerText = `${data.wind.speed} m/s`;
        document.getElementById('pressure').innerText = `${data.main.pressure} hPa`;
    }

    window.fetchAndDisplayWeather = function(lat, lon, city) {
        fetchWeatherByLocation(lat, lon, city);
    };

    function fetchCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetchWeatherByLocation(lat, lon, 'Your Location');
            }, function(error) {
                console.error('Error getting location:', error);
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }
/* Navbar Scroll Effect JavaScript */
window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) { /* Add 'scrolled' class when scrolling down */
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

    window.fetchCurrentLocation = fetchCurrentLocation;

    fetchCurrentLocation();

    window.addEventListener("scroll", function() {
        var navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});
