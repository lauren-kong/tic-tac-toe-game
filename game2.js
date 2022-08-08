

function createReloadButton() {
  document.getElementById('reload').setAttribute('class', 'reload')
  document.getElementById('reload').innerHTML = 'Restart'
}

function modeToReload() {
  document.getElementById('change-mode').setAttribute('onclick', 'window.location.reload();')
}


function changeMode(inputId) {
  document.getElementById(inputId).classList.toggle('twoPlayers')
  let checkMode = document.getElementById(inputId).getAttribute('class')
  if (checkMode === 'twoPlayers') {
    document.getElementById(inputId).innerHTML =
      '<i class="fa-solid fa-2"></i>' + '\n' + '<i class="fa-solid fa-p"></i>';
    document.getElementById('javascript').src='game2.js'

  } else {
    document.getElementById(inputId).innerHTML =
      '<i class="fa-solid fa-1"></i>' + '\n' + '<i class="fa-solid fa-p"></i>';
    document.getElementById('javascript').src='game3.js'
  }
}

let cells = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

function startGame(clickedId) {
  userPlay(clickedId)
  createReloadButton()
  modeToReload()
}
function userPlay(clickedId) {
  let classes = document.getElementById(clickedId).getAttribute('class')
  document.getElementById(clickedId).removeAttribute('onclick')
  if (classes.includes('user2')) {
    document.getElementById(clickedId).innerHTML = 'O'
  } else {
    document.getElementById(clickedId).innerHTML = 'X'
  }
  let removedCellNumber = clickedId.slice(4)
  let newCells = cells.filter((number) => number !== removedCellNumber)
  cells = newCells
  let tds = document.getElementsByTagName('td')
  for(let i=0; i<tds.length; i++){
    tds[i].classList.toggle('user2');
  }
    checkUserBingo()
}

function checkUserBingo() {
  let cellOne = document.getElementById('cell1').innerHTML
  let cellTwo = document.getElementById('cell2').innerHTML
  let cellThree = document.getElementById('cell3').innerHTML
  let cellFour = document.getElementById('cell4').innerHTML
  let cellFive = document.getElementById('cell5').innerHTML
  let cellSix = document.getElementById('cell6').innerHTML
  let cellSeven = document.getElementById('cell7').innerHTML
  let cellEight = document.getElementById('cell8').innerHTML
  let cellNine = document.getElementById('cell9').innerHTML
  if (
    (cellOne === 'X' && cellOne === cellTwo && cellTwo === cellThree) ||
    (cellOne === 'X' && cellOne === cellFive && cellFive === cellNine) ||
    (cellOne === 'X' && cellOne === cellFour && cellFour === cellSeven) ||
    (cellTwo === 'X' && cellTwo === cellFive && cellFive === cellEight) ||
    (cellThree === 'X' && cellThree === cellSix && cellSix === cellNine) ||
    (cellThree === 'X' && cellThree === cellFive && cellFive === cellSeven) ||
    (cellFour === 'X' && cellFour === cellFive && cellFive === cellSix) ||
    (cellSeven === 'X' && cellSeven === cellEight && cellEight === cellNine)
  ) {
    removeRestCellEvent()
    document.getElementById('table').setAttribute('class', 'transparent')
    document.getElementById('message-el').innerHTML = `"User 1 won the game!"`
  } else if (
    (cellOne === 'O' && cellOne === cellTwo && cellTwo === cellThree) ||
    (cellOne === 'O' && cellOne === cellFive && cellFive === cellNine) ||
    (cellOne === 'O' && cellOne === cellFour && cellFour === cellSeven) ||
    (cellTwo === 'O' && cellTwo === cellFive && cellFive === cellEight) ||
    (cellThree === 'O' && cellThree === cellSix && cellSix === cellNine) ||
    (cellThree === 'O' && cellThree === cellFive && cellFive === cellSeven) ||
    (cellFour === 'O' && cellFour === cellFive && cellFive === cellSix) ||
    (cellSeven === 'O' && cellSeven === cellEight && cellEight === cellNine)
  ) {
    removeRestCellEvent()
    document.getElementsById('table').setAttribute('class', 'transparent')
    document.getElementById('message-el').innerHTML = `"User 2 won the game!"`
  } else if (cells[0] === undefined){
    document.getElementById('message-el').innerHTML = `"Drew!"`
  }
}
function removeRestCellEvent() {
  cells.forEach((cellNumber) => {
    let cellIdName = 'cell' + cellNumber
    document.getElementById(cellIdName).removeAttribute('onclick')
  })
}
