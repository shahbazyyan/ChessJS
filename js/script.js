const gameBoard = document.querySelector("#gameboard");
const player = document.querySelector("#player");
const info = document.querySelector("#info-display");
const width = 8;
let playerGo = "black";
player.textContent = "black";

const startPices = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
];


function createBoard() {
    startPices.forEach((item, i) => {
        const squere = document.createElement("div");
        squere.classList.add("squere");
        squere.innerHTML = item;
        squere.firstElementChild?.setAttribute("draggable", true);
        squere.setAttribute("squere-id", i);
        const row = Math.floor(i / 8);
        if (row % 2 === 0) {
            squere.classList.add(i % 2 === 0 ? "beige" : "brown");
        } else {
            squere.classList.add(i % 2 === 0 ? "brown" : "beige");
        };

        if (i <= 15) {
            squere.firstElementChild.firstElementChild
                .classList.add("black");
        };

        if (i >= 48) {
            squere.firstElementChild.firstElementChild
                .classList.add("white");
        };

        gameBoard.append(squere);
    });
};

createBoard();

const allSquares = document.querySelectorAll(".squere");

allSquares.forEach(item => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
});

let startPositionID;
let draggedElem;

function dragStart(e) {
    startPositionID = e.target.parentNode.getAttribute("squere-id");
    draggedElem = e.target;
};

function dragOver(e) {
    e.preventDefault();
};

function dragDrop(e) {
    e.stopPropagation();
    const correctGo = draggedElem.firstElementChild.classList.contains(playerGo);
    const taken = e.target.classList.contains("piece");
    const valid = checkIfValid(e.target);
    const opponentGo = playerGo === "white" ? "black" : "white";
    const takenByOpponent = e.target.firstElementChild?.classList.contains(opponentGo);

    if (correctGo) {
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElem);
            e.target.remove();
            chekForWin();
            changePlayer();
            return;
        }
        if (taken && !takenByOpponent) {
            info.textContent = "you cannot go here!";
            setTimeout(() => {
                info.textContent = "";
            }, 2000);
            return;
        }
        if (valid) {
            e.target.append(draggedElem);
            chekForWin();
            changePlayer();
            return;
        }
    }
};




