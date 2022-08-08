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

let innerCell1 = document.getElementById('cell1').innerHTML
let innerCell2 = document.getElementById('cell2').innerHTML
let innerCell3 = document.getElementById('cell3').innerHTML
let innerCell4 = document.getElementById('cell4').innerHTML
let innerCell5 = document.getElementById('cell5').innerHTML
let innerCell6 = document.getElementById('cell6').innerHTML
let innerCell7 = document.getElementById('cell7').innerHTML
let innerCell8 = document.getElementById('cell8').innerHTML
let innerCell9 = document.getElementById('cell9').innerHTML

let mustSelect = ''
let checking = false

function startGame(clickedId) {
  for (let i = 0; i < cells.length; i++) {
    document.getElementsByTagName('td')[i].removeAttribute('onclick')
  }
  userPlay(clickedId)
  createReloadButton()
  modeToReload()
}

function userPlay(clickedId) {
  clickedCellDisabled(document.getElementById(clickedId))
  let clickedCellNumber = clickedId.slice(4)
  updateAvailableCells(clickedCellNumber)
  document.getElementById(clickedId).innerHTML = 'X'
  updateInnerCells()
  if (checkUserBingo()) {
    removeRestCellEvent()
    document.getElementById('table').setAttribute('class', 'transparent')
    document.getElementById('message-el').innerHTML = `"You've won the game!"`
  } else {
    if (cells[0] === undefined) {
      document.getElementById('table').setAttribute('class', 'transparent')
      document.getElementById('message-el').innerHTML = `"Drew!"`
    } else {
      setTimeout('computerPlay()', '500')
    }
  }
}

function computerPlay() {
  console.log(cells)
  let selectedCellId = ''
  checkAttack()
  if (checking) {
    selectedCellId = 'cell' + mustSelect
    console.log(selectedCellId)
    updateAvailableCells(mustSelect)
    initiateChecking()
  } else {
    checkDefence()
    console.log(checking)
    if (checking) {
      selectedCellId = 'cell' + mustSelect
      console.log(selectedCellId)
      updateAvailableCells(mustSelect)
      initiateChecking()
    } else {
      checkSemiAttackCellOne()
      if (checking) {
        selectedCellId = 'cell' + mustSelect
        console.log(selectedCellId)
        updateAvailableCells(mustSelect)
        initiateChecking()
      } else {
        let randomCellsInd = getRandomNumber()
        let selectedCellNumber = cells[randomCellsInd]
        updateAvailableCells(selectedCellNumber)
        selectedCellId = 'cell' + selectedCellNumber
      }
    }
  }
  clickedCellDisabled(document.getElementById(selectedCellId))
  document.getElementById(selectedCellId).innerHTML = 'O'
  updateInnerCells()

  if (checkComputerBingo()) {
    removeRestCellEvent()
    document.getElementById('table').setAttribute('class', 'transparent')
    document.getElementById('message-el').innerHTML = `"You've lost the game!"`
  } else {
    if (cells[0] === undefined) {
      document.getElementById('table').setAttribute('class', 'transparent')
      document.getElementById('message-el').innerHTML = `"Drew!"`
    } else {
      changeToUserTurn()
    }
  }
}

function changeToUserTurn() {
  let tds = document.getElementsByTagName('td')
  for (let i = 0; i < 9; i++) {
    if (tds[i].disabled === undefined) {
      tds[i].setAttribute('onclick', 'userPlay(this.id)')
    }
  }
}

function initiateChecking() {
  mustSelect = ''
  checking = false
}

function updateInnerCells() {
  innerCell1 = document.getElementById('cell1').innerHTML
  innerCell2 = document.getElementById('cell2').innerHTML
  innerCell3 = document.getElementById('cell3').innerHTML
  innerCell4 = document.getElementById('cell4').innerHTML
  innerCell5 = document.getElementById('cell5').innerHTML
  innerCell6 = document.getElementById('cell6').innerHTML
  innerCell7 = document.getElementById('cell7').innerHTML
  innerCell8 = document.getElementById('cell8').innerHTML
  innerCell9 = document.getElementById('cell9').innerHTML
}

function updateAvailableCells(clickedCellNumber) {
  cells = cells.filter((cellNumber) => cellNumber !== clickedCellNumber)
  return cells
}

function clickedCellDisabled(cell) {
  cell.disabled = true
}

function getRandomNumber() {
  return Math.floor(Math.random() * (cells.length - 1)) + 1
}

