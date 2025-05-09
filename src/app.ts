import { transacoes } from ".";
import { Transacao } from ".";

function menu() {
  const menu = require("prompt-sync")({ sigint: true });
  const addDados = require("prompt-sync")({ sigint: true });

  function coletarDados() {
    let id = transacoes.length + 1;
    let descricao;
    descricao = addDados(` Descrição `);
    let valor;
    valor = addDados(` Valor R$ `);
    let tipo;
    tipo = addDados(` entrada | saida `);
    let data;
    data = addDados(` Data `);
    let categoria;
    categoria = addDados(` Moradia | Alimentação | Transporte `);
    const valorNumber = Number(valor);

    return {
      id,
      descricao,
      valor: valorNumber,
      tipo,
      data,
      categoria,
    };
  }

  function listarTransacao(lista: Transacao[]) {
    return lista.map((index) => {
      return console.log(
        `ID:${index.id} | Categoria:${
          index.categoria
        } | Valor:${index.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })} | Tipo:${index.tipo} | Data:${index.data} | Descrição: ${
          index.descricao
        }`
      );
    });
  }

  function deleteTransacao(id: number) {
    const existe = transacoes.find((item) => item.id === id);
    if (!existe) {
      console.log("Erro ao deletear esta transação");
    }

    const index = transacoes.findIndex((item) => item.id === id);
    if (index !== -1) {
      transacoes.splice(index, 1);
      console.log("Transação removida com sucesso!");
    }
  }

  let opcao;
  opcao = menu(`
    1 - Adicionar transação
    2 - Remover transação
    3 -ar transação
    4 - Listar transações
    5 - Ver relatórios
    6 - Sair
    `);

  while (opcao !== "6") {
    const result = opcao;
    switch (result) {
      case "1":
        const novaTransacao = coletarDados();
        transacoes.push(novaTransacao);
        break;
      case "2":
        let id;
        id = addDados(` ID da transação a ser deleteda `);
        const idNumber = Number(id);
        deleteTransacao(idNumber);

        break;
      case "3":
        break;
      case "4":
        listarTransacao(transacoes);
        break;
    }
    opcao = menu(`
        1 - Adicionar transação
        2 - Remover transação
        3 -ar transação
        4 - Listar transações
        5 - Ver relatórios
        6 - Sair
        `);
  }
}

menu();
