import { transacoes } from ".";
import { Transacao } from ".";

function menu() {
  const menu = require("prompt-sync")({ sigint: true });
  const addDados = require("prompt-sync")({ sigint: true });
  const pesquisarID = require("prompt-sync")({ sigint: true });
  const idParaAtualizar = require("prompt-sync")({ sigint: true });
  const prompt = require("prompt-sync")({ sigint: true });

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

  function transacaoID(id: number) {
    const transacao = transacoes.find((item) => item.id === id);
    if (!transacao) {
      console.log("Erro ao pesuqisar esta transação");
    } else {
      console.log(
        `ID: ${transacao.id} | Categoria: ${
          transacao.categoria
        } | Valor: ${transacao.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })} | Tipo: ${transacao.tipo} | Data: ${transacao.data} | Descrição: ${
          transacao.descricao
        }`
      );
    }
  }

  function atualizarTransacao(id: number) {
    const transacao = transacoes.find((index) => index.id === id);
    if (!transacao) {
      console.log(`Essa transação não existe`);
      return;
    }
    console.log("Atulizando a transação");
    const novaDescricao = prompt(
      `Nova descrição (atual: ${transacao.descricao}): `
    );

    const novoValor = prompt(`Novo valor (atual: R$ ${transacao.valor}): `);
    const novoTipo = prompt(`Novo tipo (atual: ${transacao.tipo}): `);
    const novaData = prompt(`Nova data (atual: ${transacao.data}): `);
    const novaCategoria = prompt(
      `Nova categoria (atual: ${transacao.categoria}): `
    );

    //Atualizando dados

    if (novoTipo === "entrada" || novoTipo === "saida") {
      transacao.tipo = novoTipo;
    }

    transacao.categoria = novaCategoria || transacao.categoria;
    transacao.valor = novoValor
      ? Number(novoValor)
      : transacao.valor || transacao.valor;
    transacao.data = novaData || transacao.data;
    transacao.descricao = novaDescricao || transacao.descricao;
  }
  let opcao;
  opcao = menu(`
    1 - Adicionar transação
    2 - Remover transação
    3 - Listar por ID
    4 - Listar transações
    5 - Atuallizar transação
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
        let itemId;
        itemId = pesquisarID(` ID da transação `);
        const idPesquisado = Number(itemId);
        transacaoID(idPesquisado);
        break;
      case "4":
        listarTransacao(transacoes);
        break;
      case "5":
        let atualizacao;
        atualizacao = idParaAtualizar(` ID para da trasação a ser atualizada `);
        const idAtualizado = Number(atualizacao);
        atualizarTransacao(idAtualizado);
        break;
    }
    opcao = menu(`
        1 - Adicionar transação
        2 - Remover transação
        3 - Listar por ID
        5 - Atuallizar transação
        6 - Sair
        `);
  }
}

menu();
