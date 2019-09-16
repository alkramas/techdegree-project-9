const url = 'https://randomuser.me/api/?results=12';
const cnt = document.querySelector('#cnt');
const mcnt = document.querySelector('#mcnt');

// *******************************
// helper functions
// *******************************
function createCard(img, username, name, surname, email, city, id, phone, address, birthday, previous, next) {
  // const card = document.createElement('DIV');
  const cardContent = `
  <a href="#${id}" rel="modal:open">
    <div class="card">
      <img src="${img}" class="profile-image" alt="${username}"/>
      <div class="info">
        <p class="names"><span class="name">${name}</span>&nbsp;<span class="surname">${surname}</span></p>
        <p class="email">${email}</p>
        <p class="city">${city}</p>
      </div>
    </div>
  </a>
  `;
  const modalContent = `
  <div class="modal" id="${id}">
    <div class="flex" style="display:flex;">
      <img src="${img}" class="profile-image" alt=""/>
      <div class="m-info">
        <p class="m-names"><span class="name">${name}</span>&nbsp;<span class="surname">${surname}</span></p>
        <p class="m-email">${email}</p>
        <p class="m-city">${city}</p>
      </div>
      <div class="m-details">
        <p class="m-phone">${phone}</p>
        <p class="m-address">${address}</p>
        <p class="m-birthday">birthday: ${birthday}</p>
      </div>
      <div class="m-nav">
        <a href="#${previous}" rel="modal:open">previous</a>
        <a href="#${next}" rel="modal:open">next</a>
      </div>
    </div>
  </div>
  `;
  cnt.innerHTML += cardContent;
  mcnt.innerHTML += modalContent;
}


function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function fetchData(url) {
    return fetch(url)
      .then(checkStatus)
      .then(response => response.json())
      .catch(error => console.log('an error has occured!', error))
}

function capFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function previousId(id) {
  if (id === 1) {
    return id = 12;
  } else {
    return id - 1;
  }
}
function nextId(id) {
  if (id === 12) {
    return id = 1;
  } else {
    return id + 1;
  }
}
function getDOB(dob) {
  let date = new Date(dob);
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return day + '/' + month + '/' + year;
}

function createProfile(user, index) {
  // let user = data.;
  let img = user.picture.large;
  let username = user.login.username;
  let name = capFirstChar(user.name.first);
  let surname = capFirstChar(user.name.last);
  let email = user.email;
  let city = capFirstChar(user.location.city);
  let id = index + 1;
  let phone = user.cell;
  let address = capFirstChar(user.location.street) + ', ' + user.location.postcode;
  let birthday = getDOB(user.dob.date);
  let previous = previousId(id);
  let next = nextId(id);

  createCard(img, username, name, surname, email, city, id, phone, address, birthday, previous, next);
}

 function processData(data) {
  const primaryData = data.map((user, index) => createProfile(user, index));
  const staffSelect = data.map(user => filter(user));
  // console.log(data);
}




// *******************************
// fetch and process data
// *******************************
fetchData(url)
 .then( data => processData(data.results) )
 .then( data => search() )