function checkAttack() {
  let whileCheck = false
  while (whileCheck === false) {
    if (checkAttackCellOne()) {
      mustSelect = '1'
      checking = true
      whileCheck = true
    } else if (checkAttackCellTwo()) {
      mustSelect = '2'
      checking = true
      whileCheck = true
    } else if (checkAttackCellThree()) {
      mustSelect = '3'
      checking = true
      whileCheck = true
    } else if (checkAttackCellFour()) {
      mustSelect = '4'
      checking = true
      whileCheck = true
    } else if (checkAttackCellFive()) {
      mustSelect = '5'
      checking = true
      whileCheck = true
    } else if (checkAttackCellSix()) {
      mustSelect = '6'
      checking = true
      whileCheck = true
    } else if (checkAttackCellSeven()) {
      mustSelect = '7'
      checking = true
      whileCheck = true
    } else if (checkAttackCellEight()) {
      mustSelect = '8'
      checking = true
      whileCheck = true
    } else if (checkAttackCellNine()) {
      mustSelect = '9'
      checking = true
      whileCheck = true
    } else {
      break
    }
  }
}

function checkAttackCellOne() {
  if (innerCell1 === '' && innerCell2 === 'O' && innerCell2 === innerCell3) {
    return true
  } else if (innerCell1 === '' && innerCell5 === 'O' && innerCell5 === innerCell9) {
    return true
  } else if (innerCell1 === '' && innerCell4 === 'O' && innerCell4 === innerCell7) {
    return true
  } else {
    return false
  }
}

function checkAttackCellTwo() {
  if (innerCell2 === '' && innerCell1 === 'O' && innerCell1 === innerCell3) {
    return true
  } else if (innerCell2 === '' && innerCell5 === 'O' && innerCell5 === innerCell8) {
    return true
  } else {
    return false
  }
}

function checkAttackCellThree() {
  if (innerCell3 === '' && innerCell1 === 'O' && innerCell1 === innerCell2) {
    return true
  } else if (innerCell3 === '' && innerCell5 === 'O' && innerCell5 === innerCell7) {
    return true
  } else if (innerCell3 === '' && innerCell6 === 'O' && innerCell6 === innerCell9) {
    return true
  } else {
    return false
  }
}

function checkAttackCellFour() {
  if (innerCell4 === '' && innerCell1 === 'O' && innerCell1 === innerCell7) {
    return true
  } else if (innerCell4 === '' && innerCell5 === 'O' && innerCell5 === innerCell6) {
    return true
  } else {
    return false
  }
}

function checkAttackCellFive() {
  if (innerCell5 === '' && innerCell1 === 'O' && innerCell1 === innerCell9) {
    return true
  } else if (innerCell5 === '' && innerCell2 === 'O' && innerCell2 === innerCell8) {
    return true
  } else if (innerCell5 === '' && innerCell4 === 'O' && innerCell4 === innerCell6) {
    return true
  } else {
    return false
  }
}

function checkAttackCellSix() {
  if (innerCell6 === '' && innerCell3 === 'O' && innerCell3 === innerCell9) {
    return true
  } else if (innerCell6 === '' && innerCell4 === 'O' && innerCell4 === innerCell5) {
    return true
  } else {
    return false
  }
}

function checkAttackCellSeven() {
  if (innerCell7 === '' && innerCell1 === 'O' && innerCell1 === innerCell4) {
    return true
  } else if (innerCell7 === '' && innerCell5 === 'O' && innerCell5 === innerCell3) {
    return true
  } else if (innerCell7 === '' && innerCell8 === 'O' && innerCell8 === innerCell9) {
    return true
  } else {
    return false
  }
}

function checkAttackCellEight() {
  if (innerCell8 === '' && innerCell2 === 'O' && innerCell2 === innerCell5) {
    return true
  } else if (innerCell8 === '' && innerCell7 === 'O' && innerCell7 === innerCell9) {
    return true
  } else {
    return false
  }
}

function checkAttackCellNine() {
  if (innerCell9 === '' && innerCell1 === 'O' && innerCell1 === innerCell5) {
    return true
  } else if (innerCell9 === '' && innerCell3 === 'O' && innerCell3 === innerCell6) {
    return true
  } else if (innerCell9 === '' && innerCell7 === 'O' && innerCell7 === innerCell8) {
    return true
  } else {
    return false
  }
}

