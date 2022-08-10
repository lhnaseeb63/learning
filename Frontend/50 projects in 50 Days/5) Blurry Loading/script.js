const bg = document.querySelector('.bg');
const loadText = document.querySelector('.loading-text');

let load = 0;
let interval = setInterval(blurring, 30);

function blurring() {
    load++;

    if(load > 99) {
        clearInterval(interval)
    }

    loadText.innerText = `${load}%`;
    // want from opaque to transparent, so 1 to 0
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
   
    //max blur is 30px for image in our case. Need to map. 
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`

}
// Have to map a range of numbers 0-100 because opacity 
//takes in 0 and 1. Using Stackoverflow solution.
//https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (number, inMin, inMax, outMin, outMax) => {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


