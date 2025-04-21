const botoesModo = document.querySelectorAll('.cabecalho__botao');
const tempoDisplay = document.getElementById('tempo');
const btnIniciarPausar = document.getElementById('btn-iniciar-pausar');
const formTarefa = document.getElementById('form-tarefa');
const inputTarefa = document.getElementById('input-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');

let tempoAtual = 1500;
let intervaloId = null;
let modoAtual = 'foco';
let tempoPausado = null;

const tempos = {
    foco: 1500, 
    curto: 300, 
    longo: 900,
};

function atualizarTempo() {
    const minutos = Math.floor(tempoAtual / 60);
    const segundos = tempoAtual % 60;
    tempoDisplay.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

function iniciarOuPausar() {
    if (intervaloId) {
        clearInterval(intervaloId);
        intervaloId = null;
        btnIniciarPausar.textContent = 'Começar';
    } else {
        intervaloId = setInterval(() => {
            if (tempoAtual <= 0) {
                clearInterval(intervaloId);
                alert('Tempo finalizado!');
                return;
            }
            tempoAtual--;
            atualizarTempo();
        }, 1000);
        btnIniciarPausar.textContent = 'Pausar';
    }
}


function alternarModo(modo) {
    if (modo === modoAtual) return;

    modoAtual = modo;
    tempoPausado = tempoAtual;
    tempoAtual = tempos[modo];
    atualizarTempo();

    botoesModo.forEach(botao => botao.classList.remove('active'));
    document.querySelector(`[data-modo="${modo}"]`).classList.add('active');

    if (intervaloId) {
        clearInterval(intervaloId);
        intervaloId = null;
        btnIniciarPausar.textContent = 'Começar';
    }
}

function adicionarTarefa(event) {
    event.preventDefault();
    if (inputTarefa.value.trim() === '') return;

    const li = document.createElement('li');
    li.textContent = inputTarefa.value.trim();

    const botaoDeletar = document.createElement('button');
    botaoDeletar.textContent = '❌';
    botaoDeletar.addEventListener('click', () => li.remove());

    li.appendChild(botaoDeletar);
    listaTarefas.appendChild(li);
    inputTarefa.value = '';
}

botoesModo.forEach(botao => {
    botao.addEventListener('click', () => alternarModo(botao.dataset.modo));
});

btnIniciarPausar.addEventListener('click', iniciarOuPausar);
formTarefa.addEventListener('submit', adicionarTarefa);

atualizarTempo();