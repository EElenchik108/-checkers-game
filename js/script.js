"use strict";

let checkerBlack; // Все черные шашки
let checkerWhite; // Все белые шашки
let cellBlack = document.querySelectorAll('.cell-black'); // Все черные клетки
let cells = document.querySelector('.cells'); // Игровое поле
let topСells = cells.getBoundingClientRect().top; // Расстояние до блока .cells сверху
let bottomCells = cells.getBoundingClientRect().bottom-5; //Расстояние до блока .cells снизу
let leftСells = cells.getBoundingClientRect().left; // Расстояние до блока .cells слева
let checkers = document.querySelectorAll('.checker'); // Все шашки
let timerBlack = document.querySelector('.timer-black > span'); // Таймер черных шашек
let timerWhite = document.querySelector('.timer-white > span'); //Таймер белых шашек
let activeWhite = document.querySelector('.white-time'); // Поле с таймером для белых шашек
let activeBlack = document.querySelector('.black-time'); // Поле с таймером для черных шашек
let surrenderBlack = document.querySelector('.surrender-black'); // Кнопка сдаться черным шашкам
let surrenderWhite = document.querySelector('.surrender-white'); // Кнопка сдаться белым шашкам
let gameUp = document.querySelector('.game-up'); // Кнопка начала игры
let minBlack = 0;
let hourBlack = 0;
let secBlack = 0;
let minWhite = 0;
let hourWhite = 0;
let secWhite = 0;
let whiteСount = 0; // Счет белых
let blackСount = 0; // Счет черных
let intBlack; // Интервал для ченых шашек
let intWhite; // Интервал для белых шашек
let winner = document.querySelector('.popup  span');
let blackScore = document.querySelector('.black-score  span');
let whiteScore = document.querySelector('.white-score  span');
let substrate = document.querySelector('.substrate');
let close = document.querySelector('.close');

//--------------------------- Создание всех шашек -----------------------------------

class Checker {
    constructor(classChecker, id) {
    this.classChecker = classChecker;
    this.id = id;
    this.king = false;
    this.newDiv = {};
  }
  create(){
    this.newDiv = document.createElement('div');
    this.newDiv.id = this.id;
    this.newDiv.className = `checker ${this.classChecker}`;
    cells.append(this.newDiv); 
  }
}
function createCheckers(){
    for(let i=1; i<13; i++){
        window["b"+i] = new Checker("checker-black", `b${i}`);
        window["b"+i].create();
        window["w"+i] = new Checker("checker-white", `w${i}`);
        window["w"+i].create();
    };
}
// createCheckers();

//--------------------------- Удаление всех шашек -----------------------------------

function removeCheckers() {
    for(let i=1; i<13; i++){
        if(document.getElementById(`${"b"+i}`)) document.getElementById(`${"b"+i}`).remove();
        if(document.getElementById(`${"w"+i}`)) document.getElementById(`${"w"+i}`).remove();
    };
}
// removeCheckers();

// ---------------- Убрать класс у всех шашек -----------------------

function clearActiveChecker(){
    for(let j=0; j<checkerWhite.length; j++){
        checkerWhite[j].classList.remove('_active-checker');
    };
    for(let j=0; j<checkerBlack.length; j++){
        checkerBlack[j].classList.remove('_active-checker');
    };
};

// ----------------------Наличие в ячейке любой шашки---------------------------

function presence(top, left){
    for(let i=0; i<checkers.length; i++){
        if( checkers[i].getBoundingClientRect().top == (top + 5) && checkers[i].getBoundingClientRect().left == (left + 5) ) {
            return checkers[i].id;
        }
    }
}

// ------------------- Наличие в ячейке белой шашки -----------------------------

function presenceWhite(top, left){
    for(let i=0; i<checkerWhite.length; i++){
        if( Math.trunc(checkerWhite[i].getBoundingClientRect().top) == (Math.trunc(top) + 5) && Math.trunc(checkerWhite[i].getBoundingClientRect().left) == (Math.trunc(left) + 5) ) {
            return checkerWhite[i].id;
        }
    }
}

// ------------------- Наличие в ячейке черной шашки -----------------------------

function presenceBlack(top, left){
    for(let i=0; i<checkerBlack.length; i++){
        if( Math.trunc(checkerBlack[i].getBoundingClientRect().top) == (Math.trunc(top) + 5) && Math.trunc(checkerBlack[i].getBoundingClientRect().left) == (Math.trunc(left) + 5) ) {
            return checkerBlack[i].id;
        }
    }
}

// ------------------- Таймер для белых шашек ---------------------------------

