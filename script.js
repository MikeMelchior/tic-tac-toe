
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
    const congratulateWinner = () => {
        setTimeout(() => {
            return winnerScreen.classList.add('visible')
        }, 500);
        
    }
    const checkWin = (board) => {
        if (board[0] == board[1] && board[1] == board[2] && board[2] != '') {
            congratulateWinner();
        } else if (board[3] == board[4] && board[4] == board[5] && board[5] != '') {
            congratulateWinner();
        } else if (board[6] == board[7] && board[7] == board[8] && board[8] != '') {
            congratulateWinner();
        } else if (board[0] == board[3] && board[3] == board[6] && board[6] != '') {
            congratulateWinner();
        } else if (board[1] == board[4] && board[4] == board[7] && board[7] != '') {
            congratulateWinner();
        } else if (board[2] == board[5] && board[5] == board[8]&& board[8] != '') {
            congratulateWinner();
        } else if (board[0] == board[4] && board[4] == board[8]&& board[8] != '') {
            congratulateWinner();
        } else if (board[2] == board[4] && board[4] == board[6]&& board[6] != '') {
            congratulateWinner();
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
        winnerScreen: winnerScreen,
    }
})();


player = {};







controls = (function() {

    const optionsWindow = document.querySelector('.options-window');
    const optionsButton = document.querySelector('.options-btn');
    const optionsExit = document.querySelector('.options-exit');
    //const winnerScreen = document.querySelector('.winner-screen')

    const showOptionsWindow = (e) => {
        optionsWindow.classList.add('visible');
    }

    const hideOptionsWindow = (e) => {
        optionsWindow.classList.remove('visible');
    }

    const hideWinnerScreen = () => {
        game.winnerScreen.classList.remove('visible');
        resetBoard();
    }

    const resetBoard = () => {

        for (let i = 0; i < 9; i++) {
            gameBoard.gameboard[i] = '';
        }
        gameBoard.updateBoard();
    }


    optionsButton.addEventListener('click', showOptionsWindow);
    optionsExit.addEventListener('click', hideOptionsWindow);
    document.querySelector('.reset-btn').addEventListener('click', resetBoard);
    game.winnerScreen.addEventListener('click', hideWinnerScreen)


    return {
        resetBoard: resetBoard,
    }

})();

    