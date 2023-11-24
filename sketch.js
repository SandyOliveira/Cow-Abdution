//crie as variaveis dos seus personagens aqui
var ESPERAR;
var JOGAR = 1;
var ENCERRAR = 0;

var estadoJogo = "ESPERAR";

var mudar = "n";


var cow1, p;
var imagemDeFundo;
var opacidadeOverlay = 0; // Começa totalmente transparente
var anoitecerFrame = 120; // Momento em que o anoitecer começa
var anoitecer = false;

var nave, nav;
var cow;
var cl;
var cr;
var light, lsprite;
var climberImg, climber, climbersGroup;
var invisibleBlockGroup, invisibleBlock;


function preload() {
  //carregue as imagens dos personagens aqui
  cr = loadAnimation("./imagens/vacas/v5.png", "./imagens/vacas/v6.png", "./imagens/vacas/v6.png", "./imagens/vacas/v7.png");
  imagemDeFundo = loadImage("./imagens/fazenda.webp")
  nave = loadImage("./imagens/nave.png");
  pimg = loadImage("./imagens/playy.png");
  climberImg = loadImage("./imagens/climber.png")
  light = loadImage("./imagens/fundo.png")
}

function setup() {
  createCanvas(800, 600);
  pontuacao = 0;

  cow1 = createSprite(2, 400, 50, 80);
  cow1.shapeColor = "green";
  cow1.addAnimation("d", cr);

  lsprite = createSprite(300, height);
  lsprite.addImage("lsprite", light);
  lsprite.visible = false;


  cow = createSprite(200, 200, 50, 80);
  cow.addAnimation("d", cr);
  cow.visible = false;

  nav = createSprite(width / 2, 50);
  nav.addImage(nave);
  nav.scale = 0.2;

  p = createSprite(width / 2, height / 2);
  p.addImage(pimg)
  p.scale =0.1


  p.visible = false;
  nav.visible = false;


  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
 


  if (estadoJogo === "ESPERAR") {
    cutsCene()
    cow1.x += 0.9
    drawSprites();
  }
  else if (estadoJogo === "JOGAR") {
    createCanvas(600, 600);

    lsprite.visible = true;
    lsprite.velocityY = 3;
    if (lsprite.y > 400) {
      lsprite.y = 300
    }    
 

    pontuacao = pontuacao + Math.round((frameRate()/60));

    cow.visible = true
    spawnClimbers();
    move();

    if(climbersGroup.isTouching(cow)){
      cow.velocityY = 0;
    }

    if(cow.y >= 700){
      cow.destroy();
      estadoJogo = "end"
    }
    
    drawSprites();
    textSize(25)
    fill("red")
    text("Pontuacao: "+ pontuacao, 50,50);

  }
  else if (estadoJogo === "end"){
    stroke("green");
    fill("red");
    textSize(30);
    text("Ops!!! V0cê virou hamburguer", 230,250)

  }



}


function move() {
  if (keyDown("left_arrow")) {
    cow.x = cow.x - 3;
  }

  if (keyDown("right_arrow")) {
    cow.x = cow.x + 3;
  }

  if (keyDown("space")) {
    cow.velocityY = -10;
  }

  cow.velocityY = cow.velocityY + 0.8;
}

function spawnClimbers() {
  //escreva aqui o código para gerar as portas na torre
  if (frameCount % 240 === 0) {

    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    climber.x = Math.round(random(120, 400));
    //climber.debug=true

    invisibleBlock.x = climber.x;


    climber.addImage(climberImg);


    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    cow.depth = climber.depth;
    cow.depth += 1;

    //designe tempo de vida a variável

    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;


    //adicione cada porta ao grupo

    //invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

function cutsCene() {

  image(imagemDeFundo, 0, 0, width, height);

  // Ajusta a opacidade da cor de overlay
  fill(0, 0, 0, opacidadeOverlay);
  rect(0, 0, width, height);

  // Se está anoitecendo, aumenta gradualmente a opacidade
  if (anoitecer && opacidadeOverlay < 255) {
    opacidadeOverlay += 1;
  }

  // Inicia o anoitecer quando o número de frames atinge anoitecerFrame
  if (frameCount >= anoitecerFrame) {
    anoitecer = true;
  }
  if (anoitecer == true && cow1.x > width / 2) {
    nav.visible = true;
   
    cow1.destroy()
   
  }
  if (cow1.x > width / 2 + 60) {
    p.visible = true;
    if (mousePressedOver(p)) {
      p.visible = false;
      nav.visible = false
      estadoJogo = "JOGAR";
    }

  }

}