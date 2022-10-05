//----------------------------------------------------------------------------------------------------- Nav Bar Code
let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
let searchBtn = document.querySelector('.bx-search');
let longLabel = document.querySelector('.rep');
let grid_template_columns = document.querySelector('.--template-insert');
let gridBody = document.querySelector('.gridBody');
let dateEl = document.querySelector('.date');
let timeEl = document.querySelector('.time');

let sidebarOpenSize = 250;
let sideBarClosedSize = 78;

let sidebarOpenSize_1900px = 300;
let sideBarClosedSize_1900px = 100;

// create array for days and months
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

closeBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  menuBtnChange(); //calling the function(optional)
  changeGridBodySize();
});

function menuBtnChange() {
  if (sidebar.classList.contains('open')) {
    closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right'); //replacing the icons class
  } else {
    closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu'); //replacing the icons class
  }
}

function changeGridBodySize() {
  if (sidebar.classList.contains('open')) {
    gridBody.style.transition = 'all 0.5s ease';
    if (window.innerWidth > 1900) {
      gridBody.style.width = `calc(100% - ${sidebarOpenSize_1900px}px)`;
      longLabel.style.width = `${sidebarOpenSize_1900px}px`;
    } else {
      gridBody.style.width = `calc(100% - ${sidebarOpenSize}px)`;
      longLabel.style.width = `${sidebarOpenSize}px`;
    }

    attachmentsBox.style.width = '600px';
  } else {
    if (window.innerWidth > 1900) {
      gridBody.style.width = `calc(100% - ${sideBarClosedSize_1900px}px)`;
    } else {
      gridBody.style.width = `calc(100% - ${sideBarClosedSize}px)`;
    }
    attachmentsBox.style.width = '600px';
  }
}

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  //   We want a 12 hour clock, not 24
  const hoursForClock = hours % 12;
  const minutes = time.getMinutes();
  // const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes}${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} ${date}`;
}

setTime();

// calls setTime once every 1000ms
setInterval(setTime, 1000);
