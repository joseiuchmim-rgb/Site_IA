/* ===== CONTROLES DE ACESSIBILIDADE ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navUl.classList.toggle('open');
    });
  }

  // Dark mode
  const darkBtn = document.getElementById('darkModeBtn');
  if (darkBtn) {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    darkBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      darkBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }

  // Alto contraste
  const contrastBtn = document.getElementById('contrastBtn');
  if (contrastBtn) {
    if (localStorage.getItem('highContrast') === 'true') {
      document.body.classList.add('high-contrast');
    }
    contrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    });
  }

  // Aumentar fonte
  const fontBtn = document.getElementById('fontBtn');
  let fontLevel = parseInt(localStorage.getItem('fontLevel') || '0');
  const applyFont = () => {
    const sizes = [16, 18, 20, 22];
    document.documentElement.style.setProperty('--font-size-base', sizes[fontLevel] + 'px');
  };
  applyFont();
  if (fontBtn) {
    fontBtn.addEventListener('click', () => {
      fontLevel = (fontLevel + 1) % 4;
      localStorage.setItem('fontLevel', fontLevel);
      applyFont();
    });
  }

  // Voltar ao topo
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Carousel
  initCarousel();

  // Portal de Escuta
  initEscuta();

  // Quiz
  initQuiz();
});

/* ===== CAROUSEL ===== */
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const dots = document.querySelectorAll('.dot');
  if (!track || !dots.length) return;

  let current = 0;
  const total = dots.length;

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  setInterval(() => {
    goTo((current + 1) % total);
  }, 4500);
}

