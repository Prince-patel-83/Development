const boxes = document.querySelectorAll(".box");
const RestartBtn = document.querySelector(".RestartBtn");
const Curr_turn = document.querySelector(".current-turn");
const StartBtn = document.querySelector(".StartBtn");
const StartModal = document.querySelector(".StartModal");

const pre = 'X';
const next = 'O';
 
// indicate current turn 
let curr = pre;

// change turn at rumntime
function Turn(){
    if(curr == pre){
       curr = next ;
       Curr_turn.textContent = "Player 2 Turn";
    }else{
        curr = pre ;
        Curr_turn.textContent =  "Player 1 Turn";
    }
}

//  handle the game or all logic of the Game
const green = (e)=>{
    if(e.target.textContent == '' )  {
        e.target.textContent = curr ;
        let Iswin = checkWin();
        if(Iswin){
            console.log(`${curr} is winner`);
            Curr_turn.textContent = curr == pre ? "Player 1 Win The Game" : "Player 2 Win The Game" ;
            EndGame();
            return;
        }else if(IsTie() && !Iswin){
            Curr_turn.textContent = "It's a Tie ";
            EndGame();
        }else{
            Turn();
        }
    }
    
    console.log();
}

// plot Starting of Game

function Start(){
    StartModal.style.display = "none";
    boxes.forEach((box)=>{
        box.addEventListener("click" , green );
    })
}

// remove event listner from board to end game
function EndGame(){
    boxes.forEach(function(box){
        box.removeEventListener("click" , green );
    })
}

// Function to check win
const checkWin = ()=>{
    const winingConditions = 
    [
        [0 , 1 , 2],
        [3 , 4 , 5],
        [6 , 7 , 8],
        [0 , 3 , 6],
        [1 , 4 , 7],
        [2 , 5 , 8],
        [0 , 4 , 8],
        [2 , 4 , 6]
    ];
    for(let i = 0 ; i<winingConditions.length ;i++){
        const [pos1 , pos2 , pos3] = winingConditions[i];
        if(boxes[pos1].textContent !== '' &&
            boxes[pos1].textContent == boxes[pos2].textContent &&
            boxes[pos2].textContent == boxes[pos3].textContent
        ){
            return true ;
        }
    }
    return false;
}

//  Function to check tie
const IsTie = ()=>{
    let Emptycount = 0
    boxes.forEach(function(box){
        if(box.textContent === '') Emptycount++;
    })
    return Emptycount === 0 ;
}

// function to restart the Game
const Restart = ()=>{    
    boxes.forEach((box)=>{
        box.textContent = '' ;
        box.addEventListener("click" , green );
        Turn();
    })
}
 
RestartBtn.addEventListener("click" , Restart);

StartBtn.addEventListener("click" , Start );   