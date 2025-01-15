// fonts //
let fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Allura&family=Jost:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playwrite+AU+SA:wght@100..400&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
document.head.appendChild(fontLink);

let fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
document.head.appendChild(fontAwesomeLink);

// favicon //
let faviconLink = document.createElement('link');
faviconLink.rel = 'shortcut icon';
faviconLink.href = 'img/favicon-32x32.png';
document.head.appendChild(faviconLink);

// CSS //
let styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href = 'style.css';
document.head.appendChild(styleLink);


// INITIAL GAME SCREEN //

let mainDiv = document.createElement('div');
mainDiv.classList.add('main-div');
let optionsDiv = document.createElement('div');
optionsDiv.classList.add('options-div');
mainDiv.classList.add('main-div');
let startBtn = document.createElement('button');
startBtn.classList.add('button-start');
startBtn.textContent = 'Start game';

// dropdown //

let dropdownDiv = document.createElement('div');
dropdownDiv.classList.add('dropdown-div');
let dropdownText = document.createElement('div');
dropdownText.textContent = 'Choose level';
let dropdown = document.createElement('form');
dropdown.classList.add('dropdown');
let select = document.createElement('select');
select.classList.add('select');
let level = ['Easy', 'Medium', 'Hard'];

level.forEach(text => {
    let option = document.createElement('option');
    option.value = text;
    option.textContent = text;
    select.append(option);
})
dropdownDiv.append(dropdownText);
dropdown.append(select);
dropdownDiv.append(dropdown);

// virtual keyboard //
let allowedSymbols = [];


let keyboardDiv = document.createElement('div');
keyboardDiv.classList.add('keyboard');

let easySymbols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let mediumSymbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let hardSymbols = easySymbols.concat(mediumSymbols);

function makeKeyboard(level) {
    keyboardDiv.innerHTML = '';
    let symbols = [];
    if (level === 'Easy') {
        symbols = easySymbols;
    }
    if (level === 'Medium') {
        symbols = mediumSymbols;
    }
    if (level === 'Hard') {
        symbols = hardSymbols;
    }

    symbols.forEach(symbol => {
        let symbolBtn = document.createElement('button');
        symbolBtn.textContent = symbol;
        symbolBtn.classList.add('symbol-button');
        keyboardDiv.append(symbolBtn);
    })
    return keyboardDiv;
}

makeKeyboard('Easy');

optionsDiv.append(startBtn);
optionsDiv.append(dropdownDiv);
mainDiv.append(optionsDiv);
mainDiv.append(keyboardDiv);
document.body.append(mainDiv);

// STARTING GAME //

// music //
let clickMusic = document.createElement('audio');
clickMusic.src = 'music/click.mp3';
clickMusic.setAttribute('preload', 'auto');
clickMusic.setAttribute('controls', 'none');
clickMusic.style.display = 'none';
document.body.appendChild(clickMusic);

let clickWrong = document.createElement('audio');
clickWrong.src = 'music/wrongclick.mp3';
clickWrong.setAttribute('preload', 'auto');
clickWrong.setAttribute('controls', 'none');
clickWrong.style.display = 'none';
document.body.appendChild(clickWrong);

let nextRoundMusic = document.createElement('audio');
nextRoundMusic.src = 'music/nextround.mp3';
nextRoundMusic.setAttribute('preload', 'auto');
nextRoundMusic.setAttribute('controls', 'none');
nextRoundMusic.style.display = 'none';
document.body.appendChild(nextRoundMusic);

function playClick() {
    if (!clickMusic.paused) {
        clickMusic.pause();
        clickMusic.currentTime = 0;
    }
    clickMusic.play().catch(error => console.error('Error playing click sound:', error));
}

function stopClick() {
    clickMusic.pause();
    clickMusic.currentTime = 0;
}
function playWrong() {
    if (!clickWrong.paused) {
        clickWrong.pause();
        clickWrong.currentTime = 0;
    }
    clickWrong.play().catch(error => console.error('Error playing wrong sound:', error));
}
function stopWrong() {
    clickMusic.pause();
    clickMusic.currentTime = 0;
}

