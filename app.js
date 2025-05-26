// acces the boxes 
let boxes = document.querySelectorAll(".box");

// access the reset button
let reset = document.querySelector("#reset-btn")

// access the new game btn
let newGameBtn = document.querySelector("#new-btn")

// access the msg-container 
let msgBtn = document.querySelector(".msg-container");

// access the msg
let msg = document.querySelector("#msg");
 
let turnX = true;
let count = 0; // track the button clicks

const resetGame = () => {
    // initially agar x ki turn thi to x ki turn ho jaye and vice versa.
    // track the players.
    turnX = true;
    count = 0; // reset count
    enableBoxes();
    // hide the msgcontainer whern game is reset
    msgBtn.classList.add("hide");
}


// arrays of winning patterns 
let winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// Add event listener to the boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // give text to box when click on tyhe boxes.
        if (turnX) {
            box.innerText = "X";
            turnX = false; // so that turnO can run it chance
        } else {
            box.innerText = "O";
            turnX = true;
        }
        // disable the box so that whe player click on 2nd times it value not changes.
        box.disabled = true;
        count++; // increase count on every move or button clicked.
        // track winner
        checkWinner();
    });
});

// if winner is decide disable all the boxes.
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgBtn.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "😐 Game is a Draw!";
    msgBtn.classList.remove("hide");
    disableBoxes();
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "" // to reset the value of boxes
    }
};

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {                
                // function for showing winner
                showWinner(pos1Val);
            }
        }
    }
    if (count === 9) {
        showDraw();
    };
};

// jaise hi new game btn par click kiya jayega game reset ho jaega.
newGameBtn.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);