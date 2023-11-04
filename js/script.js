const gameBoard = document.querySelector("#gameboard");
const player = document.querySelector("#player");
const info = document.querySelector("#info-display");
const width = 8;

const startPices = [
   rook, knight, bishop, queen, king, bishop, knight, rook, pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
   "", "", "", "", "", "", "", "", 
   "", "", "", "", "", "", "", "", 
   "", "", "", "", "", "", "", "", 
   "", "", "", "", "", "", "", "",
   pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
   rook, knight, bishop, queen, king, bishop, knight, rook,
];

function createBoard ( ) {
 startPices.forEach((item, i) => {
      const squere = document.createElement("div");
      squere.classList.add("squere");
      squere.innerHTML = item;
      squere.firstElementChild?.setAttribute("draggable", true);
      squere.setAttribute("squere-id", i);
    const row = Math.floor(i / 8);
    if(row % 2 === 0) {
        squere.classList.add(i % 2 === 0 ? "beige" : "brown");
    } else {
        squere.classList.add(i % 2 === 0 ? "brown" : "beige");
    };

    if(i <= 15) {
        squere.firstElementChild.firstElementChild
        .classList.add("black");
    } ;
       
    if (i >= 48 ) {
        squere.firstElementChild.firstElementChild
        .classList.add("white");
    };

      gameBoard.append(squere);
 });
};

createBoard();

const allSquares = document.querySelectorAll("#gameboard .squere");

allSquares.forEach(item => {
    item.addEventListener("dragstart", dragStart);
});

function dragStart (e) {
 console.log(e);
};