/* ===== PORTAL DE ESCUTA ===== */
function initEscuta() {
  const form = document.getElementById('formEscuta');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = document.getElementById('desabafo').value.trim();
    const nome = document.getElementById('nome').value.trim() || 'amigo(a)';
    const resposta = document.getElementById('respostaAuto');

    if (!texto) {
      alert('Por favor, escreva algo antes de enviar.');
      return;
    }

    const mensagens = [
      `Olá, ${nome}! Obrigado por compartilhar. Você é corajoso(a) por expressar seus sentimentos. Lembre-se: você não está sozinho(a). Procure um adulto de confiança – professor, pedagogo, direção ou familiar.`,
      `${nome}, sua voz importa! Foi muito importante você se expressar. Se estiver passando por uma situação difícil, converse com alguém da escola ou da sua família. Eles estão aqui para ajudar.`,
      `Querido(a) ${nome}, agradecemos sua confiança. Desabafar é um passo importante. Não guarde tudo para si – busque apoio de professores, da equipe pedagógica ou de pessoas que você confia.`,
      `${nome}, você é valioso(a)! Obrigado por escrever. Em momentos difíceis, falar com um adulto de confiança pode fazer toda a diferença. A escola está preparada para te acolher.`
    ];

    const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
    document.getElementById('msgAcolhimento').textContent = msg;
    resposta.classList.add('show');
    form.reset();
    resposta.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

/* ===== QUIZ ===== */
const quizData = [
  {
    pergunta: 'Isso é bullying?',
    situacao: 'Um grupo de colegas sempre ri e faz piadas ofensivas sobre a aparência de um estudante, na frente de todos, todos os dias.',
    opcoes: [
      'Não, é só brincadeira entre amigos.',
      'Sim, é bullying – agressão repetida que causa sofrimento.',
      'Só é bullying se houver violência física.',
      'Depende se a vítima se incomoda ou não.'
    ],
    correta: 1
  },
  {
    pergunta: 'Esta atitude demonstra respeito?',
    situacao: 'Você vê um colega sendo excluído de um trabalho em grupo só porque ele é diferente. Você decide convidá-lo para participar do seu grupo.',
    opcoes: [
      'Não, isso é intromissão.',
      'Sim, demonstra empatia e inclusão.',
      'Melhor não se envolver em assuntos dos outros.',
      'Só se o professor pedir.'
    ],
    correta: 1
  },
  {
    pergunta: 'Como agir nessa situação?',
    situacao: 'Um amigo seu está sendo ameaçado por mensagens anônimas no celular e está com medo de contar para alguém.',
    opcoes: [
      'Aconselhar a ignorar e não contar para ninguém.',
      'Incentivar a procurar um adulto de confiança e, se possível, guardar as provas.',
      'Responder as mensagens de forma agressiva.',
      'Compartilhar as mensagens com outros colegas para descobrir quem é.'
    ],
    correta: 1
  },
  {
    pergunta: 'O que caracteriza o cyberbullying?',
    situacao: 'Sobre agressões pela internet e redes sociais.',
    opcoes: [
      'É igual ao bullying tradicional, só que acontece online e pode atingir mais pessoas rapidamente.',
      'Só acontece se a pessoa for famosa.',
      'Não é tão grave quanto o bullying presencial.',
      'É crime apenas se houver ameaça de morte.'
    ],
    correta: 0
  },
  {
    pergunta: 'O que você faria nessa situação?',
    situacao: 'Você presencia um colega sendo xingado e empurrado no corredor da escola.',
    opcoes: [
      'Filmar e postar nas redes sociais.',
      'Rir junto para não ser o próximo alvo.',
      'Ajudar o colega e, se necessário, chamar um professor ou adulto.',
      'Fingir que não viu nada.'
    ],
    correta: 2
  }
];

function initQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;

  let currentQ = 0;
  let score = 0;
  let answered = false;

  const progressBar = document.getElementById('progressBar');
  const questionEl = document.getElementById('quizQuestion');
  const resultadoEl = document.getElementById('quizResultado');
  const btnNext = document.getElementById('btnNext');
  const btnRestart = document.getElementById('btnRestart');

  function renderQuestion() {
    answered = false;
    const q = quizData[currentQ];
    progressBar.style.width = ((currentQ / quizData.length) * 100) + '%';

    let html = `
      <h3>Pergunta ${currentQ + 1} de ${quizData.length}: ${q.pergunta}</h3>
      <div class="situacao">${q.situacao}</div>
      <div class="opcoes">
    `;

    const letras = ['A', 'B', 'C', 'D'];
    q.opcoes.forEach((op, i) => {
      html += `
        <div class="opcao" data-index="${i}">
          <span class="letra">${letras[i]}</span>
          <span>${op}</span>
        </div>
      `;
    });
    html += '</div>';

    questionEl.innerHTML = html;
    questionEl.classList.add('active');
    resultadoEl.classList.remove('show');
    btnNext.style.display = 'none';
    btnRestart.style.display = 'none';

    document.querySelectorAll('.opcao').forEach(op => {
      op.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const index = parseInt(op.dataset.index);
        const correta = q.correta;

        document.querySelectorAll('.opcao').forEach(o => {
          o.classList.remove('selected');
          const idx = parseInt(o.dataset.index);
          if (idx === correta) o.classList.add('correct');
          else if (idx === index && index !== correta) o.classList.add('wrong');
        });
        op.classList.add('selected');

        if (index === correta) score++;

        btnNext.style.display = 'inline-flex';
        if (currentQ === quizData.length - 1) {
          btnNext.textContent = 'Ver resultado';
        } else {
          btnNext.innerHTML = 'Próxima <i class="fas fa-arrow-right"></i>';
        }
      });
    });
  }

  function showResult() {
    questionEl.classList.remove('active');
    progressBar.style.width = '100%';
    resultadoEl.classList.add('show');
    btnNext.style.display = 'none';
    btnRestart.style.display = 'inline-flex';

    document.getElementById('scoreNum').textContent = score;
    document.getElementById('scoreTotal').textContent = quizData.length;

    let feedback = '';
    if (score === 5) {
      feedback = 'Excelente! Você demonstra grande compreensão sobre o bullying e como agir com empatia. Continue assim!';
    } else if (score >= 3) {
      feedback = 'Muito bem! Você tem um bom entendimento. Continue aprendendo e praticando o respeito no dia a dia.';
    } else {
      feedback = 'Continue estudando o tema! Conversar sobre bullying e praticar a empatia ajuda a criar um ambiente melhor para todos.';
    }
    document.getElementById('feedbackText').textContent = feedback;
  }

  btnNext.addEventListener('click', () => {
    if (currentQ < quizData.length - 1) {
      currentQ++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  btnRestart.addEventListener('click', () => {
    currentQ = 0;
    score = 0;
    renderQuestion();
  });

  renderQuestion();
}