const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let lastTime = 0
let x,y,mouseDown,pos1,pos2; //x,y, are mouse pos
let centerX=0,centerY = 0; //center
let rects={}
let size = 1;
let offsetX = canvas.width/2
let offsetY = canvas.height/2
canvas.addEventListener("mousemove", (e) => {
  x = e.offsetX;
  y = e.offsetY;
})
canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  mouseDown = true;
  pos1 = {x,y};
})
canvas.addEventListener("mouseup", (e) => {
  if (!mouseDown) return;

  mouseDown = false;
  pos2 = {x:e.offsetX,y:e.offsetY};
  const rect = new Rect(
    pos1.x,
    pos1.y,
    pos2.x-pos1.x,
    pos2.y-pos1.y,
    "rgba(0,0,255,0.5)"
  );
  rects[Object.keys(rects).length] = rect;
})


function isOnRect(rect){

}

function draw(deltaTime) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(canvas.width/2-5,canvas.height/2-5,10,10);

  for (const rect of Object.values(rects)) {
    drawRect(rect);
  }

  if (mouseDown) {
    ctx.fillStyle= "rgba(0,0,0,0.5)"
  ctx.fillRect(
      pos1.x,
     pos1.y,
      x - pos1.x,
      y - pos1.y
    );
  }

  loadInterface(deltaTime);

  ctx.fillText(`Center: ${centerX}, ${centerY}`,10,10)
  ctx.fillText(`Mouse: ${x-offsetX}, ${-(y-offsetY)}`,10,20)
}

function drawRect(rect) {
  ctx.fillStyle = rect.color;
  ctx.fillRect(rect.x+centerX+offsetX,-rect.y+centerY+offsetY, rect.w, -rect.h);
}

class Rect{
    constructor(rx,ry,w,h,color){
   const bx=centerX+(rx-canvas.width/2)
   const by=centerY+(ry-canvas.height/2)
        this.x =  bx;
        this.y = -by;
        console.log(bx+","+-by);
        console.log(w+", "+(-h))
        this.w = w;
        this.h =-h;
        console.log("---------------")
        this.color = color;
    }
}

function loop(timeS) {
  const deltaTime = timeS 
  - lastTime;
  lastTime = timeS;

draw(deltaTime);

  requestAnimationFrame(loop);
}


requestAnimationFrame(loop);