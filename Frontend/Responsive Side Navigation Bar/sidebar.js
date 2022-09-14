console.log("I'm in");

let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
let searchBtn = document.querySelector('.bx-search');

closeBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  menuBtnChange(); //calling the function(optional)
});

searchBtn.addEventListener('click', () => {
  // Sidebar open when you click on the search iocn
  sidebar.classList.toggle('open');
  menuBtnChange(); //calling the function(optional)
});

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains('open')) {
    closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the iocns class
  } else {
    closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the iocns class
  }
}

// let btn = document.querySelector('#btn');
// let sideBar = document.querySelector('.sidebar');
// let searchBtn = document.querySelector('.bx-search');

// btn.addEventListener('click', () => {
//   sideBar.classList.toggle('active');
//   console.log('super in');
// });

// searchBtn.addEventListener('click', () => {
//   sideBar.classList.toggle('active');
//   console.log('super in');
// });
