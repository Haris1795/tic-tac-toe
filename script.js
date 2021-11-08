function Player(name, tag) {
    this.name = name
    this.tag = tag
};


const enterPlayerInfo = (() => {
    const form = document.createElement('input')
    const formContainer = document.querySelector('.player-form-container')
})()

const player1 = new Player('Haris', 'X');

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
})();

const playerTurn = (() => {
    const div = document.querySelector('.box')
    div.addEventListener('click', makePlayerMove())
});

const makePlayerMove = () => {}

const tagPicker = (()=> {
    const pOneTags = document.querySelectorAll('.signOne')
    const pTwoTags = document.querySelectorAll('.signTwo')

    let status = false
    let status2 = false

    pOneTags.forEach((e)=>{
        console.log('p1s firing')
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
        console.log('p2s firing')
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

function getPlayerNames() {
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
    })
})()

const restartBtn = (()=>{
    let btn = document.querySelector('.restart')
})()