// this script performs a search with the user input and shows/hides elements

//read input from search field
const searchInput = document.querySelector('input[type="search"]');
const imgDivs = document.querySelectorAll('.image-item');
const imgAll = document.querySelectorAll('img');


searchInput.addEventListener ('input', function() {
  let searchInputValue = searchInput.value.toLowerCase();

  for (let i = 0; i < imgAll.length; i += 1) {
    let imgDiv = imgDivs[i];
    let imgAlt = imgAll[i].alt.toLowerCase();
    let searchMatch = imgAlt.includes(searchInputValue);

    if ( searchMatch == true ) {
        imgDiv.style.display = 'block';
    }
    else {
      imgDiv.style.display = 'none';
    }
    // console.log(imgAlt);
  }
});
