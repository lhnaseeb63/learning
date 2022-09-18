// create a span with class of circle styled to be a round
// white circle with an animation so it scales up
// set the position (top, left) to be where we click

const buttons = document.querySelectorAll('.ripple');

// pass in our event object 'e'
buttons.forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    // target is the element that the event fires off of
    // position of the button itself
    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;

    // positioning in the button with the top left corner as (0,0)
    const xInside = x - buttonLeft;
    const yInside = y - buttonTop;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    // this element
    this.appendChild(circle);

    // removes the span a half a second after the click
    setTimeout(() => {
      circle.remove(), 500;
    });
  });
});
