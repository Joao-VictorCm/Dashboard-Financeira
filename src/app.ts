import { transacoes } from ".";

function menu() {
  const menu = require("prompt-sync")({ sigint: true });
  const addDados = require("prompt-sync")({ sigint: true });

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
        let id = transacoes.length;
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
        const newItem = {
          id,
          descricao,
          valor: valorNumber,
          tipo,
          data,
          categoria,
        };

        transacoes.push(newItem);
        break;

      default:
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
