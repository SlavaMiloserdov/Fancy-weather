import renderHeader from './render/header';
import renderMain from './render/main';
// import TOKENS from './constants';
import {getCurrentLocation, setLocation} from './location';
import setDate from './date';

renderHeader();
renderMain();

const currentLocation = getCurrentLocation();
let currentLanguage;
let currentTimeZone;


currentLocation.then(location => {
    setLocation(location);
    // console.log(location);
    currentTimeZone = location.timezone;
    setDate(currentLanguage, currentTimeZone);
});




