import { TOKENS } from './constants';

export async function getCurrentLocation(language) {
    if (language === 'be') {
        // eslint-disable-next-line no-param-reassign
        language = 'ru';
    }
    const url = `http://ip-api.com/json?lang=${language}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
}

export function setLocation(location) {
    const weatherLocation = document.querySelector('.weather__location');
    weatherLocation.textContent = `${location.city}, ${location.country}`;
}

export async function getLocationFromCity(city, language = 'en') {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${TOKENS.opencage}&pretty=1&language=${language}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results[0];
}