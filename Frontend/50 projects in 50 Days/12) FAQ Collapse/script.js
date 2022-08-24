const toggleBtns = document.querySelectorAll('.faq-toggle');
// loop through node list

toggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.parentNode.classList.toggle('active');
  });
});

/*
    1) get a node list of all the nodes with the buttons to toggle
    2) loop through each node and add an event listener to them
    3) we want to toggle the parent node to add and remove the active
    class, so we access the parent node and use classList.toggle to do that. 
*/