function timerWhiteShow() {
    intWhite = setInterval(tickWhite, 1000);
}
function tickWhite() {
    secWhite++;
    if (secWhite >= 60) {
        minWhite++;
        secWhite = secWhite - 60;
    }
    if (minWhite >= 60) {
        hourWhite++;
        minWhite = minWhite - 60;
    }
    if (secWhite < 10) {
        if (minWhite < 10) {
            if (hourWhite < 10) {
                timerWhite.innerHTML ='0' + hourWhite + ':0' + minWhite + ':0' + secWhite;
            } else {
                timerWhite.innerHTML = hourWhite + ':0' + minWhite + ':0' + secWhite;
            }
        } else {
            if (hourWhite < 10) {
                timerWhite.innerHTML = '0' + hourWhite + ':' + minWhite + ':0' + secWhite;
            } else {
                timerWhite.innerHTML = hourWhite + ':' + minWhite + ':0' + secWhite;
            }
        }
    } else {
        if (minWhite < 10) {
            if (hourWhite < 10) {
                timerWhite.innerHTML = '0' + hourWhite + ':0' + minWhite + ':' + secWhite;
            } else {
                timerWhite.innerHTML = hourWhite + ':0' + minWhite + ':' + secWhite;
            }
        } else {
            if (hourWhite < 10) {
                timerWhite.innerHTML = '0' + hourWhite + ':' + minWhite + ':' + secWhite;
            } else {
                timerWhite.innerHTML = hourWhite + ':' + minWhite + ':' + secWhite;
            }
        }
    }
}

// ----------- Таймер для черных шашек ---------------------------------

function timerBlackShow() {
    intBlack = setInterval(tickBlack, 1000);
}
function tickBlack() {
    secBlack++;
    if (secBlack >= 60) {
        minBlack++;
        secBlack = secBlack - 60;
    }
    if (minBlack >= 60) {
        hourBlack++;
        minBlack = minBlack - 60;
    }
    if (secBlack < 10) {
        if (minBlack < 10) {
            if (hourBlack < 10) {
                timerBlack.innerHTML ='0' + hourBlack + ':0' + minBlack + ':0' + secBlack;
            } else {
                timerBlack.innerHTML = hourBlack + ':0' + minBlack + ':0' + secBlack;
            }
        } else {
            if (hourBlack < 10) {
                timerBlack.innerHTML = '0' + hourBlack + ':' + minBlack + ':0' + secBlack;
            } else {
                timerBlack.innerHTML = hourBlack + ':' + minBlack + ':0' + secBlack;
            }
        }
    } else {
        if (minBlack < 10) {
            if (hourBlack < 10) {
                timerBlack.innerHTML = '0' + hourBlack + ':0' + minBlack + ':' + secBlack;
            } else {
                timerBlack.innerHTML = hourBlack + ':0' + minBlack + ':' + secBlack;
            }
        } else {
            if (hourBlack < 10) {
                timerBlack.innerHTML = '0' + hourBlack + ':' + minBlack + ':' + secBlack;
            } else {
                timerBlack.innerHTML = hourBlack + ':' + minBlack + ':' + secBlack;
            }
        }
    }
}

//-------------------  Переключение между игроками  ----------------

function activeW() { // ------- Активный игрок белыми шашками ---------------
    for(let i=0; i<checkerWhite.length; i++){
        checkerWhite[i].onclick = function() {
            clearActiveChecker();
            checkerWhite[i].classList.add('_active-checker');
        };
    };
    clearInterval(intBlack);
    timerWhiteShow();
    activeWhite.classList.add('_active');
    activeBlack.classList.remove('_active');
}
function  activeB() {  // ------- Активный игрок черными шашками -------------
    for(let i=0; i<checkerBlack.length; i++){
        checkerBlack[i].onclick = function() {
            clearActiveChecker();
            checkerBlack[i].classList.add('_active-checker');
        };
    };
    clearInterval(intWhite);
    timerBlackShow();
    activeWhite.classList.remove('_active');
    activeBlack.classList.add('_active');
}
// activeW();
// activeB();
function notActiveW() { // --------- Отключение активности игрока белых шашек ----------
    for(let i=0; i<checkerBlack.length; i++){
        checkerWhite[i].onclick = null;
    };
}
function notActiveB() { // ----------- Отключение активности игрока черных шашек --------
    for(let i=0; i<checkerBlack.length; i++){
        checkerBlack[i].onclick = null;
    };
}

//---------------------- Начало игры --------------------------

