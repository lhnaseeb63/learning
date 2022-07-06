const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', checkBoxes);

checkBoxes();

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4;

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;

        // if the top of the box is less than the trigger bottom
        // apply the show class. Otherwise remove the show class. 
        if(boxTop < triggerBottom) {
            box.classList.add('show');
        }
        else{
            box.classList.remove('show');
        }
    })
}