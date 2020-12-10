import renderHeader from './render/header';
import renderMain from './render/main';
import { TOKENS } from './constants';
import { getCurrentLocation, getLocationFromCity, setLocation } from './location';
import setDate from './date';
import { getWeather, setWeather } from './weather';
import renderMap from './map';

renderHeader();
renderMain();

let currentLanguage;
let currentLanguageForDate;
let currentTimeZone;
let newLocation;
let currentUnits = localStorage.getItem('currentUnits');
const searchFormInput = document.querySelector('.form_input');

if (!localStorage.getItem('currentUnits')) {
    localStorage.setItem('currentUnits', 'M');
}

if (!localStorage.getItem('currentLanguage')) {
    currentLanguage = 'en';
    currentLanguageForDate = 'en-EN';
    Array.from(document.querySelectorAll('.button_select-language option'))[0].selected = true;
    localStorage.setItem('currentLanguage', currentLanguage);
} else {
    switch (localStorage.getItem('currentLanguage')) {
        case 'ru':
            currentLanguage = 'ru';
            currentLanguageForDate = 'ru-RU';
            Array.from(document.querySelectorAll('.button_select-language option'))[1].selected = true;
            break;
        case 'be':
            currentLanguage = 'be';
            currentLanguageForDate = 'be-BE';
            Array.from(document.querySelectorAll('.button_select-language option'))[2].selected = true;
            break;
        default:
            currentLanguage = 'en';
            currentLanguageForDate = 'en-EN';
            Array.from(document.querySelectorAll('.button_select-language option'))[0].selected = true;
            break;
    }
}


const currentLocation = getCurrentLocation(currentLanguage);



function updateInfoForCurrentLocation(currLocation) {
    currLocation.then(location => {
        setLocation(location);
        currentTimeZone = location.timezone;
        setDate(currentLanguageForDate, currentTimeZone, currentLanguage);
        getWeather(location.city, location.country, currentUnits, currentLanguage).then(weather => {
            setWeather(weather, currentLanguage);
        });
        renderMap([location.lat, location.lon], currentLanguage);
    });
}

updateInfoForCurrentLocation(currentLocation);

const searchForm = document.querySelector('.search');

function updateInfoForNewLocation(location) {
    let newCity;
    let newCountry;
    location.then(data => {
        try {
            if (!data) {
                throw new Error('По Вашему запросу ничего не найдено');
            }
            newCity = data.components.city;
            newCountry = data.components.country;
            if (!newCity || !newCountry) {
                throw new Error('Некорректный запрос');
            }
            setLocation({
                city: newCity,
                country: newCountry
            });
            setDate(currentLanguageForDate, `${data.annotations.timezone.name}`, currentLanguage);
            getWeather(newCity, newCountry, currentUnits, currentLanguage).then(weather => {
                setWeather(weather, currentLanguage);
            });
            if (!data.geometry.lat || !data.geometry.lng) {
                throw new Error('Отсутствуют данные о местоположении');
            }
            renderMap([data.geometry.lat, data.geometry.lng], currentLanguage);
        } catch (error) {
            alert(error);
            searchFormInput.value = '';
        }
    });
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newLocation = getLocationFromCity(searchFormInput.value, currentLanguage);
    updateInfoForNewLocation(newLocation);
});

async function changeBackgroundPicture() {
    let urlForBackgroundPicture;
    const currentDate = new Date();
    const keyWords = [];

    if (currentDate.getHours() < 12) {
        keyWords.push('morning');
    } else if (currentDate.getHours() < 18) {
        keyWords.push('day');
    } else {
        keyWords.push('evening');
    }
    const currentMonth = currentDate.getMonth();
    if (currentMonth < 2 || currentMonth > 10) {
        keyWords.push('winter');
    } else if (currentMonth < 5 && currentMonth > 1) {
        keyWords.push('spring');
    } else if (currentMonth < 8 && currentMonth > 4) {
        keyWords.push('summer');
    } else {
        keyWords.push('autumn');
    }
    keyWords.push();
    console.log(keyWords);

    try {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${keyWords[0]} ${keyWords[1]}&client_id=${TOKENS.unsplash}`;
        const res = await fetch(url);
        const data = await res.json().catch(err => {
            return new Error(err);
        });
        urlForBackgroundPicture = data.urls.full;
    }
    catch (error) {
        console.log(error);
        urlForBackgroundPicture = 'img/bg-default.png';
    }

    const image = document.createElement('img');
    image.src = `${urlForBackgroundPicture}`;
    image.onload = function () {
        // document.body.style.backgroundImage = `url(${urlForBackgroundPicture})`;
        document.body.style.background = `linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) center center / cover fixed, url(${urlForBackgroundPicture}) center center no-repeat fixed`;
        document.body.style.backgroundSize = 'cover';
    }
}


function updateCurrentUnitsButton() {
    if (localStorage.getItem('currentUnits') === 'I') {
        document.querySelector('.button_fahrenheit').classList.add('button_active');
        document.querySelector('.button_celsius').classList.remove('button_active');

    } else if (localStorage.getItem('currentUnits') === 'M') {
        document.querySelector('.button_celsius').classList.add('button_active');
        document.querySelector('.button_fahrenheit').classList.remove('button_active');
    }
}

function changeCurrentUnits() {
    if (localStorage.getItem('currentUnits') === 'M') {
        localStorage.setItem('currentUnits', 'I');
        currentUnits = 'I';
        updateCurrentUnitsButton();
    } else if (localStorage.getItem('currentUnits') === 'I') {
        localStorage.setItem('currentUnits', 'M');
        currentUnits = 'M';
        updateCurrentUnitsButton();
    }

    if (!newLocation) {
        updateInfoForCurrentLocation(currentLocation);
    } else {
        updateInfoForNewLocation(newLocation);
    }

}

updateCurrentUnitsButton();

function updateCurrentLanguage(event) {
    switch (event.target.selectedIndex) {
        case 1:
            currentLanguage = 'ru';
            currentLanguageForDate = 'ru-RU';
            localStorage.setItem('currentLanguage', currentLanguage);
            Array.from(document.querySelectorAll('.button_select-language option'))[1].selected = true;
            break;
        case 2:
            currentLanguage = 'be';
            currentLanguageForDate = 'be-BE';
            localStorage.setItem('currentLanguage', currentLanguage);
            Array.from(document.querySelectorAll('.button_select-language option'))[2].selected = true;
            break;
        default:
            currentLanguage = 'en';
            currentLanguageForDate = 'en-EN';
            localStorage.setItem('currentLanguage', currentLanguage);
            Array.from(document.querySelectorAll('.button_select-language option'))[0].selected = true;
            break;
    }

    if (!newLocation) {
        updateInfoForCurrentLocation(getCurrentLocation(currentLanguage));
    } else {
        updateInfoForNewLocation(getLocationFromCity(searchFormInput.value, currentLanguage));
    }
}

document.querySelector('.button_fahrenheit').addEventListener('click', changeCurrentUnits);
document.querySelector('.button_celsius').addEventListener('click', changeCurrentUnits);
document.body.style.backgroundImage = `url(img/bg-default.png)`;
changeBackgroundPicture();
document.querySelector('.button_refresh-bg').addEventListener('click', changeBackgroundPicture);
document.querySelector('.button_select-language').addEventListener('change', event => updateCurrentLanguage(event));

