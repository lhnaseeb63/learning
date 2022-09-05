const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => {
    highlightCups(idx);
  });
});

// want to fill cup of selected and all before selected
// want to toggle selected cups and remove all before
function highlightCups(idxOfClickedCup) {
  if (
    smallCups[idxOfClickedCup].classList.contains('full') &&
    !smallCups[idxOfClickedCup].nextElementSibling.classList.contains('full')
  ) {
    idxOfClickedCup--;
  }
  smallCups.forEach((cup, idx) => {
    if (idx <= idxOfClickedCup) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;
  console.log(totalCups);

  if (fullCups == 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    //height of big cup is 330px
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups == totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
  } else {
    remained.style.visibility = 'visible';
    liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
    // remained.innerText = `${}`
  }
}