function checkDefence() {
  let whileCheck = false
  while (whileCheck === false) {
    if (checkDefCellOne()) {
      mustSelect = '1'
      checking = true
      whileCheck = true
    } else if (checkDefCellTwo()) {
      mustSelect = '2'
      checking = true
      whileCheck = true
    } else if (checkDefCellThree()) {
      mustSelect = '3'
      checking = true
      whileCheck = true
    } else if (checkDefCellFour()) {
      mustSelect = '4'
      checking = true
      whileCheck = true
    } else if (checkDefCellFive()) {
      mustSelect = '5'
      checking = true
      whileCheck = true
    } else if (checkDefCellSix()) {
      mustSelect = '6'
      checking = true
      whileCheck = true
    } else if (checkDefCellSeven()) {
      mustSelect = '7'
      checking = true
      whileCheck = true
    } else if (checkDefCellEight()) {
      mustSelect = '8'
      checking = true
      whileCheck = true
    } else if (checkDefCellNine()) {
      mustSelect = '9'
      checking = true
      whileCheck = true
    } else {
      break
    }
  }
}

function checkDefCellOne() {
  if (innerCell1 === '' && innerCell2 === 'X' && innerCell2 === innerCell3) {
    return true
  } else if (innerCell1 === '' && innerCell5 === 'X' && innerCell5 === innerCell9) {
    return false
  } else if (innerCell1 === '' && innerCell4 === 'X' && innerCell4 === innerCell7) {
    return false
  } else {
    return false
  }
}

function checkDefCellTwo() {
  if (innerCell2 === '' && innerCell1 === 'X' && innerCell1 === innerCell3) {
    return true
  } else if (innerCell2 === '' && innerCell5 === 'X' && innerCell5 === innerCell8) {
    return true
  } else {
    return false
  }
}

function checkDefCellThree() {
  if (innerCell3 === '' && innerCell1 === 'X' && innerCell1 === innerCell2) {
    return true
  } else if (innerCell3 === '' && innerCell5 === 'X' && innerCell5 === innerCell7) {
    return true
  } else if (innerCell3 === '' && innerCell6 === 'X' && innerCell6 === innerCell9) {
    return true
  } else {
    return false
  }
}

function checkDefCellFour() {
  if (innerCell4 === '' && innerCell1 === 'X' && innerCell1 === innerCell7) {
    return true
  } else if (innerCell4 === '' && innerCell5 === 'X' && innerCell5 === innerCell6) {
    return true
  } else {
    return false
  }
}

function checkDefCellFive() {
  if (innerCell5 === '' && innerCell1 === 'X' && innerCell1 === innerCell9) {
    return true
  } else if (innerCell5 === '' && innerCell2 === 'X' && innerCell2 === innerCell8) {
    return true
  } else if (innerCell5 === '' && innerCell4 === 'X' && innerCell4 === innerCell6) {
    return true
  } else {
    return false
  }
}

function checkDefCellSix() {
  if (innerCell6 === '' && innerCell3 === 'X' && innerCell3 === innerCell9) {
    return true
  } else if (innerCell6 === '' && innerCell4 === 'X' && innerCell4 === innerCell5) {
    return true
  } else {
    return false
  }
}

function checkDefCellSeven() {
  if (innerCell7 === '' && innerCell1 === 'X' && innerCell1 === innerCell4) {
    return true
  } else if (innerCell7 === '' && innerCell5 === 'X' && innerCell5 === innerCell3) {
    return true
  } else if (innerCell7 === '' && innerCell8 === 'X' && innerCell8 === innerCell9) {
    return true
  } else {
    return false
  }
}

function checkDefCellEight() {
  if (innerCell8 === '' && innerCell2 === 'X' && innerCell2 === innerCell5) {
    return true
  } else if (innerCell8 === '' && innerCell7 === 'X' && innerCell7 === innerCell9) {
    return true
  } else {
    return false
  }
}

function checkDefCellNine() {
  if (innerCell9 === '' && innerCell1 === 'X' && innerCell1 === innerCell5) {
    return true
  } else if (innerCell9 === '' && innerCell3 === 'X' && innerCell3 === innerCell6) {
    return true
  } else if (innerCell9 === '' && innerCell7 === 'X' && innerCell7 === innerCell8) {
    return true
  } else {
    return false
  }
}