function playNextRound() {
    nextRoundMusic.play();
}

function stopNextRound() {
    nextRoundMusic.pause();
    nextRoundMusic.currentTime = 0;
}

// start game //
let levelSelected = 'Easy';
getAllowedSymbols(levelSelected);
let gameBoardDiv = document.createElement('div');
gameBoardDiv.classList.add('game-board-div');
document.body.append(gameBoardDiv);
gameBoardDiv.style.display = 'none';

startBtn.addEventListener('click', () => {
    mainDiv.style.display = 'none';
    gameBoardDiv.style.display = 'flex';
    gameBoardSymbolBtn = [];
    incorrectAttempts = 0;
    repeatBtnClicks = 0;
    allPlayerTypings = [];
    playerInput.value = '';
    createTypeFields();
    generateSymbols(levelSelected);
    simulatingTyping(symbolsToPrint);
    updateGameBoardKeyboard(levelSelected);
    buttonDisabled();
});

// game options on game board //

let gameOptionsDiv = document.createElement('div');
gameOptionsDiv.classList.add('game-options-div');

let levelIndicator = document.createElement('div');
levelIndicator.classList.add('level-indicator');
levelIndicator.textContent = `Level: Easy`;

let roundIndicator = document.createElement('div');
roundIndicator.classList.add('round-indicator');
roundIndicator.textContent = `Round: 1`;

let repeatBtn = document.createElement('button');
repeatBtn.classList.add('button-repeat');
repeatBtn.textContent = 'Repeat the sequence';

let newGameBtn = document.createElement('button');
newGameBtn.classList.add('button-new-game');
newGameBtn.textContent = 'New Game';

let playerInput = document.createElement('input');
playerInput.setAttribute('readonly', true);
playerInput.classList.add('player-input');

// messages //

let messageTryAgain = document.createElement('div');
messageTryAgain.classList.add('again-message-div');
messageTryAgain.textContent = 'Oooops, incorrect.. try again';

let cancelBtn = document.createElement('button');
cancelBtn.classList.add('cancel-button');
let icon = document.createElement('i');
icon.classList.add('fa-solid', 'fa-xmark');
cancelBtn.append(icon);

cancelBtn.addEventListener ("click", () => {
    messageTryAgain.style.display = 'none';
})

messageTryAgain.append(cancelBtn);
document.body.append(messageTryAgain);

let messageWon = document.createElement('div');
messageWon.classList.add('won-message-div');
messageWon.textContent = 'Well done! Go next?';

let cancelBtn2 = document.createElement('button');
cancelBtn2.classList.add('cancel-button');
let icon2 = document.createElement('i');
icon2.classList.add('fa-solid', 'fa-xmark');
cancelBtn2.append(icon2);

cancelBtn2.addEventListener ("click", () => {
    messageWon.style.display = 'none';
})

messageWon.append(cancelBtn2);
document.body.append(messageWon);


let lostDiv = document.createElement('div');
lostDiv.classList.add('lost-div');

let lostMessageDiv = document.createElement('div');
lostMessageDiv.classList.add('lost-message');
lostMessageDiv.textContent = 'Sorry...you lost. Start a new game';

let cancelBtn3 = document.createElement('button');
cancelBtn3.classList.add('cancel-button');
let icon3 = document.createElement('i');
icon3.classList.add('fa-solid', 'fa-xmark');
cancelBtn3.append(icon3);

cancelBtn3.addEventListener ("click", () => {
    lostDiv.style.display = 'none';
})

lostDiv.append(cancelBtn3);
lostDiv.append(lostMessageDiv);
document.body.append(lostDiv);



// game board //

let gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');

let gameBoardKeyboard = document.createElement('div');
gameBoardKeyboard.classList.add('game-board-keyboard');

