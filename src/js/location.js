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
