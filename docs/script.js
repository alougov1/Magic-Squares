//random number between 0 and 1, times (maximum value minus minimum value to receive), plus min value
const targetNum = Math.floor((Math.random()*(99-34)) + 34);

//solves board for given targetNum and stores it
var solvedBoard = solved(targetNum);

//keeps track of board as an array. Initialized to all cells = -1
var currBoard = [
  -1, -1, -1, -1,
  -1, -1, -1, -1,
  -1, -1, -1, -1,
  -1, -1, -1, -1
];

//shuffle given board array randomly
function shuffle(board) {
    var x, y;
    for (var i = 0; i < board.length - 1; i++) {
        //pick a integer within size of board
        x = Math.floor(Math.random() * (i + 1));
        //switch element at position i in board with element at randomly-picked
        //position
        y = board[i];
        board[i] = board[x];
        board[x] = y;
    }
    return board;
}


// when window fully loads:
window.onload = function() {
  var h2 = document.getElementsByTagName("h2");
  h2[0].innerHTML = "Target Number: " + targetNum.toString();

  //array of solved values (solved board), shuffled randomly
  solvedShuffled = solvedBoard.slice();
  solvedShuffled = shuffle(solvedShuffled);

  // initialize tiles to be placed in board with listener, id (id as tile1, tile2, etc)
  var count = 1;
  var tiles = document.getElementsByClassName("box");
  [].forEach.call(tiles, function(tile) {
    tile.id = "tile" + count.toString();
    tile.innerHTML = solvedShuffled[count-1];
    count += 1;
    tile.addEventListener("dragstart", dragstart);
  });


  //get cells to be dropped into
  var cells = document.getElementsByClassName("cell");
  //reset count to 1 to set IDs
  count = 1;
  //set id for each cell (1, 2, etc) and add listeners
  [].forEach.call(cells, function(cell) {
    cell.id = count.toString();
    count += 1;
    cell.addEventListener("drop", drop);
    cell.addEventListener("dragover", dragover);
  });
};

// when element is dragged over a cell:
function dragover(e) {
  e.preventDefault();
};

//when user begins dragging a tile
function dragstart(e) {
  if (e.target.className == "box") {
    e.dataTransfer.setData("text", e.target.id);
  };
};

//if not already taken up by a tile, allow drop onto cell. Update board array.
//Check if current board equals solution board--if so, player wins
function drop(e) {
  if (e.target.className == "cell") {
    //if drop target is a cell, allow drop and append tile to cell
    e.preventDefault();
    var droppedID = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(droppedID));
    e.dataTransfer.clearData();

    //get numerical value (visible to player of game) of cell after drop;
    //set backend value of cell to equal value of tile dropped
    var cellValue = document.getElementById(droppedID).innerHTML;
    currBoard[e.target.id-1] = parseInt(cellValue, 10);

    //check if game won
    if (checkBoards(currBoard, solvedBoard)) {
      var header = document.getElementsByTagName("h1")[0];
      //if user wants to play again, reload page for new game
      if (confirm("You Won! Play again?")) {
        document.location.reload(true);
      };
    };
  };
};

//check whether current board being played is same as solved board--if so,
//return true
function checkBoards(curr, solved) {
  for (var i = 0; i < curr.length; i++) {
    if (curr[i] != solved[i]) {
      return(false);
    };
  };
  return(true);
};
