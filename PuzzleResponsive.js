var rows;
var columns;
var imgOrder;
var originalarray ;
var difficulty;
var whitebox;
var incompletePuzzle;


var currTile;
var otherTile;
var bool = true;



var turns = 0;





function Easy(){
    rows = 3;
    columns = 3;
    if(incompletePuzzle)
    {
      imgOrder = imgOrder;
    }
    else
    {
        if(bool==false)
        {
            imgOrder = ["9","8","7","6","5","4","3","2","1"];
        }
        else{
            imgOrder = ["9","7","8","6","5","4","3","2","1"];
        }
    }
    incompletePuzzle = false;
    
    originalarray = ["9","8","7","6","5","4","3","2","1"];
    difficulty = "_EasyImage";
    whitebox = "7_EasyImage";
    document.getElementById("EasyButton").classList.add("underline");
    document.getElementById("MediumButton").classList.remove("underline");
    document.getElementById("HardButton").classList.remove("underline");
    
  
    showPuzzle();
}

function Medium(){
    rows = 4;
    columns = 4;
    if(incompletePuzzle)
    {
      imgOrder = imgOrder;
    }
    else
    {
        if(bool==false)
        {
            imgOrder = ["16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
        }
        else{
            imgOrder = ["16","15","13","14","12","11","10","9","8","7","6","5","4","3","2","1"];
        }
    }
    incompletePuzzle = false;
    
    originalarray = ["16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
    difficulty = "_MediumImage";
    whitebox = "13_MediumImage";
    document.getElementById("EasyButton").classList.remove("underline");
    document.getElementById("MediumButton").classList.add("underline");
    document.getElementById("HardButton").classList.remove("underline");
    
    showPuzzle();
}

function Hard(){
    rows = 5;
    columns = 5;
    if(incompletePuzzle)
    {
      imgOrder = imgOrder;
    }
    else
    {
        if(bool==false)
        {
            imgOrder = ["25","24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
        }
        else{
            imgOrder = ["25","24","23","21","22","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
        }
       
    }

    incompletePuzzle = false;
    
    
    originalarray = ["25","24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
    difficulty = "_HardImage";
    whitebox = "21_HardImage";
    document.getElementById("EasyButton").classList.remove("underline");
    document.getElementById("MediumButton").classList.remove("underline");
    document.getElementById("HardButton").classList.add("underline");
    
    showPuzzle();
}


function showPuzzle(){

    turns = 0;
    document.getElementById("Board").innerHTML = "";
    document.getElementById("turns").innerHTML = turns;

    var index = 0;
    
    for(let r=0; r<rows; r++)
    {
        for(let c=0; c<columns; c++)
        {
            let Tile = document.createElement("img");
            Tile.id = r.toString()+"-"+c.toString();
            Tile.src = "Assets/"+imgOrder[index++]+difficulty+".jpg";
            if(difficulty==="_EasyImage")
            {
                Tile.classList.add("EasyBoardHeigthWidth");
            }
            else if(difficulty==="_MediumImage")
            {
                Tile.classList.add("MediumBoardHeigthWidth");
            }
            else{
                Tile.classList.add("HardBoardHeigthWidth");
            }
            document.getElementById("solve").classList.add("vanish"); 
            document.getElementById("unsolve").classList.remove("vanish"); 
            
            if(bool)
            {
               
                document.getElementById("unsolve").classList.add("vanish");
                document.getElementById("solve").classList.remove("vanish");
                Tile.addEventListener("dragstart",dragStart);
                Tile.addEventListener("dragover",dragOver);
                Tile.addEventListener("dragenter",dragEnter);
                Tile.addEventListener("dragleave",dragLeave);
                Tile.addEventListener("drop",dragDrop);
                Tile.addEventListener("dragend",dragEnd);  
            }
            document.getElementById("Board").append(Tile);

        } 
    }
    bool = true;
}

var currTileIndex ;
var otherTileIndex ;



function dragStart(){
    currTile = this;
    var slash = currTile.src.split("/");
    currTileIndex = parseInt(slash.pop());
}


function dragOver(e){
    e.preventDefault();
}


function dragEnter(e){
    e.preventDefault();
}


function dragLeave(e){
    e.preventDefault();
}


function dragDrop(){
    otherTile = this;
    var slash = otherTile.src.split("/");
    otherTileIndex = parseInt(slash.pop());
}

function dragEnd(){

    if(!otherTile.src.includes(whitebox)){
        return;
    }

    let currCoords = currTile.id.split("-");
    let r1 = parseInt(currCoords[0]);
    let c1 = parseInt(currCoords[1]);
   

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveleft = r1 == r2 && c1 == c2-1;
    let moveright = r1 == r2 && c1 == c2+1;
    let moveup = r1 == r2-1 && c1 == c2;
    let movedown = r1 == r2+1 && c1 == c2;

    let isAdjacent = moveleft || moveright || moveup || movedown;

    if(isAdjacent){
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;

    document.getElementById("turns").innerHTML = turns;

    var index1 = imgOrder.indexOf(otherTileIndex+"");
    var index2 = imgOrder.indexOf(currTileIndex+"");

    imgOrder[index1] = currTileIndex+"";
    imgOrder[index2] = otherTileIndex+"";
    

    if(imgOrder.join()==originalarray.join())
    {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Your won the match by '+turns+' turns',
            showConfirmButton: true,
            timer: 5000
          })
          nextPuzzle();
    }
    }
}



function solve(){
  
  bool = false;
  if(difficulty == "_EasyImage")
  {
    Easy();
  }
  else if(difficulty == "_MediumImage")
  {
    Medium();
  }
  else{
    Hard();
  }
}

function unsolve(){
    bool = true;
    if(difficulty == "_EasyImage")
    {
      Easy();
    }
    else if(difficulty == "_MediumImage")
    {
      Medium();
    }
    else{
      Hard();
    }
  }

  
  function showFullImage(){
    document.getElementById("Board").innerHTML = "";
    let Tile = document.createElement("img");
    if(difficulty=="_EasyImage")
    {
        Tile.src = "Assets/IronMan.png";
    }
    else if(difficulty=="_MediumImage")
    {
        Tile.src = "Assets/CaptainAmerica.png";
    }
    else{
        Tile.src = "Assets/Thor.png";
    }
    
    Tile.classList.add("Fullimage");
    document.getElementById("Board").append(Tile);
    incompletePuzzle = true;
  }

  if(difficulty=="_EasyImage")
  {
    Easy();
  }
  else if(difficulty=="_MediumImage")
  {
      Medium();
  }
  else{
      Hard();
  }


  function nextPuzzle()
  {
    if(difficulty=="_EasyImage")
  {
    Medium();
  }
  else if(difficulty=="_MediumImage")
  {
      Hard();
  }
  else{
      Easy();
  }


  }