let gameBoardSymbolBtn = [];
function updateGameBoardKeyboard(level) {
    gameBoardKeyboard.innerHTML = '';
    let symbols = [];
    if (level === 'Easy') {
        symbols = easySymbols;
    }
    if (level === 'Medium') {
        symbols = mediumSymbols;
    }
    if (level === 'Hard') {
        symbols = hardSymbols;
    }
    gameBoardSymbolBtn = [];
    symbols.forEach(symbol => {
        let symbolBtn = document.createElement('button');
        symbolBtn.textContent = symbol;
        symbolBtn.classList.add('symbol-button-gameboard');
        gameBoardSymbolBtn.push(symbolBtn);
        gameBoardKeyboard.append(symbolBtn);
        symbolBtn.addEventListener('click', () => {
            virtualKeyboardInput(symbol)
        });
    })
    return gameBoardKeyboard;
}
updateGameBoardKeyboard(levelSelected);

gameOptionsDiv.append(levelIndicator);
gameOptionsDiv.append(roundIndicator);
gameOptionsDiv.append(playerInput);
gameOptionsDiv.append(repeatBtn);
gameOptionsDiv.append(newGameBtn);

// type fields //

let typeFieldDiv = document.createElement('div');
typeFieldDiv.classList.add('type-field-div');

let playerTyping = [];

let currentRound = 1;
let maxRounds = 5;
let initialTypeFields = 2;
let typeFieldsIncrement = 2;
function createTypeFields() {
    typeFieldDiv.innerHTML = '';
    playerTyping = [];
    let typeFieldsCount = initialTypeFields + (currentRound - 1) * typeFieldsIncrement;
    typeFieldsCount = Math.min(typeFieldsCount, 10);

    for (let i = 0; i < typeFieldsCount; i++) {
        let typeField = document.createElement('div');
        typeField.classList.add('type-field');
        typeFieldDiv.append(typeField);
    }
    return typeFieldDiv;
}
createTypeFields();

// Player types //

let symbolsToPrint = [];
let incorrectAttempts = 0;
let allPlayerTypings = [];

function virtualKeyboardInput(symbol) {
    if (playerTyping.length < symbolsToPrint.length) {
        let typeFields = document.querySelectorAll('.type-field');
        let currentField = typeFields[playerTyping.length];
        allPlayerTypings.push(symbol);
        playerInput.value = allPlayerTypings.join(' ');
        if (symbol === symbolsToPrint[playerTyping.length]) {
            playClick();
            currentField.textContent = symbol;
            playerTyping.push(symbol);
            currentField.classList.add('correct-input');
            setTimeout(() => {
                currentField.classList.remove('correct-input');
            }, 500);
        } else {
            playWrong();
            currentField.textContent = symbol;
            incorrectAttempts++;
        
            if (incorrectAttempts >= 2) {
                currentField.textContent = symbol;
                currentField.classList.add('wrong-input');
                setTimeout(() => {
                    lostDiv.style.display = 'flex';
                    repeatBtn.disabled = true;
                    gameBoardSymbolBtn.forEach(button => {
                        button.disabled = true;
                    });
                }, 100);
                return;
            }
            if (0 < incorrectAttempts <= 2) {
                messageTryAgain.style.display = 'block';
                currentField.classList.add('wrong-input');
                console.log('Player types:', playerTyping); 
                setTimeout(() => {
                    messageTryAgain.style.display = 'none';
                }, 2000);
                setTimeout(() => {
                    currentField.textContent = '';
                    currentField.classList.remove('wrong-input');
                }, 500);
                return;
            }
        }
        playerInput.value = allPlayerTypings.join(' ');
    }

    if (playerTyping.length === symbolsToPrint.length) {
        checkSymbols();
    }
}

function getAllowedSymbols(level) {
    if (level === 'Easy') {
        allowedSymbols = easySymbols.map(Number);
    } else if (level === 'Medium') {
        allowedSymbols = mediumSymbols.map(symbol => symbol.toUpperCase());
    } else if (level === 'Hard') {
        allowedSymbols = hardSymbols.map(symbol => {
            return typeof symbol === 'string' ? symbol.toUpperCase() : Number(symbol);
        });
    }
    console.log('Allowed symbols', allowedSymbols);
}

let isSimulating = false;

