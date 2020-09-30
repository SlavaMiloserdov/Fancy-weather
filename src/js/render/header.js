export default function renderHeader() {
    const headerHTML = `<header class=header>
    <div class=buttons>
        <button class='button button_refresh-bg'><img src='./img/spinner.png'></button>
        <select class='button button_select-language'>
	    <option value=en>En</option>
	    <option value=ru>Ru</option>
	    <option value=be>Be</option>
        </select>
        <div class=units>
            <button class='button button_fahrenheit'>°F</button>
            <button class='button button_celsius'>°С</button>
        </div>
    </div>
    <form class=search>
        <input type=text class='form_input'>
        <button class='button form_button'>Search</button>
    </form>
    </header>`;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}