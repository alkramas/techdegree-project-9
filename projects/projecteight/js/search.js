// this script performs a search with the user input and shows/hides elements

const searchBox = document.querySelector('.search-box');

// create search or filter tool with this helper funciton
function createTool(inputType, type, placeholder, name) {
  let newTool = document.createElement(inputType);
  let newLabel = document.createElement('LABEL');
  newLabel.setAttribute("for", name);
  newLabel.innerHTML = placeholder;
  newTool.setAttribute("type", type);
  newTool.name = name;
  newTool.id = name;
  // newTool.placeholder = placeholder;
  let label = `<label for="${name}">${placeholder}</label>`;
  let firstOption = `<option value="all" selected>All</option>`;
  if (inputType === "select") {
      newTool.innerHTML = firstOption;
  }
  searchBox.appendChild(newLabel);
  searchBox.appendChild(newTool);
}

createTool("select", "select", "Filter by name", "filter-names");
createTool("select", "select", "Filter by username", "filter-username");


// helper function to test if any search results were found, handle cases
function displayMessage() {
  let found = document.querySelectorAll('div[class="card"][style*="flex"]');
  let sorryPresent = document.querySelectorAll('p.sorry');

  if (found.length === 0 && sorryPresent.length === 0) {
    let info = document.createElement('p');
    info.classList.add('sorry');
    info.textContent = 'Sorry, your search was not successful.';
    cnt.appendChild(info);
  } else if (found.length > 0 && sorryPresent.length > 0) {
    sorryPresent[0].parentNode.removeChild(sorryPresent[0]);
  }
}

// search and filter function
function searchFilter(eventType, inputVariable) {
  inputVariable.addEventListener (eventType, function() {
    const cardDivs = document.querySelectorAll('.card');

    for (let i = 0; i < cardDivs.length; i += 1) {
      let searchInputValue = inputVariable.value.toLowerCase();
      let thisCard = cardDivs[i];
      let userName = thisCard.querySelector('.profile-image').alt;
      let firstName = thisCard.querySelector('.name').textContent;
      let lastName = thisCard.querySelector('.surname').textContent;
      let email = thisCard.querySelector('.email').textContent;
      let city = thisCard.querySelector('.city').textContent;
      let infoAll = firstName + ' ' + lastName + ' ' + email + ' ' + city + ' ' + userName;
      infoAll = infoAll.toLowerCase();

      const filterByName = document.querySelector('#filter-names');
      const filterByUserName = document.querySelector('#filter-username');
      const search = document.querySelector('#main-search');

      // toggle the select options, only allow one to be filtering
      if (inputVariable.id == "filter-names") {
        search.value = '';
        filterByUserName.value = 'all';
      } else if (inputVariable.id == "filter-username") {
          search.value = '';
          filterByName.value = 'all';
      } else if (inputVariable.id == "main-search") {
          filterByUserName.value = 'all';
          filterByName.value = 'all';
      }

      // filter/search logic, including reset of filter
      let searchMatch = infoAll.includes(searchInputValue);
      if ( searchMatch == true || inputVariable.value == 'all' ) {
          thisCard.style.display = 'flex';
          thisCard.parentElement.style.display = 'unset';
      }
      else {
        thisCard.style.display = 'none';
        thisCard.parentElement.style.display = 'none';
      }
      displayMessage();

    } //end of loop
  }) //end of event listener
} // end of function


function search() {
  createTool("input", "search", "Search the directory", "main-search");
  const searchInput = document.querySelector('input[type="search"]');
  searchFilter('input', searchInput);
}

function filter(user) {
  let selectName = document.querySelector('#filter-names');
  let selectUser = document.querySelector('#filter-username');
  let username = user.login.username;
  let firstName = capFirstChar(user.name.first);
  let surName = capFirstChar(user.name.last);
  let name = firstName + ' ' +surName;
  const optionItemName = `<option value="${name}">${name}</option>`;
  const optionItemUser = `<option value="${username}">${username}</option>`;
  selectName.innerHTML += optionItemName;
  selectUser.innerHTML += optionItemUser;

  searchFilter('change', selectName);
  searchFilter('change', selectUser);
}