function checkSemiAttack() {
  let whileCheck = false
  while (whileCheck === false) {
    if (checkSemiAttackCellOne()) {
      mustSelect = '1'
      checking = true
      whileCheck = true
    } else if (checkSemiAttackCellTwo()) {
      mustSelect = '2'
      checking = true
      whileCheck = true
    } else if (checkSemiAttackCellThree()) {
      mustSelect = '3'
      checking = true
      whileCheck = true
    } else if (checkSemiAttackCellFour()) {
      mustSelect = '4'
      checking = true
      whileCheck = true
    } else if (checkSemiAttackCellFive()) {
      mustSelect = '5'
      checking = true
      whileCheck = true
    } else if (checkSemiAttackCellSix()) {
      mustSelect = '6'
      checking = true
      whileCheck = true
    } else if (checkSemiAttackCellSeven()) {
      mustSelect = '7'
      checking = true
      whileCheck = true
    } else if (checkSemiAttackCellEight()) {
      mustSelect = '8'
      checking = true
      whileCheck = true
    } else if (checkSemiAttackCellNine()) {
      mustSelect = '9'
      checking = true
      whileCheck = true
    } else {
      break
    }
  }
}

function checkSemiAttackCellOne() {
  if (
    (innerCell1 === '' && innerCell2 === 'O' && innerCell3 === '') ||
    (innerCell1 === '' && innerCell3 === 'O' && innerCell2 === '')
  ) {
    return true
  } else if (
    (innerCell1 === '' && innerCell5 === 'O' && innerCell9 === '') ||
    (innerCell1 === '' && innerCell9 === 'O' && innerCell5 === '')
  ) {
    return true
  } else if (
    (innerCell1 === '' && innerCell4 === 'O' && innerCell7 === '') ||
    (innerCell1 === '' && innerCell7 === 'O' && innerCell4 === '')
  ) {
    return true
  } else {
    return false
  }
}

function checkSemiAttackCellTwo() {
  if (
    (innerCell2 === '' && innerCell1 === 'O' && innerCell3 === '') ||
    (innerCell2 === '' && innerCell3 === 'O' && innerCell1 === '')
  ) {
    return true
  } else if (
    (innerCell2 === '' && innerCell5 === 'O' && innerCell8 === '') ||
    (innerCell2 === '' && innerCell8 === 'O' && innerCell5 === '')
  ) {
    return true
  } else {
    return false
  }
}

function checkSemiAttackCellThree() {
  if (
    (innerCell3 === '' && innerCell1 === 'O' && innerCell2 === '') ||
    (innerCell3 === '' && innerCell2 === 'O' && innerCell1 === '')
  ) {
    return true
  } else if (
    (innerCell3 === '' && innerCell5 === 'O' && innerCell7 === '') ||
    (innerCell3 === '' && innerCell7 === 'O' && innerCell5 === '')
  ) {
    return true
  } else if (
    (innerCell3 === '' && innerCell6 === 'O' && innerCell9 === '') ||
    (innerCell3 === '' && innerCell9 === 'O' && innerCell6 === '')
  ) {
    return true
  } else {
    return false
  }
}

function checkSemiAttackCellFour() {
  if (
    (innerCell4 === '' && innerCell1 === 'O' && innerCell7 === '') ||
    (innerCell4 === '' && innerCell7 === 'O' && innerCell1 === '')
  ) {
    return true
  } else if (
    (innerCell4 === '' && innerCell5 === 'O' && innerCell6 === '') ||
    (innerCell4 === '' && innerCell6 === 'O' && innerCell5 === '')
  ) {
    return true
  } else {
    return false
  }
}

function checkSemiAttackCellFive() {
  if (
    (innerCell5 === '' && innerCell1 === 'O' && innerCell9 === '') ||
    (innerCell5 === '' && innerCell9 === 'O' && innerCell1 === '')
  ) {
    return true
  } else if (
    (innerCell5 === '' && innerCell2 === 'O' && innerCell8 === '') ||
    (innerCell5 === '' && innerCell8 === 'O' && innerCell2 === '')
  ) {
    return true
  } else if (
    (innerCell5 === '' && innerCell4 === 'O' && innerCell6 === '') ||
    (innerCell5 === '' && innerCell6 === 'O' && innerCell4 === '')
  ) {
    return true
  } else {
    return false
  }
}

