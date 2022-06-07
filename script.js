
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

    let winPosition = null;
    let gameMode = 'pvp';

    const strike = document.querySelector('.strikethrough');
    const Strikethrough = (position) => {

        strike.classList.add(position);
        strike.classList.remove('hide'); 
    };

    const returnWinPosition = () => {
        return winPosition;
    }

    const resetWinPosition = () => {
        winPosition = null;
    }

    
    const removeGameMode = (mode) => {
        document.querySelectorAll('.game-board>div').forEach(square => {
            let old_element = square
            let new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
        })
    }

    const setGameMode = (mode) => {
        if (gameMode == 'pvp') {
            document.querySelectorAll('.game-board>div').forEach(square => {
                square.addEventListener('click', mode)
            });
        } else if (gameMode = 'ai') {
            //do stuff here
        } 
    }

    const checkWin = (board) => {
        if (board[0] == board[1] && board[1] == board[2] && board[2] != '') {
            winPosition = 'top-row';
            Strikethrough(winPosition);
            controls.congratulateWinner();
        } else if (board[3] == board[4] && board[4] == board[5] && board[5] != '') {
            winPosition = 'middle-row';
            Strikethrough(winPosition);
            controls.congratulateWinner();     
        } else if (board[6] == board[7] && board[7] == board[8] && board[8] != '') {
            winPosition = 'bottom-row';
            Strikethrough(winPosition);
            controls.congratulateWinner(); 
        } else if (board[0] == board[3] && board[3] == board[6] && board[6] != '') {
            winPosition = 'left-column';
            Strikethrough(winPosition);
            controls.congratulateWinner();
        } else if (board[1] == board[4] && board[4] == board[7] && board[7] != '') {
            winPosition = 'middle-column';
            Strikethrough(winPosition);
            controls.congratulateWinner();
        } else if (board[2] == board[5] && board[5] == board[8] && board[8] != '') {
            winPosition = 'right-column';
            Strikethrough(winPosition);    
            controls.congratulateWinner();
        } else if (board[0] == board[4] && board[4] == board[8] && board[8] != '') {
            winPosition = 'diagonal-right';
            Strikethrough(winPosition);
            controls.congratulateWinner();
        } else if (board[2] == board[4] && board[4] == board[6] && board[6] != '') {
            winPosition = 'diagonal-left';
            Strikethrough(winPosition);
            controls.congratulateWinner();
        } else return
    };

    const twoPlayerGame = (function() {
        
        playerOneTurn = true;
        playerTwoTurn = false;
        playerOneName = null;
        playerTwoName = null;

        controls.highlightPlayer();

        const switchTurns = () => {
            playerOneTurn = !playerOneTurn,
            playerTwoTurn = !playerTwoTurn
            controls.highlightPlayer();
        }
        
        const pvpMode = (e) => {
            if(e.target.children[0].textContent != '') {
                return 
            } else if (playerOneTurn){
                gameBoard.gameboard[e.target.classList[0].split('-')[1]] = 'x'
                gameBoard.updateBoard();
                checkWin(gameBoard.gameboard);
                if (winPosition != null) {
                    controls.setPlayerScore(playerOne);
                }
                switchTurns();
            } else {
                gameBoard.gameboard[e.target.classList[0].split('-')[1]] = 'o'
                gameBoard.updateBoard();
                checkWin(gameBoard.gameboard);
                if (winPosition != null) {
                    controls.setPlayerScore(playerTwo);
                }
                switchTurns();
            }
        }
        setGameMode(pvpMode);
        
        
    });


    const vsComputer = (function() {
        game.gameMode = 'ai'
    });



    return {
        twoPlayerGame: twoPlayerGame,
        vsComputer: vsComputer,
        strike: strike,
        returnWinPosition: returnWinPosition,
        resetWinPosition: resetWinPosition,
        gameMode: gameMode,
        removeGameMode: removeGameMode, 
    }
})();




//------------------------------------------------------------------------
const player = (name) => {
    let score = 0;
    
    return {name, score}
};




//--------------------------------------------------------------------------


