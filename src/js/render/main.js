export default function renderMain() {
    const mainHTML = `<main class=main>
        <div class=weather>
            <p class=weather__location></p>
            <p class=weather__date></p>
            <div class=weather__today>
                <p class=temperature-today></p>
                <img class=weather__icon>
                <div class=weather__description>
                    <p class=description__info></p>
                    <p class=description__feels-like></p> 
                    <p class=description__wind></p>
                    <p class=description__humidity></p>
                </div>                
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
            <div id="map" style="width: 400px; height: 400px"></div>
            <div class=coordinates>
            <p class=coordinates_latitude></p>
            <p class=coordinates_longitude></p>
            </div>            
        </div>
    </main>`;
    document.body.insertAdjacentHTML('beforeend', mainHTML);
}