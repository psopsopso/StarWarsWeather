const API_KEY = "64310a2f0569d366e28b97b318b7bd50";

const images = {
    Kamino: "kamino.png",
    Endor: "endor1.jpg",
    Hoth: "hoth.jpg",
    Naboo: "naboo1.jpg",
    Coruscant: "coruscant-night.jpg",
    Scariff: "Scariff.jpg",
    Tattoine: "tatooine.jpg",
    Bespin: "bespin.jpg",
    Kashyyk: "kashyyyk.jpg",
};

const cityTempDiv = document.querySelector("#city-temp");
const feelsLikeDiv = document.querySelector("#feels-like");
const swPlanet = document.querySelector("#sw-planet");
const bgContainer = document.querySelector(".bg-container");

const getUserPosition = navigator.geolocation.getCurrentPosition((position) => {
    getUserWeather(position.coords.latitude, position.coords.longitude);
});

const getUserWeather = async (lat, lon) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    renderWeather(data);
};

function renderWeather(data) {
    const city = data.name;
    const temp = Math.round(data.main.temp);
    const weather = data.weather[0].main;
    const planet = getPlanet(temp, weather);

    cityTempDiv.style.color = "white";
    cityTempDiv.innerText = `${city}, ${temp}°C, ${weather}`;
    feelsLikeDiv.style.display = "block";
    swPlanet.style.display = "inline-block";
    swPlanet.innerText = `${planet}`;
    bgContainer.style.backgroundImage = `url("./images/${images[planet]}")`;
}

const getPlanet = (temp, weather) => {
    let planet;
    if (weather === "Rain" || weather === "Thunderstorm") {
        planet = "Kamino";
    } else if (weather === "Mist" || weather === "Fog") {
        planet = "Endor";
    } else {
        if (temp <= 1.66) {
            planet = "Hoth";
        } else if (temp <= 12.78) {
            planet = "Naboo";
        } else if (temp <= 18.33) {
            planet = "Coruscant";
        } else if (temp <= 22.22) {
            planet = "Scariff";
        } else if (temp <= 25.56) {
            planet = "Tattoine";
        } else if (temp <= 32.22) {
            planet = "Bespin";
        } else {
            planet = "Kashyyk";
        }
    }
    return planet;
};
