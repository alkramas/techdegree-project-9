// toggle cards together with clicked button to collapse element
const cards = document.querySelectorAll('.card');
const filterContainer = document.querySelector('#filter');


// loop through cards, attach event listener to button details and toggle class of card parent
// for (let i = 0; i < cards.length; i++) {
//     let thisCard = cards[i];
//     let parentDiv = thisCard.parentNode;
//     let thisCollapse = thisCard.querySelector('.collapse');
//     let detailsButton = thisCard.querySelector('.details');
//     detailsButton.addEventListener('click', () => {
//
//       parentDiv.classList.toggle('col-md-6');
//       parentDiv.classList.toggle('col-lg-4');
//       parentDiv.classList.toggle('card-container');
//
//
//     });
// }



// filter projects by Skills
//
// save filter settings to localStorage
// 1st function to save value of input element
function saveInputLocal(inputElementId, storageElementName) {
  let  selector = "#" + inputElementId;
  let inputElement = document.querySelector(selector);
  let inputId = inputElement.id;

  let storageName = inputId;
  let storageValue = inputElement.value;
  let storageChecked = inputElement.checked;
  // console.log('storageName: ' + storageName + ', storageValue is: ' + storageChecked);
  // console.log(inputElement);

  if (inputElement.type === 'select-one') {
    // console.log('select element has been changed');
    localStorage.setItem( storageName, storageValue );
    // console.log( localStorage.getItem(storageName) );
  } else if (inputElement.type === 'checkbox') {
    localStorage.setItem( storageName, storageChecked);
    // console.log( localStorage.getItem(storageName) );
  }

};
// call save function on event change of input
filterContainer.addEventListener('change', function(e){
  let id = e.target.id;
  console.log('the event target object is the element with id #' + id);
  saveInputLocal(id, id);
});

// get values in storage
function getStoredInputValues() {
  // loop through input elements
  let inputElements = document.querySelectorAll('.form-check-input');
  for (i = 0; i < inputElements.length; i += 1) {
      let thisElement = inputElements[i];
      let thisId = thisElement.id;
      // console.log(thisElement);
      // console.log(thisId);

      let thisStorageValue = localStorage.getItem(thisId);
      // console.log('the storage value of this element is: ' + thisStorageValue);

      if (thisElement.type === 'select-one') {
        thisElement.value = thisStorageValue;
      } else if (thisElement.type === 'checkbox') {
        if (thisStorageValue === 'false') {
          thisElement.checked = false;
        } else if (thisStorageValue === 'true') {
          thisElement.checked = true;
        }
        // thisElement.value = thisStorageValue;
      }
  }
};

getStoredInputValues();

// reset filters
// call save function on event change of input
filterContainer.addEventListener('change', function(e){
  let checkoxes = filterContainer.querySelectorAll('input');
  for (i = 0; i < checkoxes.length; i += 1) {
    this.checked = false;
  }
  // let id = e.target.id;
  // console.log('the event target object is the element with id #' + id);
  // saveInputLocal(id, id);
});
