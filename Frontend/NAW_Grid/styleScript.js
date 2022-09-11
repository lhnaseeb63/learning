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
textarea.addEventListener('keyup', (e) => {
  textarea.style.height = 'auto';
  let scHeight = e.target.scrollHeight;
  console.log(scHeight);

  textarea.style.height = `${scHeight}px`;
});
