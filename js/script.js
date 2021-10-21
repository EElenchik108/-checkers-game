"use strict";

let checkerBlack = document.querySelectorAll('.checker-black'); // Все черные шашки
let checkerWhite = document.querySelectorAll('.checker-white'); // Все белые шашки
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
let intBlack; // Интервал для ченых шашек
let minWhite = 0;
let hourWhite = 0;
let secWhite = 0;
let intWhite; // Интервал для белых шашек
let whiteСount = 0; // Счет белых
let blackСount = 0; // Счет черных

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
            // return true;
            return checkerWhite[i].id;
        }
    }
}
// console.log(presenceWhite(560.71875, 485.5));

// ------------------- Наличие в ячейке черной шашки -----------------------------
function presenceBlack(top, left){
    for(let i=0; i<checkerBlack.length; i++){
        if( Math.trunc(checkerBlack[i].getBoundingClientRect().top) == (Math.trunc(top) + 5) && Math.trunc(checkerBlack[i].getBoundingClientRect().left) == (Math.trunc(left) + 5) ) {
            return checkerBlack[i].id;
        }
    }
}
// console.log(presenceBlack(380, 625));

// ----------- Таймер для белых шашек ---------------------------------
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

// timerBlackShow();
// clearInterval(intBlack);
// timerWhiteShow();

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
activeW();
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

// notActiveB();
// notActiveW();

// ----------------------- Основной код --------------------------------------------

for(let i=0; i<cellBlack.length; i++){
        cellBlack[i].addEventListener('click', ()=>{
            let topCellBlack = Math.trunc(cellBlack[i].getBoundingClientRect().top);
            let leftCellBlack = Math.trunc(cellBlack[i].getBoundingClientRect().left);
            let activeChecker = document.querySelector('._active-checker');
            let activeCheckerTop = (activeChecker) ? Math.trunc(activeChecker.getBoundingClientRect().top) : null;
            let activeCheckerLeft = (activeChecker) ? Math.trunc(activeChecker.getBoundingClientRect().left) : null;

            if(activeChecker && activeChecker.classList.contains('checker-white')){
                // ---------------- Для белых шашек ---------------------------

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
                    // console.log('count = '+count);
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
                            }
                        }
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

            }
            else{
                // ------------------------ Для черных -----------------------------------
    
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
                    // console.log('count = '+count);
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
                            }
                        }
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
            }
        });
    };


