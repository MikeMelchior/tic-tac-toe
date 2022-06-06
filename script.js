
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

    let winPosition = '';

    const strike = document.querySelector('.strikethrough');
    const Strikethrough = (position) => {

        strike.classList.add(position);
        strike.classList.remove('hide'); 
    };

    const checkWin = (board) => {
        if (board[0] == board[1] && board[1] == board[2] && board[2] != '') {
            game.winPosition = 'top-row';
            Strikethrough(game.winPosition);
            controls.congratulateWinner();
        } else if (board[3] == board[4] && board[4] == board[5] && board[5] != '') {
            game.winPosition = 'middle-row';
            Strikethrough(game.winPosition);
            controls.congratulateWinner();
            
        } else if (board[6] == board[7] && board[7] == board[8] && board[8] != '') {
            congratulateWinner();
            Strikethrough('bottom-row');
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
            //---
        }
    })();


    const vsComputer = (function() {

    })();



    return {
        singlePlayerGame: singlePlayerGame,
        vsComputer: vsComputer,
        strike: strike,
        winPosition: winPosition,
    }
})();


player = {};







controls = (function() {

    const optionsWindow = document.querySelector('.options-window');
    const optionsButton = document.querySelector('.options-btn');
    const optionsExit = document.querySelector('.options-exit');
    const winnerScreenExit = document.querySelector('.winner-screen>button')

    const showOptionsWindow = (e) => {
        optionsWindow.classList.add('visible');
        makeMainUnclickable();
    }

    const hideOptionsWindow = (e) => {
        optionsWindow.classList.remove('visible');
        restoreMainClickability();
    }

    const winnerScreen = document.querySelector('.winner-screen');
    const congratulateWinner = () => {
        setTimeout(() => {
            return winnerScreen.classList.add('visible')
        }, 500);    
    }

    const hideWinnerScreen = () => {
        winnerScreen.classList.remove('visible');
        game.strike.classList.remove(game.winPosition)
        game.strike.classList.remove('visible');
        game.strike.classList.add('hide')
        resetBoard();
    }

    const makeMainUnclickable = () => {
        document.querySelector('.main').classList.add('unclickable');
    }

    const restoreMainClickability = () => {
        document.querySelector('.main').classList.remove('unclickable');
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
    winnerScreenExit.addEventListener('click', hideWinnerScreen)


    return {
        resetBoard: resetBoard,
        makeMainUnclickable: makeMainUnclickable,
        restoreMainClickability: restoreMainClickability,
        congratulateWinner: congratulateWinner,
    }

})();


const addStuff = () => {
    document.querySelector('.main').classList.add('one','two');
}

document.querySelector('.main').addEventListener('click', addStuff)