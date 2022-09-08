console.log("I'm in");

const labels = document.querySelectorAll('.label');
const fields = document.querySelectorAll('.input');

// field is active, make corresponding label bold by adding active class
// fields 5 and 6 should both map to type (the radio buttons)
// fix fields 5 and below with checks
fields.forEach((field, idx) => {
  if (idx == 5 || idx == 6) {
    idx = 5;
  }
  field.addEventListener('focusin', () => {
    console.log(idx + ' Field is active');
    labels[idx].classList.add('active');
  });
  field.addEventListener('focusout', () => {
    console.log(idx + ' is no longer active');
    labels[idx].classList.remove('active');
  });
});

// Code to make textarea expand with input
const textarea = document.querySelector('textarea');
textarea.addEventListener('keyup', (e) => {
  textarea.style.height = 'auto';
  let scHeight = e.target.scrollHeight;
  console.log(scHeight);

  textarea.style.height = `${scHeight}px`;
});
