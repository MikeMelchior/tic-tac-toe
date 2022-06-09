
const gameBoard = (function() {

    let gameboard = ['', '', '', '', '', '', '', '', ''];


    const updateBoard = () => {
        for (let i = 0; i < 9; i ++) {
            document.querySelector(`.square-${i}`).children[0].textContent = gameboard[i];
        }};

    const topRow = () => {
        return {
            line: gameboard.slice(0, 3),
            indices: [0, 1, 2]
        }
    };
    const midRow = () => {
        return {
            line: gameboard.slice(3, 6),
            indices: [3, 4, 5]
        }
    };
    const botRow = () => {
        return {
            line: gameboard.slice(6),
            indices: [6, 7, 8]
        }
    };
    const leftCol = () => {
        return {
            line: [gameboard[0], gameboard[3], gameboard[6]],
            indices : [0, 3, 6]
        }
    };
    const midCol = () => {
        return {
            line: [gameboard[1], gameboard[4], gameboard[7]],
            indices: [1, 4, 7]
        }
    };
    const rightCol = () => {
        return {
            line: [gameboard[2], gameboard[5], gameboard[8]],
            indices: [2, 5, 8]
        }
    };
    const diagRight = () => {
        return {
            line: [gameboard[0], gameboard[4], gameboard[8]],
            indices: [0, 4, 8]
        }
    };
    const diagLeft = () => {
        return {
            line: [gameboard[2], gameboard[4], gameboard[6]],
            indices: [2, 4, 6]
        }
    }

    
    


    return {
        gameboard: gameboard,
        updateBoard: updateBoard,
        topRow: topRow,
        midRow: midRow,
        botRow: botRow,
        leftCol: leftCol,
        midCol: midCol,
        rightCol: rightCol,
        diagRight: diagRight,
        diagLeft: diagLeft,
    };

})();


