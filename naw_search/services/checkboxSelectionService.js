app.service('checkboxSelectedService', function () {
  this.checkBoxSelected = function (id, whichCheckbox) {
    const labels = document.querySelectorAll('.label');
    var internalTitle = document.getElementById('internalTitle' + id);
    var thirdPartyTitle = document.getElementById('thirdPartyTitle' + id);
    const internalDeptLabel = 6;
    const thirdPartyLabel = 7;

    if (whichCheckbox == 'thirdParty') {
      labels[thirdPartyLabel].classList.add('active');

      thirdPartyTitle.addEventListener('focusout', () => {
        labels[thirdPartyLabel].classList.remove('active');
      });
    } else if (whichCheckbox == 'internal') {
      labels[internalDeptLabel].classList.add('active');

      internalTitle.addEventListener('focusout', () => {
        labels[internalDeptLabel].classList.remove('active');
      });
    }
  };
});