gameUp.addEventListener('click', ()=>{
    minBlack = 0;
    hourBlack = 0;
    secBlack = 0;
    minWhite = 0;
    hourWhite = 0;
    secWhite = 0;
    whiteСount = 0;
    blackСount = 0;
    clearInterval(intWhite);
    clearInterval(intBlack);
    timerBlack.innerHTML = '00:00:00';
    timerWhite.innerHTML = '00:00:00';
    removeCheckers();
    createCheckers();
    checkerWhite = document.querySelectorAll('.checker-white');
    checkerBlack = document.querySelectorAll('.checker-black');
    activeW();
});

// ----------------------- Основной код --------------------------------------------

substrate.classList.add('hide');
substrate.classList.remove('show');

for(let i=0; i<cellBlack.length; i++){
        cellBlack[i].addEventListener('click', ()=>{
            let topCellBlack = Math.trunc(cellBlack[i].getBoundingClientRect().top);
            let leftCellBlack = Math.trunc(cellBlack[i].getBoundingClientRect().left);
            let activeChecker = document.querySelector('._active-checker');
            let activeCheckerTop = (activeChecker) ? Math.trunc(activeChecker.getBoundingClientRect().top) : null;
            let activeCheckerLeft = (activeChecker) ? Math.trunc(activeChecker.getBoundingClientRect().left) : null;

            if(activeChecker && activeChecker.classList.contains('checker-white')){// ----- Для белых шашек ---------------------------

                //----------------- Для белой дамки ---------------------------

                if(activeChecker.classList.contains('_king')){
                    let y = Math.round((activeCheckerTop - (topCellBlack-5))/60);
                    let x = Math.round((leftCellBlack - (activeCheckerLeft-5))/60);
                    let topY = Math.trunc(activeCheckerTop)-5;
                    let leftX = Math.trunc(activeCheckerLeft)-5;
                    let countW = 0;
                    let countB = 0;
                    let count;
                    if(x>0 && y>0){
                        for(let i=1; i<x; i++){
                            topY-=60;
                            leftX+=60;
                            if(presenceWhite(topY, leftX)) {
                                countW+=1;
                            }
                            if(presenceBlack(topY, leftX)){
                                countB+=1;
                            }
                        }
                    }
                    if(x>0 && y<0){
                        for(let i=1; i<x; i++){
                            topY+=60;
                            leftX+=60;
                            if(presenceWhite(topY, leftX)) {
                                countW+=1;
                            }
                            if(presenceBlack(topY, leftX)){
                                countB+=1;
                            }
                        }
                    }
                    if(x<0 && y<0){
                        for(let i=1; i<Math.abs(x); i++){
                            topY+=60;
                            leftX-=60;
                            if(presenceWhite(topY, leftX)){
                                countW+=1;
                            }
                            if(presenceBlack(topY, leftX)){
                                countB+=1;
                            }
                        }
                    }
                    if(x<0 && y>0){
                        for(let i=1; i<Math.abs(x); i++){
                            topY-=60;
                            leftX-=60;
                            if(presenceWhite(topY, leftX)){
                                countW+=1;
                            }
                            if(presenceBlack(topY, leftX)){
                                countB+=1;
                            }
                        }
                    }
                    count = countW+countB;
                    if( Math.abs(y) == Math.abs(x) && !presenceWhite(topCellBlack, leftCellBlack) && !presenceBlack(topCellBlack, leftCellBlack) && count<2 && countW==0){
                        activeChecker.style.top = (topCellBlack - topСells) + 'px';
                        activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                        clearActiveChecker();
                        activeB();
                        notActiveW();
                        if(countB==1) {
                            topY = Math.trunc(activeCheckerTop)-5;
                            leftX = Math.trunc(activeCheckerLeft)-5;
                            for(let i=1; i<Math.abs(x); i++){
                                if(x<0 && y>0){
                                    topY-=60;
                                    leftX-=60;
                                };
                                if(x<0 && y<0){
                                    topY+=60;
                                    leftX-=60;
                                };
                                if(x>0 && y<0){
                                    topY+=60;
                                    leftX+=60;
                                };
                                if(x>0 && y>0){
                                    topY-=60;
                                    leftX+=60;
                                };
                                if(presenceBlack(topY, leftX)){
                                    document.getElementById(presenceBlack(topY, leftX)).remove();
                                    whiteСount+=1;
                                }
                                endGame();
                            }
                        }
                        clearInterval(intWhite);
                    }
                }

                if((Math.trunc(topCellBlack) == Math.trunc(topСells)+5 ) && !activeChecker.classList.contains('_king')){
                    activeChecker.classList.add('_king');
                }
                if(topCellBlack==activeCheckerTop-65 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceBlack(topCellBlack, leftCellBlack)){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    clearActiveChecker();
                    activeB();
                    notActiveW();
                }
                if( topCellBlack==activeCheckerTop-125 && leftCellBlack==activeCheckerLeft+115 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceBlack(topCellBlack, leftCellBlack) && presenceBlack(topCellBlack+60, leftCellBlack-60) ){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    document.getElementById(presenceBlack(topCellBlack+60, leftCellBlack-60)).remove();
                    whiteСount+=1;
                    clearActiveChecker();
                    activeB();
                    notActiveW();
                }
                if( topCellBlack==activeCheckerTop-125 && leftCellBlack==activeCheckerLeft-125 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceBlack(topCellBlack, leftCellBlack) && presenceBlack(topCellBlack+60, leftCellBlack+60) ){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    document.getElementById(presenceBlack(topCellBlack+60, leftCellBlack+60)).remove();
                    whiteСount+=1;
                    clearActiveChecker();
                    activeB();
                    notActiveW();
                }
                if( topCellBlack==activeCheckerTop+115 && leftCellBlack==activeCheckerLeft+115 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceBlack(topCellBlack, leftCellBlack) && presenceBlack(topCellBlack-60, leftCellBlack-60) ){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    document.getElementById(presenceBlack(topCellBlack-60, leftCellBlack-60)).remove();
                    whiteСount+=1;
                    clearActiveChecker();
                    activeB();
                    notActiveW();
                }
                if( topCellBlack==activeCheckerTop+115 && leftCellBlack==activeCheckerLeft-125 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceBlack(topCellBlack, leftCellBlack) && presenceBlack(topCellBlack-60, leftCellBlack+60) ){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    document.getElementById(presenceBlack(topCellBlack-60, leftCellBlack+60)).remove();
                    whiteСount+=1;
                    clearActiveChecker();
                    activeB();
                    notActiveW();
                }
                clearInterval(intWhite);
                endGame();
            }
            else{ // ------------------------ Для черных -----------------------------------
    
                // ------------------------ Для черной дамки -----------------------------
                if(activeChecker && activeChecker.classList.contains('_king')){
                    let y = Math.round((activeCheckerTop - (topCellBlack-5))/60);
                    let x = Math.round((leftCellBlack - (activeCheckerLeft-5))/60);
                    let topY = Math.trunc(activeCheckerTop)-5;
                    let leftX = Math.trunc(activeCheckerLeft)-5;
                    let countW = 0;
                    let countB = 0;
                    let count;
                    if(x>0 && y>0){
                        for(let i=1; i<x; i++){
                            topY-=60;
                            leftX+=60;
                            if(presenceWhite(topY, leftX)) {
                                countW+=1;
                            }
                            if(presenceBlack(topY, leftX)){
                                countB+=1;
                            }
                        }
                    }
                    if(x>0 && y<0){
                        for(let i=1; i<x; i++){
                            topY+=60;
                            leftX+=60;
                            if(presenceWhite(topY, leftX)) {
                                countW+=1;
                            }
                            if(presenceBlack(topY, leftX)){
                                countB+=1;
                            }
                        }
                    }
                    if(x<0 && y<0){
                        for(let i=1; i<Math.abs(x); i++){
                            topY+=60;
                            leftX-=60;
                            if(presenceWhite(topY, leftX)){
                                countW+=1;
                            }
                            if(presenceBlack(topY, leftX)){
                                countB+=1;
                            }
                        }
                    }
                    if(x<0 && y>0){
                        for(let i=1; i<Math.abs(x); i++){
                            topY-=60;
                            leftX-=60;
                            if(presenceWhite(topY, leftX)){
                                countW+=1;
                            }
                            if(presenceBlack(topY, leftX)){
                                countB+=1;
                            }
                        }
                    }
                    count = countW+countB;
                    if( Math.abs(y) == Math.abs(x) && !presenceWhite(topCellBlack, leftCellBlack) && !presenceBlack(topCellBlack, leftCellBlack) && count<2 && countB==0){
                        activeChecker.style.top = (topCellBlack - topСells) + 'px';
                        activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                        clearActiveChecker();
                        activeW();
                        notActiveB();
                        if(countW==1) {
                            topY = Math.trunc(activeCheckerTop)-5;
                            leftX = Math.trunc(activeCheckerLeft)-5;
                            for(let i=1; i<Math.abs(x); i++){
                                if(x<0 && y>0){
                                    topY-=60;
                                    leftX-=60;
                                };
                                if(x<0 && y<0){
                                    topY+=60;
                                    leftX-=60;
                                };
                                if(x>0 && y<0){
                                    topY+=60;
                                    leftX+=60;
                                };
                                if(x>0 && y>0){
                                    topY-=60;
                                    leftX+=60;
                                };
                                if(presenceWhite(topY, leftX)){
                                    document.getElementById(presenceWhite(topY, leftX)).remove();
                                    blackСount+=1;
                                }
                                endGame();
                            }
                        }
                        clearInterval(intBlack);
                    }
                }
                
                if(topCellBlack==activeCheckerTop+55 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceBlack(topCellBlack, leftCellBlack)){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    clearActiveChecker();
                    activeW();
                    notActiveB();
                }
                if( topCellBlack==activeCheckerTop-125 && leftCellBlack==activeCheckerLeft+115 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceWhite(topCellBlack, leftCellBlack) && presenceWhite(topCellBlack+60, leftCellBlack-60) ){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    document.getElementById(presenceWhite(topCellBlack+60, leftCellBlack-60)).remove();
                    blackСount+=1;
                    clearActiveChecker();
                    activeW();
                    notActiveB();
                }
                if( topCellBlack==activeCheckerTop-125 && leftCellBlack==activeCheckerLeft-125 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceWhite(topCellBlack, leftCellBlack) && presenceWhite(topCellBlack+60, leftCellBlack+60) ){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    document.getElementById(presenceWhite(topCellBlack+60, leftCellBlack+60)).remove();
                    blackСount+=1;
                    clearActiveChecker();
                    activeW();
                    notActiveB();
                }
                if( topCellBlack==activeCheckerTop+115 && leftCellBlack==activeCheckerLeft+115 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceWhite(topCellBlack, leftCellBlack) && presenceWhite(topCellBlack-60, leftCellBlack-60) ){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    document.getElementById(presenceWhite(topCellBlack-60, leftCellBlack-60)).remove();
                    blackСount+=1;
                    clearActiveChecker();
                    activeW();
                    notActiveB();
                }
                if( topCellBlack==activeCheckerTop+115 && leftCellBlack==activeCheckerLeft-125 && !presenceWhite(topCellBlack, leftCellBlack) && !presenceWhite(topCellBlack, leftCellBlack) && presenceWhite(topCellBlack-60, leftCellBlack+60) ){
                    activeChecker.style.top = (topCellBlack - topСells) + 'px';
                    activeChecker.style.left = (leftCellBlack - leftСells) + 'px';
                    document.getElementById(presenceWhite(topCellBlack-60, leftCellBlack+60)).remove();
                    blackСount+=1;
                    clearActiveChecker();
                    activeW();
                    notActiveB();
                }
                if( (Math.trunc(bottomCells) - 60) == Math.trunc(topCellBlack) && !activeChecker.classList.contains('_king')){
                    activeChecker.classList.add('_king');
                }
                clearInterval(intBlack);
                endGame();
            }
        });
};

