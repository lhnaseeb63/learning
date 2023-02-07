app.service('formFrontEndService', function () {
  // calling all functions
  // makeActiveLabelsBold();
  // adjustNotesFieldHeight();
  // adjustAttachBoxDimensions();

  //-------------------------------------------------------------- Code to make labels for clicked field bold

  this.makeActiveLabelsBold = function () {
    const labels = document.querySelectorAll('.label');
    const fields = document.querySelectorAll('.input');
    const attachButtons = document.querySelectorAll('.attach-button');
    let labelDivArray = [];
    let temp = [];
    let lastClicked;
    setClassArrays(labels, temp, labelDivArray);
    toggleActiveClass(fields, labels, labelDivArray, lastClicked, attachButtons);
    console.log('iinside make bold');
  };

  function setClassArrays(labels, temp, labelDivArray) {
    // Creating arrays to compare class names
    labels.forEach((label) => {
      temp = label.className.split(' ');
      temp.forEach((item, idx) => {
        if (idx % 2 != 0) {
          labelDivArray.push(temp[idx]);
        }
      });
    });
  }
  function toggleActiveClass(fields, labels, labelDivArray, lastClicked, attachButtons) {
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
          console.log('checkbox selected');
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
  }

  // ------------------------------------------------------------- Code to make textarea expand with input

  this.adjustNotesFieldHeight = function () {
    const textarea = document.querySelector('textarea');
    const textareaGrid = document.querySelector('.notesField');
    textarea.addEventListener('keyup', (e) => {
      textarea.style.height = 'auto';
      let scHeight = e.target.scrollHeight;
      console.log(scHeight);

      textarea.style.height = `${scHeight}px`;
      textareaGrid.style.height = `${scHeight}px`;
    });
  };

  // ------------------------------------------------------------- Code for Attachments Container
  this.adjustAttachBoxDimensions = function () {
    const attachmentsBox = document.querySelector('.icons-wrapper');
    const iconsList = document.querySelectorAll('.icon');
    const iconsNameEls = document.querySelectorAll('.icon-name');
    const iconsToolTips = document.querySelectorAll('.icon-tooltip');
    const deleteIcons = document.querySelectorAll('.icon-delete');
    const originalBoxHeight = 200;
    const iconHeight = 98; //icon height (84) + padding-bottom (14)
    let numberOfIcons = iconsList.length;
    let attachmentsBoxHeight;

    attachmentsBoxHeight = expandAttachmentsBox(iconsList, attachmentsBoxHeight, attachmentsBox, originalBoxHeight, iconHeight);
    shortenFileName(iconsNameEls, iconsToolTips);
    deleteIconsFromDOM(deleteIcons, numberOfIcons, attachmentsBox, attachmentsBoxHeight, iconHeight, iconsList);
  };

  //  make Attachments Container expand with input
  function expandAttachmentsBox(iconsList, attachmentsBoxHeight, attachmentsBox, originalBoxHeight, iconHeight) {
    if (iconsList.length > 7) {
      const numberOfAdditionalRows = Math.floor(iconsList.length / 4) - 1;
      attachmentsBoxHeight = originalBoxHeight + iconHeight * numberOfAdditionalRows;
      attachmentsBox.style.height = `${attachmentsBoxHeight}px`;
      return attachmentsBoxHeight;
    }
  }

  function shortenFileName(iconsNameEls, iconsToolTips) {
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
  }

  function deleteIconsFromDOM(deleteIcons, numberOfIcons, attachmentsBox, attachmentsBoxHeight, iconHeight, iconsList) {
    // delete icon from DOM when user clicks 'x' and shrink attachments box if need be
    deleteIcons.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.parentNode.remove();
        numberOfIcons--;
        shrinkAttachmentsBox(numberOfIcons, attachmentsBox, attachmentsBoxHeight, iconHeight, iconsList);
      });
      // TODO: what if the user adds more files after deleting some? Need to accommodate for that.
    });
  }

  function shrinkAttachmentsBox(numberOfIcons, attachmentsBox, attachmentsBoxHeight, iconHeight, iconsList) {
    if (numberOfIcons % 4 == 0 && numberOfIcons < iconsList.length && numberOfIcons >= 8) {
      const numberOfRowsToRemove = Math.ceil((iconsList.length - numberOfIcons) / 4);
      attachmentsBox.style.height = `${attachmentsBoxHeight - iconHeight * numberOfRowsToRemove}px`;
      attachmentsBox.style.transition = 'all 0.5s ease';
    }
  }

  // disabled buttons styling
  this.disabledStyling = function (disabledFlagsObject) {
    var disabledFlagsKeysArray = Object.keys(disabledFlagsObject);
    const templateBtns = document.querySelectorAll('.button');
    const attachBtns = document.querySelectorAll('.attach-button');

    disabledFlagsKeysArray.forEach((key) => {
      if (disabledFlagsObject[key] == 1) {
        switch (key) {
          case 'inputs':
            // console.log('useless atm');
            break;
          case 'delete':
            // console.log('delete: disabled');
            templateBtns[0].classList.add('button-disabled');
            break;
          case 'edit':
            // console.log('edit: disabled');
            templateBtns[1].classList.add('button-disabled');
            break;
          case 'save':
            // console.log('edit: disabled');
            templateBtns[2].classList.add('button-disabled');
            break;
          case 'send':
            // console.log('send: disabled');
            templateBtns[3].classList.add('button-disabled');
            break;
          case 'attach':
            // console.log('attach: disabled');
            attachBtns[0].classList.add('button-disabled');
            break;
          case 'upload':
            // console.log('attach: disabled');
            attachBtns[1].classList.add('button-disabled');
            break;
          case 'print':
            // console.log('attach: disabled');
            templateBtns[4].classList.add('button-disabled');
            break;
          default:
            console.log('no match');
        }
      } else if (disabledFlagsObject[key] == 0) {
        switch (key) {
          case 'inputs':
            // console.log('useless atm');
            break;
          case 'delete':
            // console.log('delete: enabled');
            templateBtns[0].classList.remove('button-disabled');
            break;
          case 'edit':
            // console.log('edit: enabled');
            templateBtns[1].classList.remove('button-disabled');
            break;
          case 'save':
            // console.log('edit: enabled');
            templateBtns[2].classList.remove('button-disabled');
            break;
          case 'send':
            // console.log('send: enabled');
            templateBtns[3].classList.remove('button-disabled');
            break;
          case 'attach':
            // console.log('attach: enabled');
            attachBtns[0].classList.remove('button-disabled');
            break;
          case 'upload':
            // console.log('attach: enabled');
            attachBtns[1].classList.remove('button-disabled');
            break;
          case 'print':
            // console.log('attach: enabled');
            templateBtns[4].classList.remove('button-disabled');
            break;
          default:
            console.log('no match');
        }
      }
    });
  };
});
