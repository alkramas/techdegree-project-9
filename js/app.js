// toggle cards together with clicked button to collapse element
const cards = document.querySelectorAll('.card');



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
