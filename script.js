// DOM Elements
const openGiftBtn = document.getElementById('openGift');
const giftModal = document.getElementById('giftModal');
const closeModal = document.getElementById('closeModal');
const bgCanvas = document.getElementById('bgCanvas');
const ctx = bgCanvas.getContext('2d');

// Resize Canvas
function resizeCanvas(){ bgCanvas.width=window.innerWidth; bgCanvas.height=window.innerHeight; }
window.addEventListener('resize',resizeCanvas);
resizeCanvas();

// Gift Modal
openGiftBtn.addEventListener('click',()=>{
  giftModal.classList.remove('hidden');
  spawnHearts(30);
  spawnConfetti(40);
});
closeModal.addEventListener('click',()=>giftModal.classList.add('hidden'));

// Particle Arrays
let particles = [];

// Hearts / Confetti
function spawnHearts(n){
  for(let i=0;i<n;i++){
    particles.push({x:Math.random()*window.innerWidth, y:window.innerHeight, vx:(Math.random()-0.5)*2, vy:-Math.random()*3-2, size:10+Math.random()*5, color:'#ff6b81', life:100});
  }
}

function spawnConfetti(n){
  for(let i=0;i<n;i++){
    const colors=['#ffdd59','#ff6b81','#1dd1a1','#5f27cd','#54a0ff'];
    particles.push({x:Math.random()*window.innerWidth, y:0, vx:(Math.random()-0.5)*2, vy:Math.random()*2+1, size:5+Math.random()*5, color:colors[Math.floor(Math.random()*colors.length)], life:100});
  }
}

// Draw Loop
function drawParticles(){
  ctx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];
    ctx.globalAlpha=p.life/100;
    ctx.fillStyle=p.color;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fill();
    p.x+=p.vx; p.y+=p.vy; p.life--;
    if(p.life<=0) particles.splice(i,1);
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();
