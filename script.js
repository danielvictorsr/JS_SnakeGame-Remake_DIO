let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");              //context - renderiza o desenho que irá ocorrer dentro do Canvas (Tela)


var imgBG = new Image();
var imgFruit = new Image();
var imgSHead = new Image();
var imgSBody = new Image();

let box = 32;                                       //box - 32 pixels cada quadrado do jogo
let snake = [];
snake[0] = {                                        //8 - no meio do canvas | Mudado para 7 (posição inicial da cobrinha)
    x: 7 * box,
    y: 7 * box
}
let direction = "rigth";                            //direção da cobrinha | poderia ser atribuido qualquer outro valor de direção

//Math.floor - retira a parte flutuante do random (0. é removido)
//Math.random - retorna um número aleatório de 0 até 1
//setou até 16 e o tamanho do cavas para não ultrapassar e aparecer fora
/*
 let food = {
     x: Math.floor(Math.random() * 15 + 1) * box,
     y: Math.floor(Math.random() * 15 + 1) * box
 }
*/

let apple = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
//------------{{{ajuste da animação da cobrinha}}}------------

//capturar posição da cabeça ao mudar de posição
let posXY = {
    x:0,
    y:0
}

//------------------------------------------------------------
 //criarBG - inicia o canvas e define a cor
function criarBG() {                               
    context.fillStyle = "#dddddd";                  //fillStyle - trabalha com o estilo do contexto
    context.fillRect (0, 0, 16 * box, 16 * box);    //fillRect - desenhar o retângulo do jogo | (pos x, pos y, altura, largura)
    imgBG.src="img/snake-cartoon.png";                //caminho da imagem a ser background do canvas
    context.drawImage(imgBG, 0, 0, 20 * box, 20 * box);                   //drawImage - desenha a imagem (imagem, pos x, pos y)
}


//cobrinha array de coordenadas - adiciona um elemento e remove o último (andar da snake)
//Pintar o corpo da cobra de verde e setar o tamanho da cobrinha
function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";                               //cor da cobrinha
        // context.fillRect (snake[i].x, snake[i].y, box, box);    //tamanho da cobrinha (pos x, pos y, altura, largura)
        switch(direction) {
            case "left":
                imgSHead.src = "img/snakeHeadLeft.png";
                break;
            case "up":
                imgSHead.src = "img/snakeHeadUp.png";
                break;
            case "right":
                imgSHead.src = "img/snakeHeadRight.png";
                break;
            case "down":
                imgSHead.src = "img/snakeHeadDown.png";
                break;
        }
        // imgSHead.src="img/snakeHeadLeft.png";
        // context.drawImage(imgSHead, snake[i].x, snake[i].y, box, box);
        context.drawImage(imgSHead, snake[0].x, snake[0].y, box, box);
        if(i >= 1) {
            switch(direction) {
                case "up":
                case "down":
                    //------------{{{ajuste da animação da cobrinha}}}------------
                   
                    // if(snake.x === apple.x && snake.y === apple.y){
                    // imgSBody.src="img/snakeBodyUD.png";}

                    //------------------------------------------------------------
                    break;
                case "right":
                case "left":
                    imgSBody.src="img/snakeBodyRL.png";
                    break;
            }
            //------------{{{ajuste da animação da cobrinha}}}------------

            // console.log("S:",snake[0]); //posição da cabeça ao desenhar o corpo
            
            //------------------------------------------------------------
            context.drawImage(imgSBody, snake[i].x, snake[i].y, box, box);
        }
    }
}

document.addEventListener("keydown", update);                   //ficar escutando o jogo, e ao clicar chamrá a função update
                                                                //keydown - evento de precionar as teclas

//Desenha a comida                                                            
function drawFood() {
    /* (base)
    //context.fillStyle = "red";                                  //cor da comida
    //context.fillRect (food.x, food.y, box, box);                //posição e tamanho (pos x, pos y, tamanho x, tamanho y)
    */
    imgFruit.src="img/apple-cartoon.png";
    // context.drawImage(imgFruit, 0, 0, 32, 32);                    //drawimage (imagem, pos x, pos y, altura, largura)
    context.drawImage(imgFruit, apple.x, apple.y, box, box);

    //adicional - parte da imgem ().drawImage(img, srcX, srcY, srcWidth, srcHeight,dstX, dstY, dstWidth, dstHeight);

}

