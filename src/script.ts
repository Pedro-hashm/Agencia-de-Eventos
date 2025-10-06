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

console.log('oi');

const gerenciador = new GerenciadorEventos();

const form = document.getElementById("formEvento") as HTMLFormElement;
const tabela = document.getElementById("tabelaEventos") as HTMLTableElement;
const corpoTabela = document.getElementById("listaEventos") as HTMLTableSectionElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataInput = (document.getElementById("data") as HTMLInputElement).value;
  const vagasInput = parseInt((document.getElementById("vagas") as HTMLInputElement).value);
  const nomeInput = (document.getElementById("nome") as HTMLInputElement).value;

  const dataSelecionada = new Date(dataInput + "T00:00:00"); 
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0); 

  if (dataSelecionada < hoje) {
      alert("A data do evento não pode ser uma data passada. Por favor, escolha uma data futura.");
      return; 
  }

  const novoEvento = new Evento(nomeInput, dataSelecionada, vagasInput);
  gerenciador.cadastrarEvento(novoEvento);

  tabela.classList.add("visible"); 
  atualizarTabela();
  form.reset();
});

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

    const acoesCelula = document.createElement("td");
    const botaoReservar = document.createElement("button");
    botaoReservar.textContent = "Reservar";

    if (evento.vagasDisponiveis === 0) {
      botaoReservar.disabled = true;
      botaoReservar.textContent = "Esgotado";
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

function toggleEvent() {
  const form = document.getElementById("form") as HTMLDivElement;
  const home = document.getElementById("home") as HTMLDivElement;

  home.classList.toggle("hidden");
  form.classList.toggle("hidden");
}
