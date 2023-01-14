const $ = document;
const winningSituations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
]
const allSquares = $.querySelectorAll('.button-option');
allSquares.forEach(elems => {
    elems.addEventListener('click', clicked);
});
let x = [];
let o = [];
const reset = $.getElementById('restart');
reset.addEventListener('click', handleReset);
function clicked(e) {
    handleAddition(e);
    let elements = [];
    notPicked(elements);
    oAddition(elements);
    handleWinner(x, o);
}
function handleAddition(e) {
    e.target.innerHTML = 'X';
    e.target.classList.add('picked');
    e.target.removeEventListener('click', clicked);
    x.push(+e.target.id);
}
function isPicked(e) {
    let isAvailable = true;
    if(e.classList[1] == 'picked'){
        isAvailable = false;
    }
    return isAvailable;
}
function notPicked(array) {
    for (const iterator of allSquares) {
        if(isPicked(iterator)){
            array.push(iterator);
        }
    }
}
function oAddition(array) {
    if(array.length != 0){
        let randomNum = Math.floor(Math.random() * array.length);
        array[randomNum].innerHTML = 'O';
        array[randomNum].classList.add('picked');
        array[randomNum].removeEventListener('click', clicked);
        o.push(+array[randomNum].id);
    }
}
function handleReset() {
    allSquares.forEach(item => {
        item.innerHTML = '';
        item.classList.remove('picked');
        item.addEventListener('click', clicked);
    })
    x = [];
    o = [];
}
function handleWinner(playerX, playerO) {
    let flag = true;
    for (const iterator of winningSituations) {
        let sumX = sumOfX(playerX, iterator);
        let sumO = sumOfO(playerO, iterator);
        if(sumX >= 3){
            console.log('You won!');
            end();
            Swal.fire(
                'Good job!',
                'Thanks for playing! if you liked this game please support me by starring this gtihub project 🥰!',
                'success'
              )
            flag = false;
        }else if(sumO>= 3){
            console.log('You lost!');
            end();
            Swal.fire(
                'You lost!',
                'Thanks for playing! if you liked this game please support me by starring this gtihub project 🥰!',
                'error'
              )
            flag = false;
        }
    }
    if(areAllPicked() && flag){
        console.log('Tie!');
    }
}
function sumOfX(playerX, iterator) {
    let v = playerX.values();
    let sum = 0;
    for (const value of v) {
        if(iterator.includes(value)){
            sum ++;
        }
    }
    return sum;
}
function sumOfO(playerO, iterator) {
    let v = playerO.values();
    let sum = 0;
    for (const value of v) {
        if(iterator.includes(value)){
            sum ++;
        }
    }
    return sum;
}
function areAllPicked() {
    let count = 0;
    let isTrue = false;
    for (const iterator of allSquares) {
        if(iterator.classList[1] == 'picked'){
            count++;
        }
    }
    if(count == 9){
        isTrue = true;
    }
    return isTrue;
}
function end() {
    allSquares.forEach(item => {
        let count = 1;
        item.innerHTML = `<button id=${count} disabled class="button-option">${item.innerText}</button>`;
        count++;
    })
}