function checkIfValid(target) {
    const targetId = Number(target.getAttribute("squere-id") || target.parentNode.getAttribute("squere-id"));
    const startId = Number(startPositionID);
    const piece = draggedElem.id;
    console.log("targetid", targetId);
    console.log("startid", startId);
    console.log("piece", piece);

    switch (piece) {
        case "pawn":
            const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
            if (starterRow.includes(startId) && startId + width * 2 === targetId ||
                startId + width === targetId || startId + width - 1 === targetId && document.querySelector(`[squere-id="${startId + width - 1}"]`).firstElementChild || startId + width + 1 === targetId && document.querySelector(`[squere-id="${startId + width + 1}"]`).firstElementChild
            ) {
                return true; } break;

        case "knight" : if
            (
              startId + width * 2 + 1 === targetId ||
              startId + width * 2 - 1 === targetId ||
              startId + width - 2 === targetId ||
              startId + width + 2 === targetId ||
              startId - width * 2 + 1 === targetId ||
              startId - width * 2 - 1 === targetId ||
              startId - width - 2 === targetId ||
              startId - width + 2 === targetId 
            ) {
                return true; } break;

        case "bishop":
                    const rowDiff = Math.floor(targetId / width) - Math.floor(startId / width);
                    const colDiff = targetId % width - startId % width;
                
                    // Check if the movement is diagonal (equal row and column differences)
                    if (Math.abs(rowDiff) === Math.abs(colDiff)) {
                        const directionRow = rowDiff > 0 ? 1 : -1;
                        const directionCol = colDiff > 0 ? 1 : -1;
                
                        for (let i = 1; i < Math.abs(rowDiff); i++) {
                            const intermediateSquareId = startId + i * directionRow * width + i * directionCol;
                            const intermediateSquare = document.querySelector(`[squere-id="${intermediateSquareId}"]`);
                            
                            if (intermediateSquare && intermediateSquare.firstElementChild) {
                                // There's a piece in the diagonal path
                                return false;
                            }
                        }
                        return true;
                    }
                    break;

                    case "rook":
                        const rowDifferent = Math.floor(targetId / width) - Math.floor(startId / width);
                        const colDifferent = targetId % width - startId % width;
                    
                        // Check if the movement is horizontal or vertical (equal row or column differences)
                        if (rowDifferent === 0 || colDifferent === 0) {
                            const directionRow = rowDifferent > 0 ? 1 : rowDifferent < 0 ? -1 : 0;
                            const directionCol = colDifferent > 0 ? 1 : colDifferent < 0 ? -1 : 0;
                    
                            for (let i = 1; i < Math.abs(rowDifferent + colDifferent); i++) {
                                const intermediateSquareId = startId + i * directionRow * width + i * directionCol;
                                const intermediateSquare = document.querySelector(`[squere-id="${intermediateSquareId}"]`);
                                
                                if (intermediateSquare && intermediateSquare.firstElementChild) {
                                    // There's a piece in the path
                                    return false;
                                }
                            }
                            return true;
                        }
                        return false;
                        
                     
            
           case "queen" : 

 const rowDifferent1 = Math.floor(targetId / width) - Math.floor(startId / width);
                        const colDifferent1 = targetId % width - startId % width;
                    
                        // Check if the movement is horizontal or vertical (equal row or column differences)
                        if (rowDifferent1 === 0 || colDifferent1 === 0) {
                            const directionRow = rowDifferent1 > 0 ? 1 : rowDifferent1 < 0 ? -1 : 0;
                            const directionCol = colDifferent1 > 0 ? 1 : colDifferent1 < 0 ? -1 : 0;
                    
                            for (let i = 1; i < Math.abs(rowDifferent1 + colDifferent1); i++) {
                                const intermediateSquareId = startId + i * directionRow * width + i * directionCol;
                                const intermediateSquare = document.querySelector(`[squere-id="${intermediateSquareId}"]`);
                                
                                if (intermediateSquare && intermediateSquare.firstElementChild) {
                                    // There's a piece in the path
                                    return false;
                                }
                            }
                            return true;
                        } else {
 
                            const rowDiff2 = Math.floor(targetId / width) - Math.floor(startId / width);
                            const colDiff2 = targetId % width - startId % width;
                        
                            // Check if the movement is diagonal (equal row and column differences)
                            if (Math.abs(rowDiff2) === Math.abs(colDiff2)) {
                                const directionRow = rowDiff2 > 0 ? 1 : -1;
                                const directionCol = colDiff2 > 0 ? 1 : -1;
                        
                                for (let i = 1; i < Math.abs(rowDiff2); i++) {
                                    const intermediateSquareId = startId + i * directionRow * width + i * directionCol;
                                    const intermediateSquare = document.querySelector(`[squere-id="${intermediateSquareId}"]`);
                                    
                                    if (intermediateSquare && intermediateSquare.firstElementChild) {
                                        // There's a piece in the diagonal path
                                        return false;
                                    }
                                }
                                return true;
                            }
                        }
                     
           case "king" :
            if(
                startId + 1 === targetId || 
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId - width === targetId ||
                startId + width - 1 === targetId ||
                startId + width + 1 === targetId ||
                startId - width - 1 === targetId ||
                startId - width + 1 === targetId 

                )      {
                    return true
                }       
               
    };
};


function changePlayer() {
    if (playerGo === "black") {
        reverseIDs();
        playerGo = "white";
        player.textContent = "white";
    } else {
        revertIDs();
        playerGo = "black";
        player.textContent = "black";
    }
};

function reverseIDs() {
    const allSquares = document.querySelectorAll(".squere");
    allSquares.forEach((item, i) => item.setAttribute("squere-id", (width * width - 1) - i));
};

function revertIDs() {
    const allSquares = document.querySelectorAll(".squere");
    allSquares.forEach((item, i) => item.setAttribute("squere-id", i));
};


function chekForWin () {
  const kings = Array.from(document.querySelectorAll("#king"));
  console.log(kings);
  if(!kings.some(king => king.firstElementChild.classList.contains("white"))) {
    info.innerHTML = "Blacks wins";
    const allSquares = document.querySelectorAll(".squere");
    allSquares.forEach(item => item.firstElementChild?.setAttribute("draggable", false));
  }
  if(!kings.some(king => king.firstElementChild.classList.contains("black"))) {
    info.innerHTML = "White wins";
    const allSquares = document.querySelectorAll(".squere");
    allSquares.forEach(item => item.firstElementChild?.setAttribute("draggable", false));
  }
};

