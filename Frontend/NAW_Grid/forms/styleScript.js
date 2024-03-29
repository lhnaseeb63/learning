console.log("I'm in");
console.log('Width:  ' + window.innerWidth);
console.log('Height:  ' + window.innerHeight);

const labels = document.querySelectorAll('.label');
const fields = document.querySelectorAll('.input');
const attachButtons = document.querySelectorAll('.attach-button');
let labelDivArray = [];
let temp = [];
let lastClicked;

//------------------------------------------------------------------------- Code to make labels for clicked field bold
setClassArrays();

// Creating arrays to compare class names
function setClassArrays() {
  labels.forEach((label) => {
    temp = label.className.split(' ');
    temp.forEach((item, idx) => {
      if (idx % 2 != 0) {
        labelDivArray.push(temp[idx]);
      }
    });
  });
}

// field is active, make corresponding label bold by adding active class
// Check class name for matching string. Only make bold if they match.
fields.forEach((field) => {
  field.addEventListener('focusin', () => {
    if (field.nodeName == 'TEXTAREA') {
      labelDivArray.forEach((label, i) => {
        if (field.parentNode.parentNode.classList[1].includes(label)) {
          labels[i].classList.add('active');
          lastClicked = labels[i];
        }
      });
    } else if (field.classList.contains('checkbox') && field.nodeName == 'INPUT') {
      labelDivArray.forEach((label, i) => {
        if (field.parentNode.parentNode.parentNode.classList[1].includes(label)) {
          labels[i].classList.add('active');
          lastClicked = labels[i];
        }
      });
    } else if (field.classList.contains('radioBtn') && field.nodeName == 'INPUT') {
      labelDivArray.forEach((label, i) => {
        if (field.parentNode.parentNode.parentNode.classList[1].includes(label)) {
          labels[i].classList.add('active');
          lastClicked = labels[i];
        }
      });
    } else {
      labelDivArray.forEach((label, i) => {
        if (field.parentNode.classList[1].includes(label)) {
          labels[i].classList.add('active');
          lastClicked = labels[i]; //pass by reference?
        }
      });
    }
  });

  field.addEventListener('focusout', () => {
    lastClicked.classList.remove('active');
  });
});

attachButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log(btn.parentNode.parentNode.classList[1]);
    if (btn.parentNode.parentNode.classList[1].includes(labels[9].classList[1])) {
      labels[9].classList.add('active');
    }

    setTimeout(() => {
      labels[9].classList.remove('active');
    }, 1000);
  });
});

// --------------------------------------------------------------------------------- Code to make textarea expand with input
const textarea = document.querySelector('textarea');
const textareaGrid = document.querySelector('.notesField');
textarea.addEventListener('keyup', (e) => {
  textarea.style.height = 'auto';
  let scHeight = e.target.scrollHeight;
  console.log(scHeight);

  textarea.style.height = `${scHeight}px`;
  textareaGrid.style.height = `${scHeight}px`;
});

// -------------------------------------------------------------------------------------- Code for Attachments Container
const attachmentsBox = document.querySelector('.icons-wrapper');
const attachmentsGrid = document.querySelector('.attachmentsField');
const iconsList = document.querySelectorAll('.icon');
const iconsNameEls = document.querySelectorAll('.icon-name');
const iconsToolTips = document.querySelectorAll('.icon-tooltip');
const deleteIcons = document.querySelectorAll('.icon-delete');
const originalBoxHeight = 200;
const iconHeight = 98; //icon height (84) + padding-bottom (14)
let numberOfIcons = iconsList.length;
let attachmentsBoxHeight;

expandAttachmentsBox();

//  make Attachments Container expand with input
function expandAttachmentsBox() {
  if (iconsList.length > 7) {
    const numberOfAdditionalRows = Math.floor(iconsList.length / 4) - 1;
    attachmentsBoxHeight = originalBoxHeight + iconHeight * numberOfAdditionalRows;
    attachmentsBox.style.height = `${attachmentsBoxHeight}px`;
  }
}

// shorten file name on DOM and have tooltip display full name
iconsNameEls.forEach((icon, idx) => {
  let iconName = icon.innerHTML;
  let firstHalf = [];
  let dots = '...';
  let newName;

  firstHalf = iconName.slice(0, 7);

  newName = firstHalf.concat(dots);

  icon.textContent = newName;

  // overwrite the corresponding tooltip
  iconsToolTips[idx].textContent = iconName;
});

// delete icon from DOM when user clicks 'x' and shrink attachments box if need be
deleteIcons.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.parentNode.remove();
    numberOfIcons--;
    shrinkAttachmentsBox();
  });
  // TODO: what if the user adds more files after deleting some? Need to accommodate for that.
});

function shrinkAttachmentsBox() {
  if (numberOfIcons % 4 == 0 && numberOfIcons < iconsList.length && numberOfIcons >= 8) {
    const numberOfRowsToRemove = Math.ceil((iconsList.length - numberOfIcons) / 4);
    attachmentsBox.style.height = `${attachmentsBoxHeight - iconHeight * numberOfRowsToRemove}px`;
    attachmentsBox.style.transition = 'all 0.5s ease';
  }
}

function numRowsToRemove(iconsOnDOM, iconsInHTML) {
  return Math.ceil((iconsInHTML - iconsOnDOM) / 4);
}

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
