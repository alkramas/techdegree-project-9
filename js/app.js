// toggle cards together with clicked button to collapse element
const cards = document.querySelectorAll('.card');
const filterContainer = document.querySelector('#filter');
const inputElements = document.querySelectorAll('.form-check-input');
const buttonFilter = document.querySelector('#set-filters');
const buttonFilterReset = document.querySelector('#reset-filters');
const buttonsAll = document.querySelectorAll('BUTTON');
const buttonContact = document.querySelector('#toggle-contact');

buttonContact.addEventListener('click', function(e){
  let footer = document.querySelector('#navbarNavFooter');
  function scrollToFooter() {
    footer.scrollIntoView(false);
  }
  setTimeout(scrollToFooter, 300);
});


// filter variables
const allskills = document.querySelectorAll('.skill');
const modalsBodies = document.querySelectorAll('.modal-body');

// filter projects by Skills
function filterBySkills() {
  let checkedSkills = [];
  for (i = 0; i < inputElements.length; i += 1) {
    let thisElement = inputElements[i];
    if (thisElement.checked === true) {
      checkedSkills.push(thisElement.value.toLowerCase());
    }
  }
      for (ii = 0; ii < modalsBodies.length; ii += 1) {
          let displayCard;
          let skillNotFound;
          let thisModalBody = modalsBodies[ii];
          let cardPartent = thisModalBody.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
          let thisModalBodySkills = thisModalBody.querySelectorAll('.skill');
          for (iii = 0; iii < thisModalBodySkills.length; iii += 1) {
            let thisSkill = thisModalBodySkills[iii];
            let thisSkillText = thisSkill.textContent.toLowerCase();
            checkedSkills.toString();
            if (checkedSkills.includes(thisSkillText)) {
              displayCard = true;
            } else {
              skillNotFound = true;
            }
          }
          if (displayCard === true) {
            cardPartent.classList.add('d-flex');
            cardPartent.classList.remove('d-none');
          } else if (skillNotFound === true) {
            cardPartent.classList.remove('d-flex');
            cardPartent.classList.add('d-none');
          }
      }
}

// filter projects by Skills
// function filterBySkills() {
//     // check which skills are checked in filters
//     // let checkedSkills = '';
//     let checkedSkills = [];
//     for (i = 0; i < inputElements.length; i += 1) {
//       let thisElement = inputElements[i];
//       if (thisElement.checked === true) {
//         // checkedSkills += thisElement.value.toLowerCase();
//         checkedSkills.push(thisElement.value.toLowerCase());
//         // console.log('checkedSkills is: ' + checkedSkills);
//       }
//     }
//
//     for (ii = 0; ii < modalsBodies.length; ii += 1) {
//         let thisModalBody = modalsBodies[ii];
//         let cardPartent = thisModalBody.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
//         console.log(cardPartent);
//         let thisModalBodySkills = thisModalBody.querySelectorAll('.skill');
//         let targetSkills;
//         for (iii = 0; iii < thisModalBodySkills.length; iii += 1) {
//           let thisSkill = thisModalBodySkills[iii];
//           let thisSkillText = thisSkill.textContent.toLowerCase();
//           // targetSkills.push(thisSkillText);
//           targetSkills += thisSkillText;
//           console.log('targetSkills is: ' + targetSkills);
//         }
//
//         for (iii = 0; iii < checkedSkills.length; iii += 1) {
//           let thisCheckedSkill = checkedSkills[iii];
//           console.log('thisCheckedSkill is ' + thisCheckedSkill)
//
//           if (targetSkills.includes(thisCheckedSkill)) {
//             cardPartent.classList.add('d-flex');
//             cardPartent.classList.remove('d-none');
//           } else {
//             cardPartent.classList.remove('d-flex');
//             cardPartent.classList.add('d-none');
//           }
//
//       }
//     }
// }

function checkViewdButton() {
  for (i = 0; i < buttonsAll.length; i += 1) {
    let thisButton = buttonsAll[i];
    if (thisButton.textContent === 'View project') {
        thisButton.addEventListener('click', function(e){
          let id = e.target.id;
          let status = 'clicked';
          saveInputLocal(id, status);
          thisButton.classList.add('viewed');
          // if button clicked was the view project button in the modal dialog, also add class to card button
          let cardBody = thisButton.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
          let cardBodyButton = cardBody.querySelector('.btn');
          cardBodyButton.classList.add('viewed');
        });
    } else if (thisButton.textContent === 'View') {
      thisButton.addEventListener('click', function(e){
        let id = e.target.id;
        let status = 'clicked';
        saveInputLocal(id, status);
        thisButton.classList.add('viewed');
        // if button clicked was the view project button in the initial card container, also add class to modal button
        let btnGroup = thisButton.parentNode.parentNode;
        let modalContainer = btnGroup.nextSibling;
        let modalButton = modalContainer.querySelector('button[id*="view-project"]');
        modalButton.classList.add('viewed');
      });
    }
  }
}

// save filter dialog settings to localStorage
// 1st function to save value of input element
function saveInputLocal(inputElementId, storageElementName) {
  let selector = "#" + inputElementId;
  let inputElement = document.querySelector(selector);
  let inputId = inputElement.id;
  let storageChecked;
  let storageName = inputId;
  if (inputElement.type === 'checkbox') {
    storageChecked = inputElement.checked;
  } else if (inputElement.type === 'button') {
    storageChecked = 'clicked';
  }
  localStorage.setItem( storageName, storageChecked);
};



// make filter button active when any option is checked
function showButtonFilterActive() {
  // loop through input elements
  let statusTrue = 'notdefined';

  for (i = 0; i < inputElements.length; i += 1) {
    let thisElement = inputElements[i];

    if (thisElement.checked === true) {
      statusTrue = true;
      buttonFilter.classList.add('active');
    } else if (statusTrue === 'notdefined') {
      buttonFilter.classList.remove('active');
    }
  }
}


// reset filters
// call save function on event change of input
function resetFilter() {
  buttonFilterReset.addEventListener('click', function(e){
    for (i = 0; i < inputElements.length; i += 1) {
      let thisElement = inputElements[i];
      thisElement.checked = false;
      let id = thisElement.id;
      let checked = thisElement.checked;
      saveInputLocal(id, checked);
      buttonFilter.classList.remove('active');
    }

    for (ii = 0; ii < cards.length; ii += 1) {
      let thisCard = cards[ii];
      thisCard.parentNode.classList.remove('d-none');
      thisCard.parentNode.classList.add('d-flex');
    }
  });
}

// get values in storage
function getStoredInputValues() {
  // loop through input elements
  for (i = 0; i < inputElements.length; i += 1) {
      let thisElement = inputElements[i];
      let thisId = thisElement.id;
      let thisStorageValue = localStorage.getItem(thisId);
      console.log(thisId);
      if (thisStorageValue === 'false') {
          thisElement.checked = false;
      } else if (thisStorageValue === 'true') {
        thisElement.checked = true;
      }
    }
  for (i = 0; i < buttonsAll.length; i += 1) {
    let thisButton = buttonsAll[i];
    let thisId = thisButton.id;
    let thisStorageValue = localStorage.getItem(thisId);
    if (thisStorageValue === 'clicked') {
      thisButton.classList.add('viewed');
    }
  }
};

getStoredInputValues();
showButtonFilterActive();
resetFilter();
checkViewdButton();

// call save function on event change of input
filterContainer.addEventListener('change', function(e){
  let id = e.target.id;
  let checked = e.target.checked;
  showButtonFilterActive();
  filterBySkills();
  saveInputLocal(id, checked);
});
