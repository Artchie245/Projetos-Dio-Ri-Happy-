const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLives: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000),
    }
};

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.2;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime<=0){
        playSound("gameover");
        clearInterval(state.actions.countDownTimeId)
        clearInterval(state.actions.timerId)
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }else if(square.id !== state.values.hitPosition){
                state.values.currentLives--;
                state.view.lives.textContent = "x"+state.values.currentLives;
                if(state.values.currentLives <= 0){
                    clearInterval(state.actions.countDownTimeId)
                    clearInterval(state.actions.timerId)
                    alert("Suas vidas acabaram! O seu resultado foi: " + state.values.result);
                    playSound("death");
                }
            }
        })
    })
}

function initialize(){
    addListenerHitBox();
}

initialize();