import { TOKENS } from './constants';

export async function getWeather(city, country, units = 'S', language) {
    let url;
    if (country === 'Russia') {
        url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&days=4&units=${units}&lang=${language}&key=${TOKENS.weatherbit}`;
    } else {
        url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=4&units=${units}&lang=${language}&key=${TOKENS.weatherbit}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export function setWeather(weatherObj, language) {
    const temperatureTodayEl = document.querySelector('.temperature-today');
    const weatherTodayDescriptionEl = document.querySelector('.weather__description');
    const arrayOfForecastEl = document.querySelectorAll('.forecast');

    document.querySelector('.weather__icon').src = `../img/icons/${weatherObj.data[0].weather.icon}.png`;
    temperatureTodayEl.textContent = `${weatherObj.data[0].max_temp}°`;
    weatherTodayDescriptionEl.querySelector('.description__info').textContent = weatherObj.data[0].weather.description.toUpperCase();

    switch (language) {
        case 'en':
            weatherTodayDescriptionEl.querySelector('.description__feels-like').textContent = `FEELS LIKE: ${weatherObj.data[0].max_temp}`;
            weatherTodayDescriptionEl.querySelector('.description__wind').textContent = `WIND: ${Math.round(weatherObj.data[0].wind_spd)} M/S`;
            weatherTodayDescriptionEl.querySelector('.description__humidity').textContent = `HUMIDITY: ${Math.round(weatherObj.data[0].rh)}%`;
            break;
        default:
            weatherTodayDescriptionEl.querySelector('.description__feels-like').textContent = `Ощущается: ${weatherObj.data[0].max_temp}`;
            weatherTodayDescriptionEl.querySelector('.description__wind').textContent = `Ветер: ${Math.round(weatherObj.data[0].wind_spd)} M/S`;
            weatherTodayDescriptionEl.querySelector('.description__humidity').textContent = `Влажность: ${Math.round(weatherObj.data[0].rh)}%`;
            break;
    }


    arrayOfForecastEl.forEach((forecastEl, index) => {
        forecastEl.querySelector('.forecast__temperature').textContent = `${Math.round(weatherObj.data[index + 1].max_temp)}°`;
        forecastEl.insertAdjacentHTML('beforeend', `<img src='../img/icons/${weatherObj.data[index + 1].weather.icon}.png'
         class=forecast__icon>`);
    });
}