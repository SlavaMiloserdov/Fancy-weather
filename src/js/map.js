let myMap;
let script;

function converter(value) {
    return `${Math.floor(value)}°${Math.round((value - Math.floor(value)) * 60)}'`;
}

function init(ymaps, coords, lang) {
    myMap = new ymaps.Map("map", {
        center: coords,
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    });

    switch (lang) {
        case 'ru':
            document.querySelector('.coordinates_latitude').textContent = `Широта: ${converter(coords[0])}`;
            document.querySelector('.coordinates_longitude').textContent = `Долгота: ${converter(coords[1])}`;
            break;
        case 'be':
            document.querySelector('.coordinates_latitude').textContent = `Шырата: ${converter(coords[0])}`;
            document.querySelector('.coordinates_longitude').textContent = `Даўгата: ${converter(coords[1])}`;
            break;
        default:
            document.querySelector('.coordinates_latitude').textContent = `Latitude: ${converter(coords[0])}`;
            document.querySelector('.coordinates_longitude').textContent = `Longitude: ${converter(coords[1])}`;
            break;
    }

}

export default function renderMap(coords, lang) {
    const head = document.getElementsByTagName('head')[0];
    const select = document.querySelector('.button_select-language');
    select.createMap = function () {
        const language = this.value;
        if (myMap) {
            myMap.destroy();
        }
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://api-maps.yandex.ru/2.1/?onload=init_${language}&lang=${language
            }_RU&ns=ymaps_${language}`;
        head.appendChild(script);
        window[`init_${language}`] = function () {
            init(window[`ymaps_${language}`], coords, lang);
        }
    };
    select.createMap();
};



