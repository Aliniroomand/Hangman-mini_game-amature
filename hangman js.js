const secretWords=["لیانا","مریم","مهسا","علی","پرنسا","طاهره","احمد","جواد","سوسن","یاسمن","احسان"]

let randomItems="";
let clicked=[];
let result="";
let mistakes= 0;






//Functions
function selectRandomItems() {
    randomItems=secretWords[Math.floor((Math.random())*secretWords.length)];
    document.getElementById("letters").addEventListener("click",buttonHandler);
    window.addEventListener("keydown",keyHandler);
}
function letterHandler(letter){
    clicked.indexOf(letter)=== -1 ? clicked.push(letter) : null;

    document.getElementById(letter).className="used";
    if (randomItems.indexOf(letter) >= 0){
        setUnderScores();
        chekIfWon()
        
    } else if (randomItems.indexOf(letter) === -1){
         if(mistakes< 6){
            mistakes ++ ;
        checkIfLost();
        updateHangmanPicture();}
        }
        
    }
    
    function checkIfLost(){
        if(mistakes === 6){
            document.getElementById("gameover").querySelector("p").style.display="block";
            document.getElementById("clue").querySelector("p").innerHTML=`<p>کلمه -->${randomItems}<-- بود متاسفانه اشتباه گفتی</p>`
            setTimeout(() => {
                restart() 
            }, 1000);
        }

        
    }
    function updateHangmanPicture (){
        let image=document.getElementById("image").querySelector("img");
        image.src=`./assets/hangman${mistakes}.png`
    }


function chekIfWon(){
   if (randomItems === result) {
        document.getElementById("gameover").querySelector("p").style.display="block";
        document.getElementById("gameover").querySelector("p").innerText=" ای بنازم اون هوشت رو ... آفرین بردی";
        document.getElementById("image").querySelector("img").src="./assets/winner.png"}
    
}

function setUnderScores(){
    let splittedWord=randomItems.split("");
    let mappedWord=splittedWord.map(letter=> (clicked.indexOf(letter)) >= 0 ? letter : "_");
    result=mappedWord.join("");
    document.getElementById("clue").innerHTML=`<p>${result}</p>`
    
    
}

function buttonHandler(event) {
    letterHandler(event.target.id)
}

function keyHandler(event) {
    letterHandler(event.key)
}



selectRandomItems();
setUnderScores();

function restart(){

    if(window.confirm("you Lost do you want try again?")){
        clicked=[];
         result="";
         mistakes= 0;
        updateHangmanPicture();
        let image=document.getElementById("image").querySelector("img");
        image.src=`./assets/hangman0.png`;
        document.getElementById("clue").querySelector("p").innerHTML=`  <p>________</p>`
        document.getElementById("gameover").querySelector("p").style.display="none";
        selectRandomItems();

}

}