// Initiallisation
let canvas= document.querySelector('canvas');
let W= window.innerWidth-50;
let H= window.innerHeight-50;
canvas.width= W;
canvas.height= H;
let c= canvas.getContext('2d');

// class for ball and score
class Circle{
    constructor(){
        this.x= (W/1.9);
        this.y= (Math.random()*H-2)+1;
        this.r= 20;
        this.dx= 7;
        this.dy= 6;
        this.score1= 0;
        this.score2= 0;
        this.audio = document.createElement("audio");
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        c.fillStyle="yellow";
        c.fill();
        // score card
        c.font= "bold 25px Arial";
        c.fillStyle="green";
        c.fillText(this.score1,120,20);
        c.fillText(this.score2,W-150,20);
    }
    reset(){
        this.x=(W/1.9);
        this.y=(Math.random()*H-2)+1;
        this.dx=-this.dx;
    }
    update(pos1,pos2){

        if( (this.x+this.r>pos2.x && this.x<pos2.x+5) && (this.y>pos2.y && this.y<(pos2.y+150)) ){
            this.dx=-this.dx;
        }
        if( (this.x-this.r<pos1.x+5 && this.x>pos1.x+5) && (this.y>pos1.y && this.y<(pos1.y+150)) ){
            this.dx=-this.dx;
        }
        if(this.y+this.r>H || this.y-this.r<0){
            this.dy=-this.dy;
        }
        if(this.x+this.r>W){
            if(this.score1>=9){
                alert("player 1 win");
                location.reload();
            }else{
                this.sound();
                this.score1++;
            }
            setTimeout(this.reset(),3000);
        }
        if(this.x-this.r<0){
            if(this.score2>=9){
                alert("player 2 win");
                location.reload();
            }else{
                this.sound();
                this.score2++;
            }
            setTimeout(this.reset(),3000);
        }
        this.x+=this.dx;
        this.y+=this.dy;
        this.draw();
    }
    sound() {
        this.audio.src = "ding.mp3";
        this.audio.setAttribute("preload", "auto");
        this.audio.setAttribute("controls", "none");
        this.audio.style.display = "none";
        document.body.appendChild(this.audio);
        this.audio.play();   
    }
}

// class for sticks
class Player{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    getpos(){
        return{
            x:this.x,
            y:this.y
        } 
    }
    setpos(move){
        if(this.y>0  && this.y+150<H)
        this.y+=move;
        else if(move>0 && this.y<=0)
        this.y+=move;
        else if(move<0 && this.y+150>=H)
        this.y+=move;
    }
    draw(){
        c.beginPath();
        c.fillStyle= "blue";
        c.fillRect(this.x,this.y,5,150);
    }
}

// controls
let player1= new Player(50,200);
let player2= new Player(W-80,200);
let move=20;
document.addEventListener("keydown",(event)=>{

    if(event.key==="ArrowUp"){
        player2.setpos(-move);
    }
    if(event.key==="ArrowDown"){
        player2.setpos(move);
    }
    if(event.key==="w"){
        player1.setpos(-move);
    }
    if(event.key==="s"){
        player1.setpos(move);
    }
    

});

// playing loop
let circle=new Circle();
let recurse;

function animate(){
    recurse=requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    player1.draw();
    player2.draw(); 
    let pos2=player2.getpos();
    let pos1=player1.getpos();
    circle.update(pos1,pos2); 

}

// start pause and restart the game
let start= document.getElementById("start");
let restart= document.getElementById("restart");
let pause= document.getElementById("pause");

start.addEventListener("click",()=>{
    start.style.display="none";
    pause.style.display="inline";
    animate();
});
pause.addEventListener("click",()=>{
    restart.style.display="inline";
    pause.style.display="none";
    cancelAnimationFrame(recurse); 
});
restart.addEventListener("click",()=>{
    restart.style.display="none";
    pause.style.display="inline";
    animate();
});




