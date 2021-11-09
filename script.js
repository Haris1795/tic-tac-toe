function Player(name, tag) {
    this.name = name
    this.tag = tag
};

let playerOne;
let playerTwo;

const gameBoard = (() => {
    const makeSquare = document.querySelector('.container-game')
    let board = []
    for (let i = 0; i < 9; i++) {
        board.push('')
    }
    board.forEach((e) => {
        const div = document.createElement('div')
        makeSquare.appendChild(div)
        div.classList.add('box')
    })
    return {board}
})();

const tagPicker = (()=> {
    const pOneTags = document.querySelectorAll('.signOne')
    const pTwoTags = document.querySelectorAll('.signTwo')

    let status = false
    let status2 = false

    pOneTags.forEach((e)=>{
        e.addEventListener('click', () => {
            if (status === false) {
                e.classList.add('signBorder')
                status = true         
            }
            else if (status === true) {
                if(e.classList.contains('signBorder')) {
                    e.classList.remove('signBorder')
                    status = false
                }
                else {return}
            }
        })
    })

    pTwoTags.forEach((e)=>{
        e.addEventListener('click', () => {
            if (status2 === false) {
                e.classList.add('signBorder')
                status2 = true         
            }
            else if (status2 === true) {
                if(e.classList.contains('signBorder')) {
                    e.classList.remove('signBorder')
                    status2 = false
                }
                else {return}
            }
        })
    })
})()

const getPlayerNames = () => {
    const player1 = document.querySelector('.fPlayerName')
    const player2 = document.querySelector('.sPlayerName')
    let p1 = player1.value
    let p2 = player2.value
    return {p1, p2}
}

function getPlayerTags(){
    const pOneTags = document.querySelectorAll('.signOne')
    const pTwoTags = document.querySelectorAll('.signTwo')

    let p1Tag;
    let p2Tag;

    pOneTags.forEach((e)=>{
        if(e.classList.contains('signBorder')){
            p1Tag = e.textContent
        }
    })

    pTwoTags.forEach((e)=>{
        if(e.classList.contains('signBorder')){
            p2Tag = e.textContent
        }
    })
    return {p1Tag, p2Tag}
}

const submitForm = (() => {

    const theForm = document.querySelector('.player-form-container')
    const formBtn = document.querySelector('.formBtn')

    formBtn.addEventListener('click', ()=>{
        const playerSigns = getPlayerTags()
        console.log(playerSigns)
        if (playerSigns.p1Tag === playerSigns.p2Tag){
            alert('You cannot choose the same sign for both players!')
            return
        }
        else{theForm.style.display = 'none'}

        playerOne = new Player(getPlayerNames().p1, playerSigns.p1Tag)
        playerTwo = new Player(getPlayerNames().p2, playerSigns.p2Tag)

        const playerIndicator = document.querySelector('.current-player')

        if (playerOne.tag === 'X') {
            playerIndicator.innerText = `${playerOne.name} (${playerOne.tag}) to play`
        }
        else if (playerTwo.tag === 'X') {
            playerIndicator.innerText = `${playerTwo.name} (${playerTwo.tag}) to play`
        }
    })
})()

const game = (() => {
    const board = gameBoard.board;
    let turn = 0;
    
    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    const fields = document.querySelectorAll('.box')

    fields.forEach((e)=>{
        e.addEventListener('click', () => {
            console.log(e)
            if (turn % 2 === 0) {
                console.log('it is')
                e.textContent = 'X'
                board[turn] = 'X'
                turn += 1
            }
            else {
                console.log('it isnt')
                e.textContent = 'O'
                board[turn] = 'O'
                turn += 1
            }
            if (turn >= 5){
                checkWinner()
            }
        })
    })

    function checkWinner() {

        console.log(board)
    }
})()

