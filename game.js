const INPUTPLAYER1 = document.getElementById('player1')
const INPUTPLAYER2 = document.getElementById('player2')
var board = document.getElementById('board')
var boardMessage = document.getElementById('message')
var btnStart = document.getElementById('start')
var btChange = document.getElementById('btChange')
var formPlayer = document.getElementById('formPlayer')
var gameStatus = document.getElementById('status')
var playing = document.getElementById('playing')
var game = {
  status: 'Inicio' || 'Jogando' || 'Fim do jogo',
  players: {
    player1: {
      name: '',
      simbol: 'X'
    },
    player2: {
      name: '',
      simbol: 'O'
    }
  },
  board: [],
  playing: player1 || player2,
  winConditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ],
  messege: '',
  boxes: document.querySelectorAll('.box'),
  winner: player1 || player2
}
function initBoard () {
  board.style.display = 'flex'
  formPlayer.style.display = 'none'
}
function cleanBoard () {
  for (var i = 0; i < 9; i++) {
    game.boxes[i].innerHTML = ''
    game.board[i] = undefined
  }
}
function initGame () {
  if (INPUTPLAYER1.value == '' || INPUTPLAYER2.value == '') {
    boardMessage.innerHTML = 'Digite os nomes dos Players!'
  } else {
    game.players.player1.name = INPUTPLAYER1.value
    game.players.player2.name = INPUTPLAYER2.value
    boardMessage.innerHTML = ''
    game.status = 'inicio'
    game.winner = ''
    game.playing = game.players.player1
    initBoard()
    cleanBoard()
    refreshState()
  }
}
function refreshState () {
  gameStatus.innerHTML = `Status : ${game.status}`
  if (game.winner != '') {
    playing.innerHTML = `O jogador : ${game.winner.name} ganhou`
  } else {
    playing.innerHTML = `Agora joga : ${game.playing.name}`
  }
}
function handleClick (cellClick) {
  if (game.status == 'Fim do jogo') {
    game.status = 'Inicio'
    game.playing = game.players.player1
    game.winner = ''
    cleanBoard()
  } else {
    game.status = 'Jogando'
    if (document.getElementById(cellClick.target.id).innerHTML == '') {
      document.getElementById(cellClick.target.id).innerHTML =
        game.playing.simbol
      game.board[cellClick.target.id] = game.playing.simbol
      verifyGame(game.board)
    }
  }
  refreshState()
}
function verifyGame (arr) {
  for (element of game.winConditions) {
    if (
      arr[element[0]] != undefined ||
      arr[element[1]] != undefined ||
      arr[element[2]] != undefined
    ) {
      if (
        arr[element[0]] == arr[element[1]] &&
        arr[element[1]] == arr[element[2]]
      ) {
        game.winner = game.playing
        game.status = 'Fim do jogo'
      }
    }
  }
  if (game.status != 'Fim do jogo') {
    game.playing == game.players.player1
      ? (game.playing = game.players.player2)
      : (game.playing = game.players.player1)
  }
}
function changePlayers () {
  board.style.display = 'none'
  formPlayer.style.display = 'flex'
}
btnStart.addEventListener('click', initGame)
btChange.addEventListener('click', changePlayers)
game.boxes.forEach(cell => cell.addEventListener('click', handleClick))
