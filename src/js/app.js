import renderHeader from './render/header';
import renderMain from './render/main';
// import TOKENS from './constants';
import {getCurrentLocation, setLocation} from './location';
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






