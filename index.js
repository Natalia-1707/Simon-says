// INITIAL GAME SCREEN //

let allowedSymbols = [];


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
dropdown.append(select);
dropdownDiv.append(dropdown);

// virtual keyboard //

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

let levelSelected = 'Easy';
getAllowedSymbols(levelSelected);
let gameBoardDiv = document.createElement('div');
gameBoardDiv.classList.add('game-board-div');
document.body.append(gameBoardDiv);
gameBoardDiv.style.display = 'none';
startBtn.addEventListener('click', () => {
    mainDiv.style.display = 'none';
    gameBoardDiv.style.display = 'flex';
    let sequence = generateSymbols(levelSelected);
    createTypeFields();
    simulatingTyping(sequence);
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
            console.log(symbol);
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

function virtualKeyboardInput(symbol) {
    if (playerTyping.length < symbolsToPrint.length) {
        let typeFields = document.querySelectorAll('.type-field');
        let currentField = typeFields[playerTyping.length];
        if (symbol == symbolsToPrint[playerTyping.length]) {
            currentField.textContent = symbol;
            playerTyping.push(symbol);
            currentField.classList.add('correct-input');
            setTimeout(() => {
                currentField.classList.remove('correct-input');
            }, 500);
        } else {
            currentField.textContent = symbol;
            incorrectAttempts++;
            console.log('Incorrect Attempts', incorrectAttempts);
        
            if (incorrectAttempts >= 2) {
                currentField.textContent = symbol;
                currentField.classList.add('wrong-input');
                setTimeout(() => {
                    alert('Sorry, you lost');
                }, 100);
                return;
            }
            if (0 < incorrectAttempts <= 2) {
                console.log('Oooops, incorrect.. try again');
                currentField.classList.add('wrong-input');
                console.log('Player types:', playerTyping); 
                setTimeout(() => {
                    currentField.textContent = '';
                    currentField.classList.remove('wrong-input');
                }, 500);
                return;
            }
        }
    }
    if (playerTyping.length === symbolsToPrint.length) {
        checkSymbols();
    }
}
// !!!!!!!!!! //
function getAllowedSymbols(level) {
    if (level === 'Easy') {
        allowedSymbols = easySymbols.map(String);
    } else if (level === 'Medium') {
        allowedSymbols = mediumSymbols.map(symbol => symbol.toLowerCase());
    } else if (level === 'Hard') {
        allowedSymbols = hardSymbols.map(symbol => {
            return typeof symbol === 'string' ? symbol.toLowerCase() : String(symbol);
        });
    }
    console.log('Allowed symbols', allowedSymbols);
}
function physicalKeyboardInput(event) {

    let symbol = event.key;

    if (event.key >= '0' && event.key <= '9') {
        symbol = event.key;
    } else {
        symbol = event.key.toLowerCase();
    }

    console.log(symbol);
    console.log('allowedSymbols', allowedSymbols);
    if (allowedSymbols.includes(symbol)) {
        virtualKeyboardInput(symbol);
        let symbolBtns = document.querySelectorAll('.symbol-button-gameboard');
        symbolBtns.forEach((button) => {
        button.classList.add('symbol-button-gameboard-keydown');
        });
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
            alert('Correct! Proceed to next round.');
            nextRound();
        }, 500);
    } else {
        incorrectAttempts++;
        if (incorrectAttempts >= 2) {
            alert('Sorry, you lost');
            /*endGame(); // Завершаем игру*/
        } else if (0 < incorrectAttempts <= 2) {
            alert('Oooops, incorrect.. try again');
            /*resetRound(); // Перезапускаем раунд*/
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
    repeatBtn.disabled = false;
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
    console.log(symbols);
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
    }, time);
}


function symbolsHighlited(symbol) {
    let symbolBtns = document.querySelectorAll('.symbol-button-gameboard');
    console.log(symbolBtns);
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

function nextRound() {
    if (currentRound < maxRounds) {
        currentRound++;
        roundIndicator.textContent = `Round: ${currentRound}`;
        gameBoardSymbolBtn = [];
        incorrectAttempts = 0;
        createTypeFields();
        generateSymbols(levelSelected);
        simulatingTyping(symbolsToPrint);
        updateGameBoardKeyboard(levelSelected);
        buttonDisabled();
    }
}
