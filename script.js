const context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 800;
context.canvas.width = 1220;

let frameCount = 1;
let obCount = frameCount;
const obXCoors = [];

const backgroundImage = new Image();
backgroundImage.src = "ibagens/background.jpg";

const Sprit = {
  height: 64,
  pularSprit: false,
  xSprit: 0,
  xVelocidadeSprit: 0.6,
  ySprit: 0,


}

const quadrado = {
  height: 32,
  pular: true,
  width: 32,
  x: 0,
  xVelocidade: 0,
  y: 0,
  yVelocidade: 0,
  imagem: new Image()
};

// Carregue a imagem do quadrado
quadrado.imagem.src = "ibagens/creeper.png";

const plataformas = [
  { x: 200, y: 300, width: 150, height: 20 },
  { x: 500, y: 250, width: 150, height: 20 },
  { x: 800, y: 200, width: 150, height: 20 }
  // Adicione mais plataformas conforme necessário
];

function verificarColisao(quadrado, objeto) {
  return (
    quadrado.x < objeto.x + objeto.width &&
    quadrado.x + quadrado.width > objeto.x &&
    quadrado.y < objeto.y + objeto.height &&
    quadrado.y + quadrado.height > objeto.y
  );
}

const nextFrame = () => {
  frameCount++;

  for (let i = 0; i < obCount; i++) {
    obXCoor = Math.floor(Math.random() * (1165 - 140 + 1) + 140);
    obXCoors.push(obXCoor);
  }
};

const controles = {
  esquerda: false,
  direita: false,
  cima: false,
  keyListener: function(event) {
    var estado_chave = event.type === "keydown" ? true : false;
    switch (event.keyCode) {
      case 37:
        controles.esquerda = estado_chave;
        break;
      case 38:
        controles.cima = estado_chave;
        break;
      case 39:
        controles.direita = estado_chave;
        break;
    }
  }
};

const loop = function() {
  if (controles.cima && quadrado.pular === false) {
    quadrado.yVelocidade -= 25;
    quadrado.pular = true;
  }

  if (controles.esquerda) {
    quadrado.xVelocidade -= 0.4;
  }

  if (controles.direita) {
    quadrado.xVelocidade += 0.4;
  }

  quadrado.yVelocidade += 1.0;
  quadrado.x += quadrado.xVelocidade;
  quadrado.y += quadrado.yVelocidade;
  quadrado.xVelocidade *= 0.8;
  quadrado.yVelocidade *= 0.8;

  if (quadrado.y > 386 - 16 - 32) {
    quadrado.pular = false;
    quadrado.y = 386 - 16 - 32;
    quadrado.yVelocidade = 0;
  }

  if (quadrado.x < -20) {
    quadrado.x = 1220;
  } else if (quadrado.x > 1220) {
    quadrado.x = -20;
    nextFrame();
  }

  context.drawImage(backgroundImage, 0, 0, 1220, 550);

  context.fillStyle = "#773dab";
  context.beginPath();
  context.rect(quadrado.x, quadrado.y, quadrado.width, quadrado.height);
  context.fill();

  const height = 200 * Math.cos(Math.PI / 6);

  context.fillStyle = "#3d71ab";
  obXCoors.forEach(obXCoor => {
    context.beginPath();
    context.moveTo(obXCoor, 385);
    context.lineTo(obXCoor + 20, 385);
    context.lineTo(obXCoor + 10, 510 - height);
    context.closePath();
    context.fill();

    // Verificar colisão com o quadrado
    if (obXCoor < quadrado.x + quadrado.width && obXCoor + 20 > quadrado.x && 385 < quadrado.y + quadrado.height) {
        console.log("Colisão com objeto detectada!");

      console.log("Colisão detectada!");
    }
  });

  // Desenhe as plataformas
  context.fillStyle = "#ab773d";
  plataformas.forEach(plataforma => {
    context.fillRect(plataforma.x, plataforma.y, plataforma.width, plataforma.height);
  });

  // Colisão com as plataformas
  for (const plataforma of plataformas) {
    if (verificarColisao(quadrado, plataforma) && quadrado.yVelocidade >= 0) {
      quadrado.yVelocidade = 0;
      quadrado.pular = false;
      quadrado.y = plataforma.y - quadrado.height;
    }
  }

  // Cria o "chão" para cada quadro
  context.strokeStyle = "#15fd04";
  context.lineWidth = 30;
  context.beginPath();
  context.moveTo(0, 385);
  context.lineTo(1220, 385);
  context.stroke();

  // Chama a próxima atualização quando o navegador estiver pronto para desenhar novamente
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controles.keyListener);
window.addEventListener("keyup", controles.keyListener);
window.requestAnimationFrame(loop);
