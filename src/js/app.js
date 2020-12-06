import renderHeader from './render/header';
import renderMain from './render/main';
import { TOKENS } from './constants';
import { getCurrentLocation, getLocationFromCity, setLocation } from './location';
import setDate from './date';
import { getWeather, setWeather } from './weather';
import renderMap from './map';

renderHeader();
renderMain();

const currentLocation = getCurrentLocation();
let currentLanguage;
let currentLanguageForDate;
let currentTimeZone;
let newLocation;
if (!localStorage.getItem('currentUnits')) {
    localStorage.setItem('currentUnits', 'M');
}
let currentUnits = localStorage.getItem('currentUnits');
const searchFormInput = document.querySelector('.form_input');
if (!localStorage.getItem('currentLanguage')) {
    currentLanguage = 'en';
    currentLanguageForDate = 'en-EN';
    localStorage.setItem('currentLanguage', currentLanguage);
    localStorage.setItem('currentLanguageForDate', currentLanguageForDate);
} else {
    currentLanguage = localStorage.getItem('currentLanguage');
    currentLanguageForDate = localStorage.getItem('currentLanguageForDate');
}

console.log(currentLanguage, currentLanguageForDate);

function updateInfoForCurrentLocation(currLocation) {
    currLocation.then(location => {
        setLocation(location);
        currentTimeZone = location.timezone;
        setDate(currentLanguageForDate, currentTimeZone);
        getWeather(location.city, location.country, currentUnits, currentLanguage).then(weather => {
            setWeather(weather);
        });
        renderMap(location.loc.split(','));
    });
}

updateInfoForCurrentLocation(currentLocation);


const searchForm = document.querySelector('.search');

function updateInfoForNewLocation(location) {
    let newCity;
    let newCountry;
    location.then((data) => {
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
                country: data.components.country_code.toUpperCase()
            });
            //! setDate('en-EN', `${data.annotations.timezone.name}`);
            setDate(currentLanguageForDate, `${data.annotations.timezone.name}`);
            getWeather(newCity, newCountry, currentUnits, currentLanguage).then(weather => {
                setWeather(weather);
            });
            if (!data.geometry.lat || !data.geometry.lng) {
                throw new Error('Отсутствуют данные о местоположении');
            }
            renderMap([data.geometry.lat, data.geometry.lng]);
        } catch (error) {
            alert(error);
            searchFormInput.value = '';
        }
    });
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    newLocation = getLocationFromCity(searchFormInput.value);
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
        document.body.style.backgroundImage = `url(${urlForBackgroundPicture})`;
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
    console.dir(event.target.selectedIndex);
    switch (event.target.selectedIndex) {
        case 1:
            currentLanguage = 'ru';
            currentLanguageForDate = 'ru-RU';
            localStorage.setItem('currentLanguage', currentLanguage);
            localStorage.setItem('currentLanguageForDate', currentLanguageForDate);
            break;
        case 2:
            currentLanguage = 'be';
            currentLanguageForDate = 'be-BE';
            localStorage.setItem('currentLanguage', currentLanguage);
            localStorage.setItem('currentLanguageForDate', currentLanguageForDate);
            break;
        default:
            currentLanguage = 'en';
            currentLanguageForDate = 'en-EN';
            localStorage.setItem('currentLanguage', currentLanguage);
            localStorage.setItem('currentLanguageForDate', currentLanguageForDate);
            break;
    }
}

document.querySelector('.button_fahrenheit').addEventListener('click', changeCurrentUnits);
document.querySelector('.button_celsius').addEventListener('click', changeCurrentUnits);
document.body.style.backgroundImage = `url(img/bg-default.png)`;
changeBackgroundPicture();
document.querySelector('.button_refresh-bg').addEventListener('click', changeBackgroundPicture);
document.querySelector('.button_select-language').addEventListener('change', event => updateCurrentLanguage(event));

