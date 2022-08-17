const labels = document.querySelectorAll('.form-control label');

labels.forEach(label => {
    //splitting labels into an array of individual letters
    //then each letter is wrapped in a span with a xsition delay
    //then joining the array into a string
    // string -> array -> string
    label.innerHTML = label.innerText
        .split('')
        .map((letter, idx)=> `<span 
        style="transition-delay:${idx * 50}ms">${letter}</span>`)
        .join('')
})