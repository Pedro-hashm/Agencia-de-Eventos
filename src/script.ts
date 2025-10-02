class Evento {
    public data: string
    public vagas: number
    public vagasDisponiveis: number

    constructor(data: string, vagas: number, vagasDisponiveis: number) {
        this.data = data
        this.vagas = vagas
        this.vagasDisponiveis = vagasDisponiveis
    }

}

class GerenciadorEventos {
    public eventosCadastrados: Evento[] = []
    
    cadastrarEvento(evento: Evento) {
        this.eventosCadastrados.push(evento)
    }

    listarEventos() {
        return this.eventosCadastrados;
    }
}

// Função pega info do form, cria um objeto evento, e chama o gerenciador global pra cadastrar. Depois chama a função de listar eventos pra mostrar