function physicalKeyboardInput(event) {
    if (isSimulating) {
        return;
    }
    let symbol = String(event.key);

    if (event.key >= '0' && event.key <= '9') {
        symbol = Number(event.key);
    } else {
        symbol = event.key.toUpperCase();
    }
    if (allowedSymbols.includes(symbol)) {
        virtualKeyboardInput(symbol);
        let symbolBtn = Array.from(document.querySelectorAll('.symbol-button-gameboard')).find(button => {
            let buttonValue = button.textContent.trim();

            if (!isNaN(buttonValue)) {
                buttonValue = Number(buttonValue);
            }

            return buttonValue === symbol;
        });

        if (symbolBtn) {
            symbolBtn.classList.add('symbol-button-gameboard-keydown');
            setTimeout(() => {
                symbolBtn.classList.remove('symbol-button-gameboard-keydown');
            }, 500);
        }
    } else {
        console.log("Not allowed symbol");
    }
}

document.addEventListener("keydown", physicalKeyboardInput);

function checkSymbols() {
    if (JSON.stringify(playerTyping) === JSON.stringify(symbolsToPrint)) {
        let typeFields = document.querySelectorAll('.type-field');     
        for (let i = 0; i < typeFields.length; i++) {
            typeFields[i].textContent = symbolsToPrint[i];
        }
        setTimeout(() => {
            gameBoardSymbolBtn.forEach(button => {
                button.disabled = true;
            });
            let nextBtn = document.createElement('button');
            nextBtn.classList.add('button-next');
            nextBtn.textContent = 'Next';
            nextBtn.addEventListener('click', () => {
                stopNextRound();
                nextRound();
                nextBtn.replaceWith(repeatBtn);
                repeatBtn.disabled = true;
                repeatBtn.textContent = 'Repeat the sequence';
            });
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    let nextBtnOnPage = document.querySelector('.button-next');
                    if (nextBtnOnPage) {
                        nextBtnOnPage.click();
                    }
                }
            });
            if (currentRound === maxRounds) {
                playNextRound();
                wonDiv.style.display = 'flex';
                repeatBtn.disabled = true;
            }
            if (currentRound < maxRounds) {
                gameBoardSymbolBtn.forEach(button => {
                    button.disabled = true;
                });
                playNextRound();
                messageTryAgain.style.display = 'none';
                messageWon.style.display = 'block';
                repeatBtn.replaceWith(nextBtn);
            }
        }, 500);
    } else {
        incorrectAttempts++;
        if (incorrectAttempts >= 2) {
            lostDiv.style.display = 'flex';
            repeatBtn.disabled = true;
        } else if (0 < incorrectAttempts <= 2) {
            messageTryAgain.style.display = 'none';
        }
    }
}

gameBoard.append(typeFieldDiv);
gameBoard.append(gameBoardKeyboard);


gameBoardDiv.append(gameBoard);
gameBoardDiv.append(gameOptionsDiv);

// Event listener for select //

select.addEventListener('change', (event) => {
    levelSelected = event.target.value;
    makeKeyboard(levelSelected);
    updateGameBoardKeyboard(levelSelected);
    levelIndicator.textContent = `Level: ${levelSelected}`;
    getAllowedSymbols(levelSelected);
});

// Simulating the typing //

function buttonDisabled() {
    newGameBtn.disabled = true;
    repeatBtn.disabled = true;
    gameBoardSymbolBtn.forEach(button => {
        button.disabled = true;
    });
}
function buttonEnabled() {
    newGameBtn.disabled = false;
    if (repeatBtnClicks === 0) {
        repeatBtn.disabled = false;
    } else {
        repeatBtn.disabled = true;
    }
    gameBoardSymbolBtn.forEach(button => {
        button.disabled = false;
    });
}

function generateSymbols(level) {
    let symbols = [];
    if (level === 'Easy') {
        symbols = easySymbols;
    }
    if (level === 'Medium') {
        symbols = mediumSymbols;
    }
    if (level === 'Hard') {
        symbols = hardSymbols;
    }
    let sequence = [];
    let typeFieldsCount = initialTypeFields + (currentRound - 1) * typeFieldsIncrement;
    for(let i = 0; i < typeFieldsCount; i++) {
        let randomSymbol = Math.floor(Math.random() * symbols.length);
        sequence.push(symbols[randomSymbol]);
    }
    symbolsToPrint = sequence;
    console.log('Symbols to print', sequence);
    return sequence;
}

