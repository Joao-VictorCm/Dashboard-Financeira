function menu() {
  const menu = require("prompt-sync")({ sigint: true });
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
        console.log("add itens");
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
