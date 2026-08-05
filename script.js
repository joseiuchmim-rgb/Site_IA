// --- 1. Acessibilidade (Modo Escuro e Tamanho da Fonte) ---
const btnContrast = document.getElementById('btn-contrast');
const btnFontInc = document.getElementById('btn-font-increase');
const btnFontDec = document.getElementById('btn-font-decrease');

btnContrast.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

let fontScale = 1;
btnFontInc.addEventListener('click', () => {
  if (fontScale < 1.3) {
    fontScale += 0.1;
    document.documentElement.style.setProperty('--font-base', `${fontScale}rem`);
  }
});

btnFontDec.addEventListener('click', () => {
  if (fontScale > 0.8) {
    fontScale -= 0.1;
    document.documentElement.style.setProperty('--font-base', `${fontScale}rem`);
  }
});

// --- 2. Portal de Escuta (Simulação) ---
const frasesAcolhedoras = [
  "Sua voz importa. Obrigado por compartilhar seus sentimentos conosco.",
  "Reconhecer o que sentimos é um ato de coragem. Você é forte!",
  "Nenhum problema precisa ser enfrentado sozinho. Há pessoas prontas para te ouvir."
];

function enviarDesabafo(event) {
  event.preventDefault();
  const texto = document.getElementById('desabafo').value;
  
  if (texto.trim() === '') return;

  const respostaBox = document.getElementById('resposta-acolhimento');
  const fraseElemento = document.getElementById('frase-motivacional');

  // Seleciona uma frase aleatória
  const fraseSorteada = frasesAcolhedoras[Math.floor(Math.random() * frasesAcolhedoras.length)];
  fraseElemento.textContent = fraseSorteada;

  // Exibe o acolhimento e limpa o campo
  respostaBox.classList.remove('hidden');
  document.getElementById('desabafo').value = '';
}

// --- 3. Quiz Interativo (5 Perguntas) ---
const perguntasQuiz = [
  {
    pergunta: "1. Apelidar um colega repetidamente com ofensas que o deixam triste é considerado:",
    opcoes: ["Apenas uma brincadeira normal", "Bullying", "Uma forma de amizade"],
    correta: 1
  },
  {
    pergunta: "2. Qual é a atitude correta ao presenciar ofensas contra um colega na internet (Cyberbullying)?",
    opcoes: ["Compartilhar para mais pessoas verem", "Ignorar e rir junto", "Não espalhar, denunciar na plataforma e apoiar a vítima"],
    correta: 2
  },
  {
    pergunta: "3. O que caracteriza uma senha segura na internet?",
    opcoes: ["Sua data de nascimento ou '123456'", "Combinação de letras maiúsculas, minúsculas, números e símbolos", "O nome do seu melhor amigo"],
    correta: 1
  },
  {
    pergunta: "4. Diante de piadas preconceituosas sobre raça, gênero ou origem, qual atitude demonstra respeito?",
    opcoes: ["Não concordar, combater o preconceito e promover a inclusão", "Rir para não ficar fora do grupo", "Apostar quem faz a pior piada"],
    correta: 0
  },
  {
    pergunta: "5. O que fazer se souber que uma amiga ou colega está sofrendo violência interpessoal ou familiar?",
    opcoes: ["Guardar segredo para não arrumar confusão", "Apoiá-la e orientar a buscar ajuda com adultos de confiança ou ligar 180/100", "Postar a situação nas redes sociais"],
    correta: 1
  }
];

function carregarQuiz() {
  const container = document.getElementById('questoes-container');
  container.innerHTML = '';

  perguntasQuiz.forEach((q, index) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'questao-item';
    
    let html = `<p><strong>${q.pergunta}</strong></p><div class="opcoes-list">`;
    q.opcoes.forEach((opcao, i) => {
      html += `
        <label>
          <input type="radio" name="questao-${index}" value="${i}">
          ${opcao}
        </label>
      `;
    });
    html += `</div>`;
    qDiv.innerHTML = html;
    container.appendChild(qDiv);
  });
}

function calcularResultadoQuiz() {
  let acertos = 0;

  perguntasQuiz.forEach((q, index) => {
    const selecionada = document.querySelector(`input[name="questao-${index}"]:checked`);
    if (selecionada && parseInt(selecionada.value) === q.correta) {
      acertos++;
    }
  });

  const resultadoBox = document.getElementById('resultado-quiz');
  resultadoBox.classList.remove('hidden');
  resultadoBox.innerHTML = `
    <h3>Resultado do Quiz</h3>
    <p>Você acertou <strong>${acertos}</strong> de <strong>${perguntasQuiz.length}</strong> perguntas.</p>
    <p>${acertos === 5 ? "Excelente! Você demonstra grande empatia e conscientização cidadã!" : "Bom trabalho! Continue se informando sobre o respeito e apoio mútuo."}</p>
  `;
}

// --- 4. Botão Voltar ao Topo ---
function voltarAoTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializa o quiz na carga da página
document.addEventListener('DOMContentLoaded', carregarQuiz);