function checkSemiAttackCellSix() {
  if (
    (innerCell6 === '' && innerCell3 === 'O' && innerCell9 === '') ||
    (innerCell6 === '' && innerCell9 === 'O' && innerCell3 === '')
  ) {
    return true
  } else if (
    (innerCell6 === '' && innerCell4 === 'O' && innerCell5 === '') ||
    (innerCell6 === '' && innerCell5 === 'O' && innerCell4 === '')
  ) {
    return true
  } else {
    return false
  }
}

function checkSemiAttackCellSeven() {
  if (
    (innerCell7 === '' && innerCell1 === 'O' && innerCell4 === '') ||
    (innerCell7 === '' && innerCell4 === 'O' && innerCell1 === '')
  ) {
    return true
  } else if (
    (innerCell7 === '' && innerCell5 === 'O' && innerCell3 === '') ||
    (innerCell7 === '' && innerCell3 === 'O' && innerCell5 === '')
  ) {
    return true
  } else if (
    (innerCell7 === '' && innerCell8 === 'O' && innerCell9 === '') ||
    (innerCell7 === '' && innerCell9 === 'O' && innerCell8 === '')
  ) {
    return true
  } else {
    return false
  }
}

function checkSemiAttackCellEight() {
  if (
    (innerCell8 === '' && innerCell2 === 'O' && innerCell5 === '') ||
    (innerCell8 === '' && innerCell5 === 'O' && innerCell2 === '')
  ) {
    return true
  } else if (
    (innerCell8 === '' && innerCell7 === 'O' && innerCell9 === '') ||
    (innerCell8 === '' && innerCell9 === 'O' && innerCell7 === '')
  ) {
    return true
  } else {
    return false
  }
}

function checkSemiAttackCellNine() {
  if (
    (innerCell9 === '' && innerCell1 === 'O' && innerCell5 === 'O') ||
    (innerCell9 === '' && innerCell5 === 'O' && innerCell1 === 'O')
  ) {
    return true
  } else if (
    (innerCell9 === '' && innerCell3 === 'O' && innerCell6 === '') ||
    (innerCell9 === '' && innerCell6 === 'O' && innerCell3 === '')
  ) {
    return true
  } else if (
    (innerCell9 === '' && innerCell7 === 'O' && innerCell8 === '') ||
    (innerCell9 === '' && innerCell8 === 'O' && innerCell7 === '')
  ) {
    return true
  } else {
    return false
  }
}

function checkUserBingo() {
  if (
    (innerCell1 === 'X' && innerCell1 === innerCell2 && innerCell2 === innerCell3) ||
    (innerCell1 === 'X' && innerCell1 === innerCell5 && innerCell5 === innerCell9) ||
    (innerCell1 === 'X' && innerCell1 === innerCell4 && innerCell4 === innerCell7) ||
    (innerCell2 === 'X' && innerCell2 === innerCell5 && innerCell5 === innerCell8) ||
    (innerCell3 === 'X' && innerCell3 === innerCell6 && innerCell6 === innerCell9) ||
    (innerCell3 === 'X' && innerCell3 === innerCell5 && innerCell5 === innerCell7) ||
    (innerCell4 === 'X' && innerCell4 === innerCell5 && innerCell5 === innerCell6) ||
    (innerCell7 === 'X' && innerCell7 === innerCell8 && innerCell8 === innerCell9)
  ) {
    return true
  } else {
    return false
  }
}

function checkComputerBingo() {
  if (
    (innerCell1 === 'O' && innerCell1 === innerCell2 && innerCell2 === innerCell3) ||
    (innerCell1 === 'O' && innerCell1 === innerCell5 && innerCell5 === innerCell9) ||
    (innerCell1 === 'O' && innerCell1 === innerCell4 && innerCell4 === innerCell7) ||
    (innerCell2 === 'O' && innerCell2 === innerCell5 && innerCell5 === innerCell8) ||
    (innerCell3 === 'O' && innerCell3 === innerCell6 && innerCell6 === innerCell9) ||
    (innerCell3 === 'O' && innerCell3 === innerCell5 && innerCell5 === innerCell7) ||
    (innerCell4 === 'O' && innerCell4 === innerCell5 && innerCell5 === innerCell6) ||
    (innerCell7 === 'O' && innerCell7 === innerCell8 && innerCell8 === innerCell9)
  ) {
    return true
  } else {
    return false
  }
}

function removeRestCellEvent() {
  cells.forEach((cellNumber) => {
    let cellIdName = 'cell' + cellNumber
    document.getElementById(cellIdName).removeAttribute('onclick')
  })
}
