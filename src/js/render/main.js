export default function renderMain() {
    const mainHTML = `<main>
        <div class=weather>
            <p class=weather__location></p>
            <p class=weather__date></p>
        </div>
        <div class=map>

        </div>
    </main>`;
    document.body.insertAdjacentHTML('beforeend', mainHTML);
}