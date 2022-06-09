
const gameBoard = (function() {

    let gameboard = ['', '', '', '', '', '', '', '', ''];


    const updateBoard = () => {
        for (let i = 0; i < 9; i ++) {
            document.querySelector(`.square-${i}`).children[0].textContent = gameboard[i];
        }};

    return {
        updateBoard: updateBoard,
        gameboard: gameboard,
    };

})();


const game = (function() {

    let winPosition = null;
    let gameMode = 'pvp';

    const strike = document.querySelector('.strikethrough');
    // transform strikethrough with use of class determined by winning 'position' (ie. top-row or left-column)
    const Strikethrough = (position) => {
        strike.classList.add(position);
        strike.classList.remove('hide'); 
    };

    const returnWinPosition = () => {
        return winPosition
    };

    const resetWinPosition = () => {
        winPosition = null;
    };

    // clones game board nodes so that all event listeners are removed
    const removeGameMode = (mode) => {
        document.querySelectorAll('.game-board>div').forEach(square => {
            let old_element = square;
            let new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
        })
    };

    const squares = document.querySelectorAll('.game-board>div');

    const setGameMode = (mode) => {
        if (gameMode == 'pvp') {
            squares.forEach(square => {
                square.addEventListener('click', mode);
            });
        } else if (gameMode = 'aiEasy') {
            squares.forEach(square => {
                square.addEventListener('click', mode);
            });
        }; 
    };

    const switchTurns = () => {
        if (gameMode == 'pvp') {
            playerOneTurn = !playerOneTurn;
        } else if (gameMode == 'aiEasy') {
            singlePlayerTurnEasy = !singlePlayerTurnEasy;
            
        }
        controls.highlightPlayer();
    };

    const checkWin = () => {
        board = gameBoard.gameboard;
        if (board[0] == board[1] && board[1] == board[2] && board[2] != '') {
            winPosition = 'top-row';
            Strikethrough(winPosition);
        } else if (board[3] == board[4] && board[4] == board[5] && board[5] != '') {
            winPosition = 'middle-row';
            Strikethrough(winPosition);    
        } else if (board[6] == board[7] && board[7] == board[8] && board[8] != '') {
            winPosition = 'bottom-row';
            Strikethrough(winPosition);
        } else if (board[0] == board[3] && board[3] == board[6] && board[6] != '') {
            winPosition = 'left-column';
            Strikethrough(winPosition);
        } else if (board[1] == board[4] && board[4] == board[7] && board[7] != '') {
            winPosition = 'middle-column';
            Strikethrough(winPosition);
        } else if (board[2] == board[5] && board[5] == board[8] && board[8] != '') {
            winPosition = 'right-column';
            Strikethrough(winPosition);    
        } else if (board[0] == board[4] && board[4] == board[8] && board[8] != '') {
            winPosition = 'diagonal-right';
            Strikethrough(winPosition);
        } else if (board[2] == board[4] && board[4] == board[6] && board[6] != '') {
            winPosition = 'diagonal-left';
            Strikethrough(winPosition);
        }; 

        if (winPosition != null) {
            controls.congratulateWinner();
        };
        if (gameBoard.gameboard.indexOf('') == -1) {
            controls.announceTie();
        }
    };

    const twoPlayerGame = (function() {

        //set player one to have first turn
        playerOneTurn = true;
        controls.highlightPlayer();

        
        
        // event listener function added to each 'square' when pvp is selected
        const pvpMode = (e) => {
            // check if 'square' has already been taken
            if(e.target.children[0].textContent != '') {
                return 
            } else if (playerOneTurn){
                // store 'x' in gameboard array and update the board
                gameBoard.gameboard[e.target.classList[0].split('-')[1]] = 'x'
                gameBoard.updateBoard();
                // check board for win, and if won, increments score
                checkWin();
                if (winPosition != null) {
                    playerOne.incrementScore();
                }
                switchTurns();
            } else {
                gameBoard.gameboard[e.target.classList[0].split('-')[1]] = 'o'
                gameBoard.updateBoard();
                checkWin();
                if (winPosition != null) {
                    playerTwo.incrementScore();
                }
                switchTurns();
            }
            if (winPosition != null) {
                controls.updateScores();
            }
        }
        // adds event listener to each square for PvP game-play
        setGameMode(pvpMode);
        
        
    });


    const vsComputerEasy = (function() {
        let singlePlayerTurnEasy = true;
        controls.highlightPlayer();
        //randomIndex variable used to make random move for computer
        let randomIndex = null;

        function randomMove() {
            while (gameBoard.gameboard[randomIndex] != '') {
                x = Math.floor(Math.random()*9);
                if (gameBoard.gameboard[x] == '') {
                    gameBoard.gameboard[x] = 'o';
                    gameBoard.updateBoard();
                    break;
                }
            }
        };

        // const computerTurn = () => {
        //     randomMove();
        // }

        const aiEasyMode = () => {
            // checking that square is empty 
            if(e.target.children[0].textContent != '') {
                return;
            } else if (singlePlayerTurnEasy){
                // store 'x' in gameboard array and update the board
                gameBoard.gameboard[e.target.classList[0].split('-')[1]] = 'x'
                gameBoard.updateBoard();
                // check board for win, and if won, increments score
                checkWin();
                if (winPosition != null) {
                    playerOneEasy.incrementScore();
                    //

                }

                
            }
            if (winPosition != null) {
                controls.updateScores();
            }

            switchTurns();
            randomMove();
            checkWin();
        }

        setGameMode(aiEasyMode);

    });



    return {
        twoPlayerGame: twoPlayerGame,
        vsComputerEasy: vsComputerEasy,
        strike: strike,
        returnWinPosition: returnWinPosition,
        resetWinPosition: resetWinPosition,
        gameMode: gameMode,
        removeGameMode: removeGameMode, 
    }
})();




