
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
            game.winPosition = 'bottom-row';
            Strikethrough(game.winPosition);
            controls.congratulateWinner(); 
        } else if (board[0] == board[3] && board[3] == board[6] && board[6] != '') {
            game.winPosition = 'left-column';
            Strikethrough(game.winPosition);
            controls.congratulateWinner();
        } else if (board[1] == board[4] && board[4] == board[7] && board[7] != '') {
            game.winPosition = 'middle-column';
            Strikethrough(game.winPosition);
            controls.congratulateWinner();
        } else if (board[2] == board[5] && board[5] == board[8] && board[8] != '') {
            game.winPosition = 'right-column';
            Strikethrough(game.winPosition);    
            controls.congratulateWinner();
        } else if (board[0] == board[4] && board[4] == board[8] && board[8] != '') {
            game.winPosition = 'diagonal-right';
            Strikethrough(game.winPosition);
            controls.congratulateWinner();
        } else if (board[2] == board[4] && board[4] == board[6] && board[6] != '') {
            game.winPosition = 'diagonal-left';
            Strikethrough(game.winPosition);
            controls.congratulateWinner();
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
            playerOneTurn: playerOneTurn,
            playerTwoTurn: playerTwoTurn,
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

    const main = document.querySelector('.main');
    const optionsWindow = document.querySelector('.options-window');
    const optionsButton = document.querySelector('.options-btn');
    const optionsExit = document.querySelector('.options-exit');
    const winnerScreenExit = document.querySelector('.winner-screen>button');
    const resetBtn = document.querySelector('.reset-btn');
    const openResetConfirmation = document.querySelector('.open-reset-confirmation');
    const cancelReset = document.querySelector('.cancel-reset');
    const bgColorPicker = document.querySelector('#background-color-picker');
    const xoColorPicker = document.querySelector('#x-o-color-picker');
    const optionsApply = document.querySelector('.options-apply');

    const showOptionsWindow = (e) => {
        optionsWindow.classList.remove('hide');
        makeMainUnclickable()};

    const hideOptionsWindow = (e) => {
        optionsWindow.classList.add('hide');
        restoreMainClickability()};

    const showResetConfirmation = () => {
        document.querySelector('.reset-confirmation').classList.remove('hide')};

    const hideResetConfirmation = () => {
        document.querySelector('.reset-confirmation').classList.add('hide')};

    const winnerScreen = document.querySelector('.winner-screen');
    const congratulateWinner = () => {

        setTimeout(() => {
            return winnerScreen.classList.add('visible')
        }, 500);    
        makeMainUnclickable()};

    const hideWinnerScreen = () => {
        winnerScreen.classList.remove('visible');
        game.strike.classList.remove(game.winPosition)
        game.strike.classList.remove('visible');
        game.strike.classList.add('hide')
        resetBoard();
        restoreMainClickability();
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

    const resetTurns = () => {
        playerOneTurn = true;
        playerTwoTurn = false;
    }

    const setColors = () => {
        main.setAttribute('style',`background-color: ${bgColorPicker.value}`);
        xAndOs = document.querySelectorAll('.game-board>div>p');
        xAndOs.forEach(element => element.setAttribute('style', `color: ${xoColorPicker.value}`))
    }


    optionsButton.addEventListener('click', showOptionsWindow);
    optionsExit.addEventListener('click', hideOptionsWindow);
    resetBtn.addEventListener('click', resetBoard);
    resetBtn.addEventListener('click', resetTurns);
    resetBtn.addEventListener('click', hideResetConfirmation);
    winnerScreenExit.addEventListener('click', hideWinnerScreen);
    openResetConfirmation.addEventListener('click', showResetConfirmation);
    cancelReset.addEventListener('click', hideResetConfirmation);
    optionsApply.addEventListener('click', setColors);
    optionsApply.addEventListener('click', hideOptionsWindow);

    return {
        resetBoard: resetBoard,
        makeMainUnclickable: makeMainUnclickable,
        restoreMainClickability: restoreMainClickability,
        congratulateWinner: congratulateWinner,
    }

})();



