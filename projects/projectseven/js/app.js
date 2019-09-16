

//alerts for main content
const notifications = document.querySelector('.notifications');
const bellMarker = document.querySelector('span.newalerts');
let alerts = notifications.children;
let displayedAlerts = 3;

// close notification alerts
notifications.addEventListener('click', function(event) {
  let alertContainer = event.target.parentNode;
  let alertContainerId = event.target.parentNode.id;
  let eventTarget = event.target.className;
  if (eventTarget == 'close-alert') {
    alertContainer.style.display = 'none';
    displayedAlerts += -1;
    console.log(displayedAlerts);
    if (displayedAlerts < 1) {
      bellMarker.style.display = 'none';
    }
  }
});



// open notification alerts with click on bell
const iconBell = document.querySelector('div.bell');

iconBell.addEventListener('click', function(event) {
    for (let i = 0; i < alerts.length; i += 1) {
    alerts[i].style.display = 'flex';
  }
  bellMarker.style.display = 'inline';
});


// search users
//read input from search field
const searchInput = document.querySelector('#userSearch');
const sectionMembers = document.querySelector('section.members');
const membersAll = sectionMembers.querySelectorAll('.members-container');

// filter members from user input in search
searchInput.addEventListener ('input', function() {
  let searchInputValue = searchInput.value.toLowerCase();

  for (let i = 0; i < membersAll.length; i += 1) {
    let memberThis = membersAll[i];
    let memberInfoContainer = memberThis.querySelector('.member-info-container');
    let memberTextContainer = memberInfoContainer.lastElementChild;
    let memberName = memberTextContainer.firstElementChild.innerHTML.toLowerCase();
    let memberEmail = memberTextContainer.lastElementChild.innerText;

    // console.log(memberName);
    // console.log(searchInputValue);

    let searchMatch = memberName.includes(searchInputValue);

    if ( searchMatch == true ) {
        memberThis.style.display = 'flex';
        // memberThis.classList.add('selected-member');
    }
    else {
      memberThis.style.display = 'none';
    }
  }
});


// select member from board with click, highlight member, diselect others
const newmembers = document.querySelector('section.members');
const membersSelection = newmembers.querySelectorAll('.members-container');
// console.log(membersSelection);

newmembers.addEventListener('click', function(event) {
  let eventParent = event.target.parentNode;
  let eventGrandParent = eventParent.parentNode;
  let eventGreatGrandParent = eventGrandParent.parentNode;

  for (let i = 0; i < membersSelection.length; i += 1) {
    let thisMemberContainer = membersSelection[i];
    if ( membersSelection[i].classList.contains('selected-member') ) {
      searchInput.value = '';
      thisMemberContainer.classList.remove('selected-member');
    }
    else if ( eventGreatGrandParent.className !== 'selected-member' && membersSelection[i] == eventGreatGrandParent ) {
        let thisMemberName = thisMemberContainer.querySelector('p').innerText;
        thisMemberContainer.classList.add('selected-member');
        searchInput.value = thisMemberName;
        // console.log(thisMemberName);
    }
  }
});


// call autocomplete jquery plugin
var options = {
    data: [ {name: 'Victoria Chambers', email: 'victoria.chambers80@example.com'},
            {name: 'Pedro Hiestand', email: 'pedro.hiestand@example.com'},
            {name: 'Eleni Mano', email: 'eleni.mano@example.com'},
            {name: 'Chris Beraux', email: 'chirs.beraux@example.com'}
          ],
    getValue: "name",
    template: {
        type: "description",
        fields: {
            description: "email"
        }
    },
    list: {
        match: {
            enabled: true
        },
        onClickEvent: function() {
        			var value = $("#userSearch").getSelectedItemData().name;
              var memberText = $('.members-text');
              var section = $('section.members');
              var container = $(section).find('.members-container');
              // loop though all memberText-containers, find match in child element and add class memberSelected
              $(container).each( function(index) {
                // console.log(this);
                var thisName = $(this).find('p.name').text();
                // console.log(thisName);
                if (thisName === value) {
                  $(this).addClass('selected-member');
                }
              });
        		}
    },
    theme: "round"
};
$("#userSearch").easyAutocomplete(options);


// create functions with alerts from plugin
function notifySuccess() {
  $("#send").notify(
  "Message has been send successfully",
  "success",
  { position:"bottom" },
  {showAnimation: 'slideDown'},
  {hideAnimation: 'slideUp'}
  );
};
function notifyErrorMember() {
  $("#send").notify(
  "Please select a member from the board",
  "error",
  { position:"bottom" },
  {showAnimation: 'slideDown'},
  {hideAnimation: 'slideUp'}
  );
};
function notifyErrorMessage() {
  $("#send").notify(
  "Please type a message in the message field",
  "error",
  { position:"bottom" },
  {showAnimation: 'slideDown'},
  {hideAnimation: 'slideUp'}
  );
};

// validate message form
const buttonSend = document.querySelector('button#send');

buttonSend.addEventListener('click', function(event)  {
    let memberSelected = newmembers.querySelectorAll('.selected-member');
    let messageField = document.querySelector('#messageField');
    event.preventDefault();
      if (memberSelected.length > 0 && messageField.value !== '') {
        notifySuccess();
      } else if (memberSelected.length < 1) {
        notifyErrorMember();
      } else if (messageField.value == '') {
        notifyErrorMessage();
      }
});








// save user input to localStorage
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
document.querySelector('.settings').addEventListener('change', function(e){
  let id = e.target.id;
  console.log('the event target object is the element with id #' + id);
  saveInputLocal(id, id);
});

// get values in storage
function getStoredInputValues() {
  // loop through input elements
  let inputElements = document.querySelectorAll('.user-input');
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
