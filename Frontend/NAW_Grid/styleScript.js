console.log("I'm in");

const labels = document.querySelectorAll('.label');
const fields = document.querySelectorAll('.input');
const buttons = document.querySelectorAll('.btn');
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
fields.forEach((field, idx) => {
  field.addEventListener('focusin', () => {
    if (field.nodeName == 'TEXTAREA') {
      labelDivArray.forEach((label, i) => {
        if (field.parentNode.parentNode.classList[1].includes(label)) {
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

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.parentNode.classList[1].includes(labels[9].classList[1])) {
      labels[9].classList.add('active');
    }
  });

  btn.addEventListener('focusout', () => {
    labels[9].classList.remove('active');
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

// --------------------------------------------------------------------- Code to make Attachments Container expand with input
const attachmentsBox = document.querySelector('.icons-wrapper');
const attachmentsGrid = document.querySelector('.attachmentsField');
const iconsList = document.querySelectorAll('.icon');
const originalBoxHeight = 200;
const iconHeight = 98; //icon height (84) + padding-bottom (14)

expandAttachmentsBox();

function expandAttachmentsBox() {
  console.log('AttachmentsBox');
  console.log(iconsList.length);
  if (iconsList.length > 7) {
    console.log('attachments box height:');
    attachmentsBox.style.height = `${originalBoxHeight}px`;
    console.log('Original height:  ' + attachmentsBox.style.height);

    const numberOfAdditionalRows = Math.floor(iconsList.length / 4) - 1;
    const test = iconHeight * numberOfAdditionalRows;
    console.log('Additional Height:  ' + test);
    console.log('Number of Additional Rows:  ' + numberOfAdditionalRows);
    attachmentsBox.style.height = `${originalBoxHeight + iconHeight * numberOfAdditionalRows}px`;
    console.log('New Height:   ' + attachmentsBox.style.height);
  }
}

//----------------------------------------------------------------------------------------------------- Nav Bar Code
let sidebar = document.querySelector('.sidebar');
let closeBtn = document.querySelector('#btn');
let searchBtn = document.querySelector('.bx-search');
// let right_space = document.querySelector('.right_space');
// let left_space = document.querySelector('.left_space');
let longLabel = document.querySelector('.rep');
let grid_template_columns = document.querySelector('.--template-insert');
let gridBody = document.querySelector('.gridBody');
let dateEl = document.querySelector('.date');
let timeEl = document.querySelector('.time');

let sidebarOpenSize = 250;
let sideBarClosedSize = 78;

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
    gridBody.style.width = `calc(100% - ${sidebarOpenSize}px)`;
    gridBody.style.transition = 'all 0.5s ease';
    longLabel.style.width = '251px';
    attachmentsBox.style.width = '600px';
  } else {
    gridBody.style.width = `calc(100% - ${sideBarClosedSize}px)`;
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
