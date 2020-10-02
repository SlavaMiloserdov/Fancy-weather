import {TOKENS, COUNTRIES} from './constants';

export async function getCurrentLocation() {
    const url = `https://ipinfo.io/json?token=${TOKENS.ipinfo}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export function setLocation(location) {
    const weatherLocation = document.querySelector('.weather__location');
    weatherLocation.textContent = `${location.city}, ${COUNTRIES[location.country]}`;
}

export async function getLocationFromCity(city) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${TOKENS.opencage}&pretty=1&language=en`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    return data.results[0];
}