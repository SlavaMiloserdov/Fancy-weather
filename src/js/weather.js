import {TOKENS, DAYS_OF_WEEK} from './constants';

export async function getWeather(city, country, units='S', language) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&days=4&units=${units}&lang=${language}&key=${TOKENS.weatherbit}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    return data;
}

export function setWeather(weatherObj) {
    const temperatureTodayEl = document.querySelector('.temperature-today');
    const weatherTodayDescriptionEl = document.querySelector('.weather__description');
    const arrayOfForecastEl = document.querySelectorAll('.forecast');

    document.querySelector('.weather__icon').src = `../img/icons/${weatherObj.data[0].weather.icon}.png`;
    temperatureTodayEl.textContent = `${weatherObj.data[0].max_temp}°`;
    weatherTodayDescriptionEl.insertAdjacentHTML('beforeend', `<p>${weatherObj.data[0].weather.description.toUpperCase()}</p>
    <p>FEELS LIKE: ${weatherObj.data[0].max_temp}</p> 
    <p>WIND: ${Math.round(weatherObj.data[0].wind_spd)} M/S</p>
    <p>HUMIDITY: ${Math.round(weatherObj.data[0].rh)}%</p>`);

    arrayOfForecastEl.forEach((forecastEl, index) => {
        forecastEl.querySelector('.forecast__temperature').textContent = `${Math.round(weatherObj.data[index + 1].max_temp)}°`;
        forecastEl.insertAdjacentHTML('beforeend', `<img src='../img/icons/${weatherObj.data[index + 1].weather.icon}.png'
         class=forecast__icon>`);
    });
}