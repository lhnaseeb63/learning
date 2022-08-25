// Going to dynamically create the choices based on user input
// Hit Enter and have it randomly select one of the choices
// choices will be under the div with tags class
const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

// When you first land on the page the text area is already in focus
textarea.focus();

//press down then let go
textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  if (e.key == 'Enter') {
    // clear textarea after 10ms
    setTimeout(() => {
      e.target.value = '';
    }, 10);
    randomSelect();
  }
});

// take whatever we type in and split inputs by comma
// create an array of inputs
// filter: checking for whitespace and empty strings
// map: trimming off white space and pushing clean string onto array
function createTags(input) {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim());

  // clearing the tag so that the tag doesn't pile up with all the choices in one element
  // (c) (ca) (cat) (cath) (cathy)
  // (cathy)
  tagsEl.innerHTML = '';

  tags.forEach((tag) => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

function randomSelect() {
  //number of times it highlights each choice before it stops
  const times = 30;

  // every 100ms, will pick a random tag, highlight then unhighlight
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      unHighlightTag(randomTag);
    }, 100);

    setTimeout;
  }, 100);

  //takes care of stopping it and picking random tag to land on and highlight
  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();

      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  tag.classList.add('highlight');
}

function unHighlightTag(tag) {
  tag.classList.remove('highlight');
}