// ------------------------------ Конец игры --------------------------------------

function endGame(){
    if(whiteСount==12){
        clearInterval(intBlack);
        clearInterval(intWhite);
        clearActiveChecker();
        notActiveB();
        notActiveW();
        winner.innerHTML = " белые";
        whiteScore.innerHTML = whiteСount;
        blackScore.innerHTML = blackСount;
        substrate.classList.remove('hide');
        substrate.classList.add('show');
    }
    else if(blackСount==12){
        clearInterval(intBlack);
        clearInterval(intWhite);
        clearActiveChecker();
        notActiveB();
        notActiveW();
        winner.innerHTML = " черные";
        whiteScore.innerHTML = whiteСount;
        blackScore.innerHTML = blackСount;
        substrate.classList.remove('hide');
        substrate.classList.add('show');
    }
}

close.addEventListener('click', ()=>{
    substrate.classList.add('hide');
    substrate.classList.remove('show');
})

surrenderWhite.addEventListener('click', ()=>{ //------------------ Сдались белые ---------------------------
    clearInterval(intBlack);
    clearInterval(intWhite);
    whiteScore.innerHTML = whiteСount;
    blackScore.innerHTML = blackСount;
    winner.innerHTML = " черные";
    substrate.classList.remove('hide');
    substrate.classList.add('show');
});

surrenderBlack.addEventListener('click', ()=>{ //-------------------- Сдались черные ------------------------
    clearInterval(intBlack);
    clearInterval(intWhite);
    whiteScore.innerHTML = whiteСount;
    blackScore.innerHTML = blackСount;
    winner.innerHTML = " белые";
    substrate.classList.remove('hide');
    substrate.classList.add('show');
});

