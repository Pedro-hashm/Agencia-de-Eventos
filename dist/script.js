var Evento = /** @class */ (function () {
    function Evento(name, data, vagas) {
        this.name = name;
        this.data = data;
        this.vagas = vagas;
        this.vagasDisponiveis = vagas;
    }
    Evento.prototype.reservarVaga = function () {
        if (this.vagasDisponiveis > 0) {
            this.vagasDisponiveis--;
            return true;
        }
        else {
            return false;
        }
    };
    return Evento;
}());
var GerenciadorEventos = /** @class */ (function () {
    function GerenciadorEventos() {
        this.eventosCadastrados = [];
    }
    GerenciadorEventos.prototype.cadastrarEvento = function (evento) {
        this.eventosCadastrados.push(evento);
    };
    GerenciadorEventos.prototype.listarEventos = function () {
        return this.eventosCadastrados;
    };
    return GerenciadorEventos;
}());
console.log('oi');
var gerenciador = new GerenciadorEventos();
var form = document.getElementById("formEvento");
var tabela = document.getElementById("tabelaEventos");
var corpoTabela = document.getElementById("listaEventos");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var dataInput = document.getElementById("data").value;
    var vagasInput = parseInt(document.getElementById("vagas").value);
    var nomeInput = document.getElementById("nome").value;
    var dataSelecionada = new Date(dataInput + "T00:00:00"); 
    var hoje = new Date();
    hoje.setHours(0, 0, 0, 0); 
    if (dataSelecionada < hoje) {
        alert("A data do evento não pode ser uma data passada. Por favor, escolha uma data futura.");
        return; 
    }
    var novoEvento = new Evento(nomeInput, dataSelecionada, vagasInput);
    gerenciador.cadastrarEvento(novoEvento);
    tabela.classList.add("visible"); 
    atualizarTabela();
    form.reset();
});
function atualizarTabela() {
    corpoTabela.innerHTML = "";
    gerenciador.listarEventos().forEach(function (evento, index) {
        var linha = document.createElement("tr");
        var nomeCelula = document.createElement("td");
        nomeCelula.textContent = evento.name;
        var dataCelula = document.createElement("td");
        dataCelula.textContent = evento.data.toLocaleDateString("pt-BR");
        var vagasCelula = document.createElement("td");
        vagasCelula.textContent = evento.vagas.toString();
        var vagasDispCelula = document.createElement("td");
        vagasDispCelula.textContent = evento.vagasDisponiveis.toString();
        var acoesCelula = document.createElement("td");
        var botaoReservar = document.createElement("button");
        botaoReservar.textContent = "Reservar";
        if (evento.vagasDisponiveis === 0) {
            botaoReservar.disabled = true;
            botaoReservar.textContent = "Esgotado";
        }
        botaoReservar.addEventListener("click", function () {
            evento.reservarVaga();
            atualizarTabela();
        });
        acoesCelula.appendChild(botaoReservar);
        linha.appendChild(nomeCelula);
        linha.appendChild(dataCelula);
        linha.appendChild(vagasCelula);
        linha.appendChild(vagasDispCelula);
        linha.appendChild(acoesCelula);
        corpoTabela.appendChild(linha);
    });
}
function toggleEvent() {
    var form = document.getElementById("form");
    var home = document.getElementById("home");
    home.classList.toggle("hidden");
    form.classList.toggle("hidden");
}
