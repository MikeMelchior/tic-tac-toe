
const gameBoard = (function() {

    let gameboard = ['', '', '', '', '', '', '', '', ''];



    

    const updateBoard = () => {
        for (let i = 0; i < 9; i ++) {
            document.querySelector(`.square-${i}`).children[0].textContent = gameboard[i];
        }
    }

    return {
        updateBoard: updateBoard,
        gameboard: gameboard,
    };

})();



const game = (function() {
    const winnerScreen = document.querySelector('.winner-screen');
    const checkWin = (board) => {
        if (board[0] == board[1] && board[1] == board[2]) {
            winnerScreen.classList.add('visible');
        } else if (board[3] == board[4] && board[4] == board[5]) {
            winnerScreen.classList.add('visible');
        } else if (board[6] == board[7] && board[7] == board[8]) {
            winnerScreen.classList.add('visible');
        } else if (board[0] == board[3] && board[3] == board[6]) {
            winnerScreen.classList.add('visible');
        } else if (board[1] == board[4] && board[4] == board[7]) {
            winnerScreen.classList.add('visible');
        } else if (board[2] == board[5] && board[5] == board[8]) {
            winnerScreen.classList.add('visible');
        } else if (board[0] == board[4] && board[4] == board[8]) {
            winnerScreen.classList.add('visible');
        } else if (board[2] == board[4] && board[4] == board[6]) {
            winnerScreen.classList.add('visible');
        } else return
    };

    const singlePlayerGame = (function() {
        playerOneTurn = true;
        playerTwoTurn = false;

        const switchTurns = () => {
            playerOneTurn = !playerOneTurn,
            playerTwoTurn = !playerTwoTurn
        }
        
        const makeMove = (e) => {
            if(e.target.children[0].textContent != '') {
                return 
            } else if (playerOneTurn){
                gameBoard.gameboard[e.target.classList[0].split('-')[1]] = 'x'
                gameBoard.updateBoard();
                checkWin(gameBoard.gameboard);
                switchTurns();
            } else {
                gameBoard.gameboard[e.target.classList[0].split('-')[1]] = 'o'
                gameBoard.updateBoard();
                checkWin(gameBoard.gameboard);
                switchTurns();
            }

        }

        document.querySelectorAll('.game-board>div').forEach(square => {
                square.addEventListener('click', makeMove)
            });;

        return {
            
        }
    })();


    const vsComputer = (function() {

    })();



    return {
        singlePlayerGame: singlePlayerGame,
        vsComputer: vsComputer,
    }
})();


player = {};







controls = (function() {

    const optionsWindow = document.querySelector('.options-window');
    const optionsButton = document.querySelector('.options-btn');
    const optionsExit = document.querySelector('.options-exit');

    const showOptionsWindow = (e) => {
        optionsWindow.classList.add('visible');
    }

    const hideOptionsWindow = (e) => {
        optionsWindow.classList.remove('visible');
    }

    optionsButton.addEventListener('click', showOptionsWindow);
    optionsExit.addEventListener('click', hideOptionsWindow);

    const resetBoard = (e) => {
        gameBoard.gameboard = gameBoard.gameboard.map(x => x = '');
    }

    document.querySelector('.reset-btn').addEventListener('click', resetBoard);



    return {
        
    }

})();

    