function simulatingTyping(sequence) {
    isSimulating = true;
    buttonDisabled();
    let typeFields = document.querySelectorAll('.type-field');
    let time = 800;
    let symbolBtns = document.querySelectorAll('.symbol-button');
    symbolBtns.forEach((button) => {
        button.classList.remove('symbol-highlited');
    });
    sequence.forEach((symbol, index) => {
        setTimeout(() => {
            typeFields[index].textContent = symbol;
            symbolsHighlited(symbol);
        }, time);
        time += 800;
    })
    setTimeout(() => {
        typeFields.forEach(field => {
            field.textContent = '';
        });
        buttonEnabled();
        isSimulating = false;
    }, time);
}

function symbolsHighlited(symbol) {
    let symbolBtns = document.querySelectorAll('.symbol-button-gameboard');
    symbolBtns.forEach((button) => {
        button.classList.remove('symbol-highlited');
    });
    symbolBtns.forEach((button) => {
        if (button.textContent == symbol) {
            button.classList.add('symbol-highlited');
            setTimeout(() => {
                button.classList.remove('symbol-highlited');
            }, 800);
        }
    });
}

// buttons on gameboard //

function startNewGame() {
    gameBoardDiv.style.display = 'none';
    messageWon.style.display = 'none';
    lostDiv.style.display = 'none';
    wonDiv.style.display = 'none';
    mainDiv.style.display = 'flex';
    currentRound = 1;
    roundIndicator.textContent = `Round: ${currentRound}`;
    gameBoardSymbolBtn = [];
    incorrectAttempts = 0;
    repeatBtnClicks = 0;
    allPlayerTypings = [];
    playerInput.value = '';

    let nextBtnOnPage = document.querySelector('.button-next');
    if (nextBtnOnPage) {
        nextBtnOnPage.replaceWith(repeatBtn);
    }
    repeatBtn.disabled = true;
    repeatBtn.textContent = 'Repeat the sequence';

}

let repeatBtnClicks = 0;
repeatBtn.addEventListener('click', () => {
    repeatBtnClicks ++;
    simulatingTyping(symbolsToPrint);
    playerTyping = [];
    allPlayerTypings = [];
    playerInput.value = '';
    let typeFields = document.querySelectorAll('.type-field');
    typeFields.forEach((field) => {
        field.textContent = '';
        field.classList.remove('correct-input', 'wrong-input');
    });
    repeatBtn.disabled = true;
})

function nextRound() {
    if (currentRound < maxRounds) {
        messageWon.style.display = 'none';
        currentRound++;
        roundIndicator.textContent = `Round: ${currentRound}`;
        gameBoardSymbolBtn = [];
        incorrectAttempts = 0;
        repeatBtnClicks = 0;
        allPlayerTypings = [];
        playerInput.value = '';
        createTypeFields();
        generateSymbols(levelSelected);
        simulatingTyping(symbolsToPrint);
        updateGameBoardKeyboard(levelSelected);
        buttonDisabled();
    }
}

let wonDiv = document.createElement('div');
wonDiv.classList.add('won-div');

let wonMessageDiv = document.createElement('div');
wonMessageDiv.classList.add('won-message');
wonMessageDiv.textContent = "It's a win! Congrats! Want to try once again?";

let cancelBtn4 = document.createElement('button');
cancelBtn4.classList.add('cancel-button');
let icon4 = document.createElement('i');
icon4.classList.add('fa-solid', 'fa-xmark');
cancelBtn4.append(icon4);

cancelBtn4.addEventListener ("click", () => {
    wonDiv.style.display = 'none';
})

wonDiv.append(cancelBtn4);
wonDiv.append(wonMessageDiv);
document.body.append(wonDiv);

newGameBtn.addEventListener("click", () => {
    startNewGame();
})