//------------------------------------------------------------------------
// player factory
const player = (name) => {
    let score = 0;
    
    function returnScore() {
        return score};

    function incrementScore() {
        score++};

    function resetScore() {
        score = 0};

    return {name, returnScore, incrementScore, resetScore}};
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
    const playerOneText = document.querySelector('p.player-one');
    const playerTwoText = document.querySelector('p.player-two');
    const leftPlayerDiv = document.querySelector('div.player-one');
    const rightPlayerDiv = document.querySelector('div.player-two');

    const showOptionsWindow = (e) => {
        optionsWindow.classList.remove('hide');
        optionsWindow.classList.add('visible');
        disableMain();
    };

    const hideOptionsWindow = (e) => {
        optionsWindow.classList.add('hide');
        optionsWindow.classList.remove('visible');
        restoreMain();
    };

    const showResetConfirmation = () => {
        resetConfirmation.classList.remove('hide');
        resetConfirmation.classList.add('visible');
        disableMain();
    };

    const hideResetConfirmation = () => {
        resetConfirmation.classList.add('hide');
        resetConfirmation.classList.remove('visible');
        restoreMain()
    };

    const showNameSelectWindow = () => {
        nameSelectScreen.classList.add('visible');
        nameSelectScreen.classList.remove('hide');
    };
    
    const hideNameSelectWindow = () => {
        nameSelectScreen.classList.remove('visible');
        nameSelectScreen.classList.add('hide');
    };

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
    };

    const congratulateWinner = () => {
        if (playerOneTurn) {
            winnerText.textContent = `${playerOne.name} Wins!`
        } else {
            winnerText.textContent = `${playerTwo.name} Wins!`
        }
        setTimeout(() => {
            winnerScreen.classList.add('visible');
            disableMain();
        }, 500)
    };

    const announceTie = () => {
        winnerText.textContent = `It's a tie!`
        setTimeout(() => {
            winnerScreen.classList.add('visible');
            disableMain();
        }, 500);
    }
        
    const disableMain = () => {
        main.classList.add('unclickable');
        main.classList.add('faded')
    };

    const restoreMain = () => {
        main.classList.remove('unclickable');
        main.classList.remove('faded')
    };

    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            gameBoard.gameboard[i] = '';
        }
        gameBoard.updateBoard();
    };

    const resetTurns = () => {
        playerOneTurn = true;
        highlightPlayer();
    };

    const resetScores = () => {
        playerOne.resetScore();
        playerOneScore.textContent = playerOne.returnScore();
        playerTwo.resetScore();
        playerTwoScore.textContent = playerTwo.returnScore();
    };

    // sets game mode when choosing player vs player game
    const choosePVP = () => {
        game.gameMode = 'pvp'
        newGameWindow.classList.remove('visible');
        newGameWindow.classList.add('hide');
        nameSelectScreen.classList.add('visible');
        nameSelectScreen.classList.remove('hide');
    }; 
    
    const startTwoPlayerGame = () => {
        game.twoPlayerGame();
    };

    const chooseVsComputerEasy = () => {
        game.gameMode = 'aiEasy';
        newGameWindow.classList.remove('visible');
        newGameWindow.classList.add('hide');

    }

    const startComputerEasyGame = () => {
        game.vsComputerEasy();
    }


    // highlights current player's turn
    const highlightPlayer = () => {
        if (game.gameMode == 'pvp') {
            if (playerOneTurn ) {
                leftPlayerDiv.classList.add('active-player');
                rightPlayerDiv.classList.remove('active-player');
            } else {
                leftPlayerDiv.classList.remove('active-player');
                rightPlayerDiv.classList.add('active-player');
            }
        } else if (game.gameMode == 'aiEasy') {
            if (singlePlayerTurnEasy) {
                leftPlayerDiv.classList.add('active-player');
                rightPlayerDiv.classList.remove('active-player');
            } else {
                leftPlayerDiv.classList.remove('active-player');
                rightPlayerDiv.classList.add('active-player');
            }
        }    
    };

    const setPlayerNames = () => {
        playerOne = player(nameOneInput.value);
        playerTwo = player(nameTwoInput.value);
        if (playerTwo.name != '') {
            playerOneText.textContent = `${playerOne.name}`;
            playerTwoText.textContent = `${playerTwo.name}`;
        } else if (game.gameMode == 'aiEasy') {
            playerOneEasy = player('Player');
            computerEasy = player('Computer');
            playerOneText.textContent = `${playerOneEasy.name}`;
            playerTwoText.textContent = `${computerEasy.name}`;
        }
    }; 
        
           
    const updateScores = () => {
        playerOneScore.textContent = `score ${playerOne.returnScore()}`;
        playerTwoScore.textContent = `score ${playerTwo.returnScore()}`;
    };
    
    const verifyNames = () => {
        if (nameOneInput.value == '') {
            alert('Please enter a valid name for Player One');
        } else if (nameTwoInput.value == '') {
            alert('Please enter a valid name for Player Two');
        } else {
            hideNameSelectWindow();
            restoreMain();
        };
    };

    
    // navigation for share button
    const title = document.title;
    const url = document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href;
    const shareButton = document.querySelector('#share-button');

    shareButton.addEventListener('click', event => {
        if (navigator.share) {
        navigator.share({
            title: title,
            url: url,
        }).then(() => {
            alert('Thanks for sharing!');
        })
        .catch(console.error);
        } else {
        alert('This feature is not supported');
        }
    });

    // apply color settings in options window
    const setColors = () => {
        main.setAttribute('style',`background-color: ${bgColorPicker.value}`);
        xAndOs = document.querySelectorAll('.game-board>div>p');
        xAndOs.forEach(element => element.setAttribute('style', `color: ${xoColorPicker.value}`))
    };


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
    resetBtn.addEventListener('click', showNameSelectWindow);
    cancelReset.addEventListener('click', hideResetConfirmation);
    
    winnerScreenExit.addEventListener('click', hideWinnerScreen);
    
    pvp.addEventListener('click', choosePVP);
    startGameButton.addEventListener('click', setPlayerNames);
    startGameButton.addEventListener('click', verifyNames);
    startGameButton.addEventListener('click', startTwoPlayerGame);

    
    return {
        resetBoard: resetBoard,
        disableMain: disableMain,
        restoreMain: restoreMain,
        congratulateWinner: congratulateWinner, 
        announceTie: announceTie,
        setPlayerNames: setPlayerNames,
        updateScores: updateScores,
        removeStrikethrough: removeStrikethrough,
        highlightPlayer: highlightPlayer,
    }

})();