function update (event) {
    //código 37 - direita
    //código 38 - baixo
    //código 39 - esquerda
    //código 40 - cima

    //se o código for direita(37) e a direção não for direita muda para esquerda
    if (event.keyCode == 37 && direction != "right") direction = "left";  //direção não pode ser a oposta pois a cobrinha só tem uma cabeça e assim
    // if (event.keyCode == 37) posXY = snake;
    if (event.keyCode == 38 && direction != "down") direction = "up";     //criaria duas cabeças bugando o jogo
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
}

/*
Implementações de funções início
*/

function loadPage() {
    alert ("Bem Vindo ao Snake Game (Remake)");
}

/*
Implementações de funções fim
*/

function iniciarJogo() {

    //plano carteziano 0x e 0y | vai a 16 de um lado e zero do outro  - ao passar some do canvas, mas se fizer a volta ela volta(cobrinha)
    //cobrinha irá sair de um lado e voltar do outro, cobrinha == 16 cobrinnha = 0 ...
    //Modifiquei de > para >= e de < para <= devido a cobrinha conseguir fazer uma curva fora do canvas, ou seja ficar andando uma linha
    //após o canvas nas bordas - Arrumar isto futuramente sem criar limite de borda fixo (perdendo o jogo ao encostar na parede)
    if(snake[0].x >= 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x <= 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y >= 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y <= 0 && direction == "up") snake[0].y = 16 * box;
    

    //verificar se corpo da cobrinha se choca com o próprio
    for (i = 1; i < snake.length; i++) {                                //a partir de 1 pois é a partir da cabeça/corpo da cobrinha
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {     //se houver a colisão no corpo da cobrinha
            clearInterval(jogo);                                        //para a função jogo
            alert("Game Over :(");                                      //aviso na tela de fim de jogo
        }
    }
 
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /*(base)
    //movimentos da cobrinha
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "down") snakeY += box;
    if (direction == "up") snakeY -= box;
    */

    //movimentos da cobrinha
    if (direction == "right") snakeX += box;

    //------------{{{ajuste da animação da cobrinha}}}------------

    //if (direction == "right") posXY.x = snakeX; //só interessa a última posição que é quando aperta para outra direção
    //console.log("direita", posXY.x);

    //------------------------------------------------------------
    if (direction == "left") snakeX -= box;
    if (direction == "down") snakeY += box;
    if (direction == "up") snakeY -= box;


    /* (base)
    if (snakeX != food.x || snakeY != food.y) { //continua removendo se as coordenadas da cobrinha não forem iguais a de food
        snake.pop();
    }
    else { //food recebe posição aleatória
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;           
    }
    
    //cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    */

    if (snakeX != apple.x || snakeY != apple.y) { //continua removendo se as coordenadas da cobrinha não forem iguais a de apple
    snake.pop();
    }
    else { //food recebe posição aleatória
        apple.x = Math.floor(Math.random() * 15 + 1) * box;
        apple.y = Math.floor(Math.random() * 15 + 1) * box;           
    }

    //cabeça da cobrinha
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 230);                       //intervalo de 100ms - a cada 100ms o iniciar do jogo será chamado (Loop do Jogo)
                                                                //alterar a velocidade do jogo (basta aumentar o valor em ms para ficar mais lento)
                                                                //alterado de 100 para 230ms


//{{{IMPLEMENTACOES}}}
//Objetivo: alterar o título do jogo                                                    ./
//Objetivo: alterar o background do canvas                                              ./
//Objetivo: alterar o background do html                                                ./
//Objetivo: colocar borda no canvas                                                     ./
//Objetivo: cabeça da cobrinha se distinguir do restante do corpo                       ./
//Objetivo: melhorar a animação da cabeça da cobrinha                                   ./
//Objetivo: trocar imagem do corpo da cobrinha                                          ./
//GitInit
//Commit: "Alterado canvas, background e ajuste de velocidade inicial"
//Objetivo: melhorar animação do corpo da cobrinha
//Commit: "Melhorado a animação do corpo da cobrinha"
//Objetivo: criar placar
//Commit: "Criado placar"
//Objetivo: criar menu
//Commit: "Criado menu"
//Objetivo: criar ranking (Top5 - Pontuações)
//Commit: "Criado ranking (Top5 - Pontuacoes)"
//Objetivo: organização do código (comentários (códigos base - remover))
//Commit: "Organizacao do codigo"
//Commit: "Editar Readme" (Editar em ferramenta online "https://pandao.github.io/editor.md/en.html" e após copiar para Readme)
//Repositório no Github do editor online "https://github.com/pandao/pandao.github.io"