function Player(name, tag) {
    this.name = name
    this.tag = tag
};

const enterPlayerInfo = (() => {
    const form = document.createElement('input')
    const formContainer = document.querySelector('.player-form-container')
    formContainer.appendChild(form)
    form.classList.add('player-form')


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

const makePlayerMove = () => {

}