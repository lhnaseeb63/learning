console.log("I'm in");

const labels = document.querySelectorAll('.label');
const fields = document.querySelectorAll('.input');
const buttons = document.querySelectorAll('.btn');
let labelDivArray = [];
let temp = [];
let lastClicked;

//-----------------------------------------------------------Code to make labels for clicked field bold
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

// -------------------------------------------------------------Code to make textarea expand with input
const textarea = document.querySelector('textarea');
const textareaGrid = document.querySelector('.notesField');
textarea.addEventListener('keyup', (e) => {
  textarea.style.height = 'auto';
  let scHeight = e.target.scrollHeight;
  console.log(scHeight);

  textarea.style.height = `${scHeight}px`;
  textareaGrid.style.height = `${scHeight}px`;
});

//--------------------------------------------------------------Nav Bar Code
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