controls = (function() {

    const main = document.querySelector('.main');
    const optionsWindow = document.querySelector('.options-window');
    const optionsButton = document.querySelector('.options-btn');
    const optionsExit = document.querySelector('.options-exit');
    const winnerScreenExit = document.querySelector('.winner-screen>button');
    const resetBtn = document.querySelector('.reset-btn');
    const resetConfirmation = document.querySelector('.reset-confirmation');
    const openResetConfirmation = document.querySelector('.open-reset-confirmation');
    const cancelReset = document.querySelector('.cancel-reset');
    const bgColorPicker = document.querySelector('#background-color-picker');
    const xoColorPicker = document.querySelector('#x-o-color-picker');
    const optionsApply = document.querySelector('.options-apply');
    const newGameWindow = document.querySelector('.start-new-game');
    const pvp = document.querySelector('#pvp');
    const nameSelectScreen = document.querySelector('.name-select-screen');
    const nameOneInput = document.querySelector('#player-one-name');
    const nameTwoInput = document.querySelector('#player-two-name');
    const startGameButton = document.querySelector('#start-game');
    const winnerText = document.querySelector('.winner-screen>h1');
    const playerOneScore = document.querySelector('.player-one-score');
    const playerTwoScore = document.querySelector('.player-two-score');
    const leftPlayerDiv = document.querySelector('div.player-one');
    const rightPlayerDiv = document.querySelector('div.player-two');


    const showOptionsWindow = (e) => {
        optionsWindow.classList.remove('hide');
        optionsWindow.classList.add('visible');
        disableMain()};

    const hideOptionsWindow = (e) => {
        optionsWindow.classList.add('hide');
        optionsWindow.classList.remove('visible');
        restoreMain()};

    const showResetConfirmation = () => {
        resetConfirmation.classList.remove('hide');
        resetConfirmation.classList.add('visible');
        disableMain()};

    const hideResetConfirmation = () => {
        resetConfirmation.classList.add('hide')
        resetConfirmation.classList.remove('visible')
        restoreMain()};

    const hideNameSelectWindow = () => {
        nameSelectScreen.classList.remove('visible');
        nameSelectScreen.classList.add('hide')};

    const removeStrikethrough = () => {
        game.strike.classList.remove(game.returnWinPosition());
        game.resetWinPosition();
        game.strike.classList.remove('visible');
        game.strike.classList.add('hide');
    };
    
    const winnerScreen = document.querySelector('.winner-screen');
    
    const hideWinnerScreen = () => {
        winnerScreen.classList.remove('visible');
        removeStrikethrough();
        resetBoard();
        restoreMain();
    }
    const congratulateWinner = () => {
        if (playerOneTurn) {
            winnerText.textContent = `${playerOne.name} Wins!`
        } else {
            winnerText.textContent = `${playerTwo.name} Wins!`
        }
        setTimeout(() => {
            winnerScreen.classList.add('visible');
            disableMain();
        }, 500)};
        

    const disableMain = () => {
        main.classList.add('unclickable');
        main.classList.add('faded')
    }

    const restoreMain = () => {
        main.classList.remove('unclickable');
        main.classList.remove('faded')
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
        highlightPlayer();
    }

    const resetScores = () => {
        playerOne.score = 0;
        playerOneScore.textContent = 0;
        playerTwo.score = 0;
        playerTwoScore.textContent = 0;
    }


    const choosePVP = () => {
        game.gameMode = 'pvp'
        game.twoPlayerGame();
        newGameWindow.classList.remove('visible');
        newGameWindow.classList.add('hide');
        nameSelectScreen.classList.add('visible');
    };  

    // const chooseVsComputer = () => {

    // }

    const highlightPlayer = () => {
        if (playerOneTurn) {
            leftPlayerDiv.classList.add('active-player');
            rightPlayerDiv.classList.remove('active-player');
        } else {
            leftPlayerDiv.classList.remove('active-player');
            rightPlayerDiv.classList.add('active-player');
        }
    }

    

    const setPlayerNames = () => {
        playerOne = player(nameOneInput.value);
        playerTwo = player(nameTwoInput.value);
        document.querySelector('p.player-one').textContent = `${playerOne.name}`;
        document.querySelector('p.player-two').textContent = `${playerTwo.name}`}; 
    
    const setPlayerScore = (player) => {
        if (player == playerOne) {
            playerOne.score++;
            playerOneScore.textContent = `score ${playerOne.score}`;
        } else if (player == playerTwo) {
            playerTwo.score++;
            playerTwoScore.textContent = `score ${playerTwo.score}`;
        }
    }



    const verifyNames = () => {
        
        if (nameOneInput.value == '') {
            alert('Please enter a valid name for Player One')
        } else if (nameTwoInput.value == '') {
            alert('Please enter a valid name for Player Two')
        } else {
            hideNameSelectWindow();
            restoreMain();
        }
    }

    




    const setColors = () => {
        main.setAttribute('style',`background-color: ${bgColorPicker.value}`);
        xAndOs = document.querySelectorAll('.game-board>div>p');
        xAndOs.forEach(element => element.setAttribute('style', `color: ${xoColorPicker.value}`))
    }


    //-------------------------TESTING AREA-------------------------//


    











    //-------------------------------------------------------------//


    optionsButton.addEventListener('click', showOptionsWindow);
    optionsExit.addEventListener('click', hideOptionsWindow);
    optionsApply.addEventListener('click', setColors);
    optionsApply.addEventListener('click', hideOptionsWindow);

    openResetConfirmation.addEventListener('click', showResetConfirmation);
    resetBtn.addEventListener('click', resetBoard);
    resetBtn.addEventListener('click', resetTurns);
    resetBtn.addEventListener('click', hideResetConfirmation);
    resetBtn.addEventListener('click', resetScores);
    cancelReset.addEventListener('click', hideResetConfirmation);
    
    winnerScreenExit.addEventListener('click', hideWinnerScreen);
    
    pvp.addEventListener('click', choosePVP);
    startGameButton.addEventListener('click', setPlayerNames);
    startGameButton.addEventListener('click', verifyNames);

    return {
        resetBoard: resetBoard,
        disableMain: disableMain,
        restoreMain: restoreMain,
        congratulateWinner: congratulateWinner, 
        setPlayerNames: setPlayerNames,
        setPlayerScore: setPlayerScore,
        removeStrikethrough: removeStrikethrough,
        highlightPlayer: highlightPlayer,
    }

})();



