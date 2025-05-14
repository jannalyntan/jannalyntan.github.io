const card = document.querySelector(".card");
console.log(card);

let draggedCard = null;

card.addEventListener("dragstart", function () {
  draggedCard = card;
  console.log(draggedCard);
});

const dropBox = document.querySelector(".dropbox");
console.log(dropBox);

dropBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropBox.addEventListener("drop", function () {
  const clone = draggedCard;

  //This is to create a clone after it is dropped

  //const clone = draggedCard.cloneNode(true);
  // dropBox.innerHTML = draggedCard;

  dropBox.appendChild(clone);
  
  clone.addEventListener("click", function () {
    card.classList.toggle("flip");
  });

  draggedCard = null;
});