const game = (function() {
    
    let winPosition = null;
    let gameMode = null;

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
        if (game.gameMode == 'pvp') {
            squares.forEach(square => {
                square.addEventListener('click', mode);
            });
        } else if (game.gameMode = 'aiEasy') {
            squares.forEach(square => {
                square.addEventListener('click', mode);
            });
        }; 
    };

    const switchTurns = () => {
        if (game.gameMode == 'pvp') {
            playerOneTurn = !playerOneTurn;
        } else if (game.gameMode == 'aiEasy') {
            singlePlayerTurnEasy = !singlePlayerTurnEasy;
            
        }
        controls.highlightPlayer();
    };

    const attemptWinningMove = () => {
        // array of functions that each return an object including a current array of a different
    // winning combination on the board, as well as the game board indices of that array (see gameBoard object)
    let arr = [gameBoard.topRow(), gameBoard.midRow(), gameBoard.botRow(), gameBoard.leftCol(), 
        gameBoard.rightCol(), gameBoard.midCol(), gameBoard.diagRight(), gameBoard.diagLeft()];
        arr.forEach(obj => {
            if(!singlePlayerTurnEasy || obj.line.indexOf('') == -1) {
                return
            }
            let count = 0;
            for (let i = 0; i < 3; i++) {
                if (obj.line[i] == 'o') {
                    count++;
                }
            }
            if (count == 2) { 
                gameBoard.gameboard[obj.indices[obj.line.indexOf('')]] = 'o';
                gameBoard.updateBoard();
                switchTurns();
            }
        })
    }

    const blockWin = () => {
        let arr = [gameBoard.topRow(), gameBoard.midRow(), gameBoard.botRow(), gameBoard.leftCol(), 
                    gameBoard.rightCol(), gameBoard.midCol(), gameBoard.diagRight(), gameBoard.diagLeft()]
        arr.forEach(obj => {
            // cant break out for foreach so instantly return each iteration once turn has been switched
            if (!singlePlayerTurnEasy  || obj.line.indexOf('') == -1) {
                return
            }
            let count = 0;
            // if line has an 'x' and an 'o' don't make move
            if (obj.line.indexOf('x') != -1 && obj.line.indexOf('o') != -1) {
                return
            }
            for (let i = 0; i < 3; i++) {
                if (obj.line[i] != '') {
                    count++;
                }
            }
            if (count == 2) {
                gameBoard.gameboard[obj.indices[obj.line.indexOf('')]] = 'o';
                gameBoard.updateBoard();
                switchTurns();  
                } 
            })
        }
    

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
        if (winPosition == null && gameBoard.gameboard.indexOf('') == -1) {
            singlePlayerTurnEasy = true;
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
                // grab number from square's class and store 'x' in gameboard array then update the board
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
        controls.gameModeBtn.textContent = "Play vs Computer";
        
    });


    const vsComputerEasy = (function() {

        singlePlayerTurnEasy = true;
        controls.highlightPlayer();

        //randomIndex variable used to make random move for computer
        let randomIndex = null;
        function randomMove() {
            randomIndex = null;
            while (gameBoard.gameboard[randomIndex] != '') {
                randomIndex = Math.floor(Math.random()*9);
                if (gameBoard.gameboard[randomIndex] == '') {
                    gameBoard.gameboard[randomIndex] = 'o';
                    gameBoard.updateBoard();
                    break;
                }
            }
        };

        
        const aiEasyMode = (e) => {
            //once a move is made disable to board so player cannot spam moves
            controls.main.classList.add('unclickable');
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
                    // switch turns so that player always has first turn
                    switchTurns();
                }

                //computer move after player turn
                setTimeout(() => {
                    if (singlePlayerTurnEasy && gameBoard.gameboard.indexOf('') != -1) {
                        attemptWinningMove();
                        checkWin();
                        if (winPosition != null) {
                            computerEasy.incrementScore();
                        }
                    }
                    if (singlePlayerTurnEasy && gameBoard.gameboard.indexOf('') != -1) {
                        blockWin();
                        checkWin();
                    }
                    if (singlePlayerTurnEasy && gameBoard.gameboard.indexOf('') != -1) {
                        switchTurns();
                        randomMove();
                        checkWin();
                    }
                    if (winPosition != null) {
                        controls.updateScores();
                    }
                    //prevent game from getting stuck on computers turn
                    if (!singlePlayerTurnEasy) {
                        switchTurns();
                    }
                }, 400);
            setTimeout(() => {
            controls.main.classList.remove('unclickable');
            }, 450);     
            }
        }
        
        setGameMode(aiEasyMode);
        controls.gameModeBtn.textContent = "Two Player Game";

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
    const vsComputerButton = document.querySelector('#versusAI');
    const winnerText = document.querySelector('.winner-screen>h1');
    const playerOneScore = document.querySelector('.player-one-score');
    const playerTwoScore = document.querySelector('.player-two-score');
    const playerOneText = document.querySelector('p.player-one');
    const playerTwoText = document.querySelector('p.player-two');
    const leftPlayerDiv = document.querySelector('div.player-one');
    const rightPlayerDiv = document.querySelector('div.player-two');
    const gameModeBtn = document.querySelector('.game-mode-btn');

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

        if (game.gameMode == 'pvp') {
            if (playerOneTurn) {
                winnerText.textContent = `${playerOneText.textContent} Wins!`;
            } else {
                winnerText.textContent = `${playerTwoText.textContent} Wins!`;
            };
            setTimeout(() => {
                winnerScreen.classList.add('visible');
                disableMain();
            }, 500);
        } else if (game.gameMode == 'aiEasy') {
            if (singlePlayerTurnEasy) {
                winnerText.textContent = `${playerOneText.textContent} Wins!`;
            } else {
                winnerText.textContent = `${playerTwoText.textContent} Wins!`;
            };
            setTimeout(() => {
                winnerScreen.classList.add('visible');
                disableMain();
            }, 500);
        }   
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

    const switchGameModes = () => {
        if (game.gameMode == 'pvp') {
            //do stuff
        } else if (game.gameMode == 'aiEasy') {
            //do stuff
        }
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
        if (game.gameMode == 'pvp') {
            playerOneScore.textContent = `score ${playerOne.returnScore()}`;
            playerTwoScore.textContent = `score ${playerTwo.returnScore()}`;
        } else if (game.gameMode == 'aiEasy') {
            playerOneScore.textContent = `score ${playerOneEasy.returnScore()}`;
            playerTwoScore.textContent = `score ${computerEasy.returnScore()}`;
        }
        
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

    optionsButton.addEventListener('click', showOptionsWindow);
    optionsExit.addEventListener('click', hideOptionsWindow);
    optionsApply.addEventListener('click', setColors);
    optionsApply.addEventListener('click', hideOptionsWindow);

    openResetConfirmation.addEventListener('click', showResetConfirmation);
    resetBtn.addEventListener('click', resetBoard);
    resetBtn.addEventListener('click', resetTurns);
    resetBtn.addEventListener('click', hideResetConfirmation);
    resetBtn.addEventListener('click', resetScores);
    resetBtn.addEventListener('click', () => {
        if (game.gameMode == 'pvp') {
            showNameSelectWindow();
        }
    });
    cancelReset.addEventListener('click', hideResetConfirmation);
    
    winnerScreenExit.addEventListener('click', hideWinnerScreen);
    
    pvp.addEventListener('click', choosePVP);
    startGameButton.addEventListener('click', verifyNames);
    startGameButton.addEventListener('click', setPlayerNames);
    startGameButton.addEventListener('click', startTwoPlayerGame);

    vsComputerButton.addEventListener('click', chooseVsComputerEasy);
    vsComputerButton.addEventListener('click', startComputerEasyGame);
    vsComputerButton.addEventListener('click', setPlayerNames);
    vsComputerButton.addEventListener('click', restoreMain);


    
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
        main: main,
        gameModeBtn: gameModeBtn,
    }

})();



