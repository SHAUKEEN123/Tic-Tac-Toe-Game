let boxes=document.querySelectorAll(".Box");
let msgContanier=document.querySelector(".massage_contanier");
let msg=document.querySelector("#msg");
let newGameBtn=document.querySelector("#new_btn");
let reSetGameBtn=document.querySelector("#reset_btn");
const winPatterns=[
    [0,1,2],  [3,4,5],  [6,7,8],   //rows
    [0,3,6],  [1,4,7],  [2,5,8],  //columns
    [0,4,8],  [2,4,6],  //daogonals 
];

let turnO=true//playerX,playerO

boxes.forEach((Box)=> {
   Box.addEventListener("click",()=>{
    if(turnO){
        Box.innerText="O";
        turnO=false;
    }
    else{
        Box.innerText="X";
        turnO=true;
    }
    Box.disabled=true;

    checkWinner();
   })
});


const checkWinner=()=>{
    let winnerFound = false;
    for(let pattern of winPatterns){
     let positionVal1=boxes[pattern[0]].innerText;
     let positionVal2=boxes[pattern[1]].innerText;
     let positionVal3=boxes[pattern[2]].innerText;

    if(positionVal1!=""&&positionVal2!=""&&positionVal3!=""){
        if(positionVal1===positionVal2&&positionVal2===positionVal3){
            // console.log("winner",positionVal1)
            winnerShow(positionVal1);
            winnerFound = true;
        }
    }  
    if(!winnerFound && allBoxesFilled()){
        isDrow();
        msg.innerText=`Game is tied!`
        msgContanier.classList.remove("visibility");
        disableBoxes();
    }
}
};

const winnerShow=(winner)=>{
    msg.innerText=`Game over!,${winner} wins!`
    msgContanier.classList.remove("visibility");
    disableBoxes();
}

const disableBoxes=()=>{
    for(Box of boxes){
        Box.disabled=true;
    }
};

const enableBoxes=()=>{
    for(Box of boxes){
        Box.disabled=false;
        Box.innerText="";
    }
};

const reSetGame=()=>{
turnO=true;
enableBoxes();
msgContanier.classList.add("visibility");
};

newGameBtn.addEventListener("click",reSetGame);
reSetGameBtn.addEventListener("click",reSetGame);


const allBoxesFilled = () => {
    return Array.from(boxes).every(Box => Box.innerText !== "");
};

const isDrow=()=>{
    for(let Box of boxes)
    {
    if(Box.innerText===""){
        return false;
    }
    }  
return true;   
}