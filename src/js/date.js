import {DAYS_OF_WEEK} from './constants';

let refreshIntervalId;

export default function setDate(lang='en-EN', timeZone) {
    clearInterval(refreshIntervalId);
    const dateEl = document.querySelector('.weather__date');
    const options = { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    options.timeZone = timeZone;    
    refreshIntervalId = setInterval(() => {
        const newDate = new Date();
        dateEl.textContent = newDate.toLocaleString(lang, options);
    }, 1000);

    const arrayOfForecastEl = document.querySelectorAll('.forecast');
    const currentDate = (new Date()).getDay();
    arrayOfForecastEl.forEach((forecastEl, index) => {
        forecastEl.querySelector('.forecast__day').textContent = DAYS_OF_WEEK[currentDate + index + 1] || DAYS_OF_WEEK[currentDate + index + 1 - DAYS_OF_WEEK.length];
    });
}

