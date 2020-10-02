import renderHeader from './render/header';
import renderMain from './render/main';
// import TOKENS from './constants';
import {getCurrentLocation, getLocationFromCity, setLocation} from './location';
import setDate from './date';
import {getWeather, setWeather} from './weather';
import renderMap from './map';

renderHeader();
renderMain();

const currentLocation = getCurrentLocation();
let currentLanguage;
let currentTimeZone;

currentLocation.then(location => {
    setLocation(location);
    currentTimeZone = location.timezone;
    setDate(currentLanguage, currentTimeZone);
    getWeather(location.city, location.country, 'M', 'en').then(weather => {
        setWeather(weather);
    });
    renderMap(location.loc.split(','));
});


const searchForm = document.querySelector('.search');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchFormInput = document.querySelector('.form_input');
    const newLocation = getLocationFromCity(searchFormInput.value);
    let newCity;
    let newCountry;
    newLocation.then((data)=> {
        // console.log(data);
        newCity = data.components.city;
        newCountry = data.components.country;
        setLocation({
            city: newCity,
            country: data.components.country_code.toUpperCase()
        });
        setDate('en-EN', `${data.annotations.timezone.name}`);
        getWeather(newCity, newCountry, 'M', 'en').then(weather => {            
            setWeather(weather);
        });
        renderMap([data.geometry.lat, data.geometry.lng]);
    });
});





