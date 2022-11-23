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
