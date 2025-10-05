class Evento {
  public name: string;
  public data: Date;
  public vagas: number;
  public vagasDisponiveis: number;

  constructor(name: string, data: Date, vagas: number) {
    this.name = name;
    this.data = data;
    this.vagas = vagas;
    this.vagasDisponiveis = vagas;
  }

  reservarVaga(): boolean {
    if (this.vagasDisponiveis > 0) {
      this.vagasDisponiveis--;
      return true;
    } else {
      return false;
    }
  }
}

class GerenciadorEventos {
  public eventosCadastrados: Evento[] = [];

  cadastrarEvento(evento: Evento) {
    this.eventosCadastrados.push(evento);
  }

  listarEventos(): Evento[] {
    return this.eventosCadastrados;
  }
}


const gerenciador = new GerenciadorEventos();

// Pegar elementos do HTML
const form = document.getElementById("formEvento") as HTMLFormElement;
const tabela = document.getElementById("tabelaEventos") as HTMLTableElement;
const corpoTabela = document.getElementById("listaEventos") as HTMLTableSectionElement;

// Cadastrar evento
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataInput = (document.getElementById("data") as HTMLInputElement).value;
  const vagasInput = parseInt((document.getElementById("vagas") as HTMLInputElement).value);
  const nomeInput = (document.getElementById("nome") as HTMLInputElement).value;

  const novaData = new Date(dataInput);
  const novoEvento = new Evento(nomeInput, novaData, vagasInput);
  gerenciador.cadastrarEvento(novoEvento);

  tabela.style.display = "table"; // 👈 mostra a tabela
  atualizarTabela();
  form.reset();
});

// Atualizar tabela
function atualizarTabela() {
  corpoTabela.innerHTML = "";

  gerenciador.listarEventos().forEach((evento, index) => {
    const linha = document.createElement("tr");

    const nomeCelula = document.createElement("td");
    nomeCelula.textContent = evento.name;

    const dataCelula = document.createElement("td");
    dataCelula.textContent = evento.data.toLocaleDateString("pt-BR");

    const vagasCelula = document.createElement("td");
    vagasCelula.textContent = evento.vagas.toString();

    const vagasDispCelula = document.createElement("td");
    vagasDispCelula.textContent = evento.vagasDisponiveis.toString();

    // Coluna de ações com botão "Reservar"
    const acoesCelula = document.createElement("td");
    const botaoReservar = document.createElement("button");
    botaoReservar.textContent = "Reservar";

    if (evento.vagasDisponiveis === 0) {
      botaoReservar.disabled = true;
    }

    botaoReservar.addEventListener("click", () => {
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
