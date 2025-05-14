const myCards = [
    { id: 1, name: "Queen", src: "queen.png" },
    { id: 2, name: "King", src: "king.png" },
    { id: 3, name: "Jack", src: "jack.png" },
  ];
  
  let cardComposition = "";
  
  for (let i = 0; i < myCards.length; i++) {
    cardComposition += `
  <div class="card-container">
          <div class="card" draggable="true">
            <div class="card-face"><img src="cloud.png" alt="Back" /></div>
            <div class="card-face flip">
              <img src="${myCards[i].src}" alt="${myCards[i].name}" class="card-front" />
            </div>
          </div>
        </div>
  `;
    console.log(cardComposition);
  }
  
  const deck = document.querySelector(".deck");
 
  deck.innerHTML = cardComposition;


  const cards = document.querySelectorAll(".card");
console.log(cards);

let draggedCard = null;

for (let i = 0; i < myCards.length; i++) {
    cards[i].addEventListener("dragstart", function () {
        draggedCard = cards[i];
        const value = draggedCard.querySelector(".card-front");
        console.log("you are dragging", value.alt);
      });
  };

  const dropBox = document.querySelector(".dropbox");
  console.log(dropBox);

  dropBox.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  
  dropBox.addEventListener("drop", function () {
    dropBox.innerHTML = "";
    const clone = draggedCard;
  
    //This is to create a clone after it is dropped
  
    //const clone = draggedCard.cloneNode(true);
    // dropBox.innerHTML = draggedCard;
  
    dropBox.appendChild(clone);
    
    clone.addEventListener("click", function () {
      cards.classList.toggle("flip");
    });
  
    draggedCard = null;
  });