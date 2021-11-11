function Player(name, tag) {
    this.name = name
    this.tag = tag
};

let playerOne;
let playerTwo;

//Creating the board and putting each individual div into the boxes array for later use in the game() function
const gameBoard = (() => {
    const makeSquare = document.querySelector('.container-game')
    let board = []
    let boxes = []
    for (let i = 0; i < 9; i++) {
        board.push('')
    }
    board.forEach((e) => {
        const div = document.createElement('div')
        makeSquare.appendChild(div)
        div.classList.add('box') 
        boxes.push(div)
    })
    return {board, boxes}
})();

//Function for applyin the border around the X and O signs when choosing which player is which sign. 
//Also making sure the signs can't be same and that each player can only select one sign.
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

//Function for extracting the player name inputs for later use in submitForm().
const getPlayerNames = () => {
    const player1 = document.querySelector('.fPlayerName')
    const player2 = document.querySelector('.sPlayerName')
    let p1 = player1.value
    let p2 = player2.value
    return {p1, p2}
}

//Function for storing the right (selected) sign for later use in submitForm()
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

//Functionality for the submit button prompt.
//Hides the pop up window and creates the two player classes and also extracts them for later use in game().
const submitForm = (() => {

    const theForm = document.querySelector('.player-form-container')
    const formBtn = document.querySelector('.formBtn')

    formBtn.addEventListener('click', ()=>{
        const playerSigns = getPlayerTags()
        console.log(playerSigns)
        if (playerSigns.p1Tag === playerSigns.p2Tag){
            alert('You cannot choose the same sign for both players!')
            return
        } else{theForm.style.display = 'none'}

        playerOne = new Player(getPlayerNames().p1, playerSigns.p1Tag)
        playerTwo = new Player(getPlayerNames().p2, playerSigns.p2Tag)

        const playerIndicator = document.querySelector('.current-player')
        if (playerOne.tag === 'X') {
            playerIndicator.innerText = `${playerOne.name} (${playerOne.tag}) to play`
        }
        else if (playerTwo.tag === 'X') {
            playerIndicator.innerText = `${playerTwo.name} (${playerTwo.tag}) to play`
        }
        return {playerOne, playerTwo}
    })
})()

//The main function which creates the game
const game = (() => {
    let turn = 0;
    let currentPlayer;
    let valNum = 0

    
    let winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    //Aplies the right value for each div.box on the board for later use in checkWinner() where the values are matched with the corresponding number in winningAxes array
    const fields = document.querySelectorAll('.box')
    fields.forEach((e)=> {
        e.value = valNum
        valNum += 1
        console.log(e)
    })

    //Function which puts the X and O markers on the boards (div.box) while also keeping track of the current player.
    fields.forEach((e)=>{
        e.addEventListener('click', () => {

            if (turn % 2 === 0 && e.textContent === '') {
                if(playerOne.tag === 'X'){
                    currentPlayer = playerOne
                    e.textContent = playerOne.tag
                }
                else {
                    currentPlayer = playerTwo
                    e.textContent = playerTwo.tag
                }
                turn += 1
            }
            else if (turn % 2 !== 0 && e.textContent === '') {
                if(playerOne.tag === 'O'){
                    currentPlayer = playerOne
                    e.textContent = playerOne.tag
                }
                else {
                    currentPlayer = playerTwo
                    e.textContent = playerTwo.tag
                }
                turn += 1
            }
            checkWinner(e.value, e.textContent)
        })
    })

    //This function takes the value (div.value) and textContent (div.content) of every box clicked.
    //It matches the value with the coresponding winningAxes numbers and repplaces those numbers with the sign (textContent) of each box
    function checkWinner(boxValue, boxContent) {
        //This function checks whether an array's items are all the same ([X,X,X] = true). For figuring out if the winning condition has been met. 
        const isSame = currentArray => currentArray.every(value => value === currentArray[0])
        
        for (let i = 0; i <= 7; i++) {
            let index = winningAxes[i].indexOf(boxValue)
            winningAxes[i].forEach((item)=> {
                if(boxValue === item) {
                    winningAxes[i][index] = boxContent
                }
            })

            if(isSame(winningAxes[i])) {
                alert(`The winner is ${currentPlayer.name}!!`)
            }

        }
    }
})()
