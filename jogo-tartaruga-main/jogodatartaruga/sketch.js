var path, boy;
var pathImg, boyImg;
var score = 0;
var alfacezin;
var alfacezinImg;
var alfaces;
var parabuais;
var parabuaisImg;

//Estados do Jogo
var VENCEU = 2;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
    pathImg = loadImage("pista.jpg");
    caminhao1Img = loadImage("caminhao1.png");
    caminhao2Img = loadImage("caminhao2.png");
    car1Img = loadImage("car1.png");
    car2Img = loadImage("car2.png");
    endImg = loadAnimation("fimdeJogo.png");
    turtle_running = loadAnimation(
        "tartaruga1.png",
        "tartaruga2.png",
        "tartaruga3.png"
    
    
        );
    alfacezinImg = loadImage("alfacee.png");
    parabuaisImg = loadImage("parabuais.png");
}

    




function setup() {
    createCanvas(windowWidth, windowHeight);
    // Fundo se movendo
    parabuais = createSprite(width / 2, height / 2);
    parabuais.addImage(parabuaisImg);
    parabuais.scale = 0.8;
    
    
    path = createSprite(width / 2, 200);
    path.addImage(pathImg);
    path.velocityY = 8;

    path2 = createSprite(300, 200);
    path2.addImage(pathImg);
    path2.velocityY = 8;

    path3 = createSprite(width - 300, 200);
    path3.addImage(pathImg);
    path3.velocityY = 8;
    //criando menino correndo
    turtle = createSprite(width / 2, height - 20, 20, 20);
    turtle.addAnimation("running", turtle_running);
    turtle.scale = 3;

    fimdejogo = createSprite(width / 2, height / 2);
    fimdejogo.addAnimation("SahilRunning", endImg);
    fimdejogo.scale = 0.8;
    
    parabuais = createSprite(width / 2, height / 2);
    parabuais.addImage(parabuaisImg);
    parabuais.scale = 0.8;
    parabuais.visible=false



    caminhoes1G = new Group();
    caminhoes2G = new Group();
    carros1G = new Group();
    carros2G = new Group();
    alfaces = new Group();
}

function draw() {

    
    if (gameState === PLAY) {
        background(0);
        turtle.x = World.mouseX;
        fimdejogo.visible = false;
        edges = createEdgeSprites();
        turtle.collide(edges);

        if(score>=10){
           gameState=VENCEU
        }


        //código para redefinir o fundo
        if (path.y > height) {
            path.y = height / 2;
        }
        if (path2.y > height) {
            path2.y = height / 2;
        }
        if (path3.y > height) {
            path3.y = height / 2;
        }
        createCaminhao1();
        createCaminhao2();
        createcar1();
        createcar2();
        createalfaceeee();
        if (caminhoes1G.isTouching(turtle)) {
            caminhoes1G.destroyEach();
            gameState = END;
            turtle.x = width / 2;
            turtle.y = height / 2 + 100;
            fimdejogo.visible = true;
        } 
         else if(alfaces.isTouching(turtle)){
            alfaces.destroyEach();
            score=score+1;


        }
        else if (caminhoes2G.isTouching(turtle)) {
            caminhoes2G.destroyEach();
            gameState = END;
            turtle.x = width / 2;
            turtle.y = height / 2 + 100;
            fimdejogo.visible = true;
        } else if (carros1G.isTouching(turtle)) {
            carros1G.destroyEach();
            gameState = END;
            turtle.x = width / 2;
            turtle.y = height / 2 + 100;
            fimdejogo.visible = true;
        } else {
            if (carros2G.isTouching(turtle)) {
                gameState = END;
                turtle.x = width / 2;
                turtle.y = height / 2 + 100;
                fimdejogo.visible = true;
                caminhoes1G.destroyEach();
                caminhoes2G.destroyEach();
                carros1G.destroyEach();
                carros2G.destroyEach();

                caminhoes1G.setVelocityYEach(0);
                caminhoes2G.setVelocityYEach(0);
                carros1G.setVelocityYEach(0);
                carros2G.setVelocityYEach(0);
            }
        }

         if(gameState===VENCEU){
            parabuais.visible=true
            caminhoes1G.destroyEach();
                    caminhoes2G.destroyEach();
                    carros1G.destroyEach();
                    carros2G.destroyEach();
                    createalfaceeee()
                    turtle.x = World.mouseX;
                }
        

        drawSprites();
        textSize(20);
        fill(255);
        text("Pontuação: " + score, width - 150, 30);
   
    }
}

function createCaminhao1() {
    if (World.frameCount % 300 == 0) {
        var caminhao1 = createSprite(Math.round(random(200, 1900), 40, 10, 10));
        caminhao1.addImage(caminhao1Img);
        caminhao1.scale = 0.9;
        caminhao1.velocityY = 30;
        caminhao1.lifetime = 350;
        caminhoes1G.add(caminhao1);
    }
}

function createCaminhao2() {
    if (World.frameCount % 225 == 0) {
        var caminhao2 = createSprite(Math.round(random(200, 1900), 40, 10, 10));
        caminhao2.addImage(caminhao2Img);
        caminhao2.scale = 0.9;
        caminhao2.velocityY = 30;
        caminhao2.lifetime = 350;
        caminhoes2G.add(caminhao2);
    }
}

function createcar1() {
    if (World.frameCount % 350 == 0) {
        var carro1 = createSprite(Math.round(random(200, 1900), 40, 10, 10));
        carro1.addImage(car1Img);
        carro1.scale = 1;
        carro1.velocityY = 30;
        carro1.lifetime = 350;
        carros1G.add(carro1);
    }
}

function createcar2() {
    if (World.frameCount % 270 == 0) {
        var carro2 = createSprite(Math.round(random(200, 1900), 40, 10, 10));
        carro2.addImage(car2Img);
        carro2.scale = 1;
        carro2.velocityY = 30;
        carro2.lifetime = 350;
        carros2G.add(carro2);
    }
}
function createalfaceeee() {
    if (World.frameCount % 120 == 0) {
        var alfacezin = createSprite(Math.round(random(200, 1900), 40, 10, 10));
        alfacezin.addImage(alfacezinImg);
        alfacezin.scale = 0.4;
        alfacezin.velocityY = 20;
        alfacezin.lifetime = 350;
        alfaces.add(alfacezin);
    }
}







