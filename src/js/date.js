export default function setDate(lang='en-EN', timeZone) {
    const dateEl = document.querySelector('.weather__date');
    const options = { weekday: 'short', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    options.timeZone = timeZone;
    setInterval(() => {
        const newDate = new Date();
        dateEl.textContent = newDate.toLocaleString(lang, options);
    }, 1000);
}