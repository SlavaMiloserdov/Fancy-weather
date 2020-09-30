export default function renderMain() {
    const mainHTML = `<main class=main>
        <div class=weather>
            <p class=weather__location></p>
            <p class=weather__date></p>
            <div class=weather__today>
                <p class=temperature-today></p>
                <img class=weather__icon>
                <div class=weather__description></div>                
            </div>            
            <div class=weather__forecast>   
                <div class=forecast>
                    <p class=forecast__day></p>
                    <p class=forecast__temperature>
                </div>    
                <div class=forecast>
                    <p class=forecast__day></p>
                    <p class=forecast__temperature>
                </div>    
                <div class=forecast>
                    <p class=forecast__day></p>
                    <p class=forecast__temperature>
                </div>    
            </div>            
        </div>
        <div class=map>

        </div>
    </main>`;
    document.body.insertAdjacentHTML('beforeend', mainHTML);
}