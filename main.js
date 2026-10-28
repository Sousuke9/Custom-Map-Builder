const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let lastTime = 0
let x,y,mouseDown,pos1,pos2; //x,y, are mouse pos
let centerX=0,centerY = 0; //center
let rects={}
let size = 1;
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
    Math.min(pos1.x, pos2.x),
    Math.min(pos1.y, pos2.y),
    Math.abs(pos2.x - pos1.x),
    Math.abs(pos2.y - pos1.y),
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
    drawRect(new Rect(
      Math.min(pos1.x, x),
      Math.min(pos1.y, y),
      Math.abs(x - pos1.x),
      Math.abs(y - pos1.y),
      "rgba(0,0,0,0.5)"
    ));
  }

  loadInterface(deltaTime);

  ctx.fillText(`${centerX}, ${centerY}`,10,10)
}

function drawRect(rect) {
  ctx.fillStyle = rect.color;
  ctx.fillRect((rect.x+canvas.width/2-rect.w)-centerX, (rect.y+canvas.height/2-rect.h)-centerY, rect.w, rect.h);
}

class Rect{
    constructor(rx,ry,w,h,color){
        this.x =  centerX+(rx-window.width/2)
        this.y = centerY+(ry-window.width/2)
        console.log((centerX+(rx-window.width/2))+","+(centerY+(ry-window.width/2)))
        this.w = w;
        this.h = h;
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