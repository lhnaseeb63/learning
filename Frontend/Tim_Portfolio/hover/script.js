const menu = document.getElementById('menu');

// convert menu items to array so they
// are iterable
Array.from(document.getElementsByClassName('menu-item')).forEach((item, index) => {
  //   append a mouseover listener to each item
  // use them to update active index attr on
  // our menu element
  item.onmouseover = () => {
    menu.dataset.activeIndex = index;
  };
});

// ============================================= Reels hover effect
// event handler for onmousemove
const handleOnMouseMove = (e) => {
  // get card position
  const { currentTarget: target } = e;

  //   calculate position of mouse relative to each card
  const rect = target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  // with the x & y can set custom css properties
  target.style.setProperty('--mouse-x', `${x}px`);
  target.style.setProperty('--mouse-y', `${y}px`);
};

// add onmousemove event listener to each card
for (const card of document.querySelectorAll('.card')) {
  card.onmousemove = (e) => handleOnMouseMove(e);
}

/**
 * The Element.getBoundingClientRect() method returns a DOMRect
 * object providing information about the size of an element
 * and its position relative to the viewport.
 */
