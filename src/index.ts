/*
🧾 Versão 1 – Dashboard Financeira Simples (em TypeScript)
Objetivo: Mostrar um resumo básico com:

Total de entradas (receitas)
Total de saídas (despesas)
Saldo final
Lista de transações

////////////////////////////////////////////////////////////////]

🧠 O que implementar:
Função para calcular:
Total de entradas
Total de saídas
Saldo final
Função para listar as transações formatadas.
*/

export type Transacao = {
  id: number;
  descricao: string;
  tipo: "entrada" | "saida";
  valor: number;
  data: string;
  categoria: string;
};

export const transacoes: Transacao[] = [
  {
    id: 1,
    descricao: "Salário",
    tipo: "entrada",
    valor: 3000,
    data: "2025-05-01",
    categoria: "Trabalho",
  },
  {
    id: 2,
    descricao: "Aluguel",
    tipo: "saida",
    valor: 1200,
    data: "2025-05-03",
    categoria: "Moradia",
  },
  {
    id: 3,
    descricao: "Freelance",
    tipo: "entrada",
    valor: 800,
    data: "2025-05-05",
    categoria: "Renda Extra",
  },
  {
    id: 4,
    descricao: "Supermercado",
    tipo: "saida",
    valor: 500,
    data: "2025-05-06",
    categoria: "Alimentação",
  },
  {
    id: 5,
    tipo: "saida",
    valor: 80,
    descricao: "Uber",
    data: "06-05-2025",
    categoria: "Transporte",
  },
];

function relatorioFinanceiro(lista: Transacao[]) {
  ///entradas///
  const entradas = lista.filter((index) => index.tipo === "entrada");
  const totalEntradas = entradas.reduce((soma, total) => soma + total.valor, 0);
  entradas.map((index) => {
    return console.log(
      `Tipo:${index.tipo} | Data:[${index.data}] | ValorR$ ${index.valor}`
    );
  });

  ///saidas///
  const saidas = lista.filter((index) => index.tipo === "saida");
  const totalSaidas = saidas.reduce((soma, total) => soma + total.valor, 0);
  saidas.map((index) => {
    return console.log(
      `Tipo:${index.tipo} | Data:[${index.data}] | ValorR$ ${index.valor}`
    );
  });

  ///Resultado Final///
  const saldoFinal = totalEntradas - totalSaidas;
  return `Saldo atual: R$${saldoFinal}`;
}

console.log(relatorioFinanceiro(transacoes));

function calcularTotalPorTipo(lista: Transacao[], tipo: "entrada" | "saida") {
  return lista
    .filter((transacoes) => transacoes.tipo === tipo)
    .reduce((soma, transacoes) => soma + transacoes.valor, 0);
}

function obterMaiorGasto(lista: Transacao[], limite: number) {
  return lista
    .filter((index) => index.tipo === "saida")
    .sort((a, b) => b.valor - a.valor)
    .slice(0, limite)
    .map((gasto) => `${gasto.descricao} R$${gasto.valor.toFixed(2)}`)
    .join(" | ");
}

function resumoFinanceiroavancado(lista: Transacao[]) {
  const totalEntradas = calcularTotalPorTipo(lista, "entrada");
  const totalSaidas = calcularTotalPorTipo(lista, "saida");
  const saldoTotal = totalEntradas - totalSaidas;

  const maioresGastos = obterMaiorGasto(lista, 5);

  const saldoFormatado = saldoTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const alertaSaldo =
    saldoTotal < 0
      ? "⚠️ Atenção: seu saldo está negativo!"
      : "✅ Saldo positivo.";

  return `5 maiores gastos: ${maioresGastos} | Saldo atual: ${saldoFormatado} | ${alertaSaldo}`.trim();
}

console.log(resumoFinanceiroavancado(transacoes));

function exibirGraficos(label: string, valor: number) {
  const blocos = Math.round(valor / 250);
  const barra = "█".repeat(blocos);
  const valorFormatado = valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  console.log(`${label}: ${valorFormatado} | ${barra}`);
}

const graficoEntrada = calcularTotalPorTipo(transacoes, "entrada");
const graficoSaida = calcularTotalPorTipo(transacoes, "saida");

exibirGraficos("Entrada", graficoEntrada);
exibirGraficos("Saida", graficoSaida);

function relatorioSaidasPorCategoria(
  lista: Transacao[],
  categoria: "Moradia" | "Alimentação" | "Transporte"
) {
  const filtroCategoria = lista.filter(
    (index) => index.categoria === categoria
  );
  return filtroCategoria.reduce((prevValue, elem) => prevValue + elem.valor, 0);
}

function exibirGraficosDetalhado(label: string, valor: number) {
  const blocos = Math.round(valor / 300);
  const barra = "█".repeat(blocos);
  const valorFormatado = valor;
  console.log(`${label}: ${valorFormatado.toFixed(2)}% | ${barra}`);
}

const totalSaida = calcularTotalPorTipo(transacoes, "saida");
const moradia =
  (relatorioSaidasPorCategoria(transacoes, "Moradia") / totalSaida) * 100;
const alimentacao =
  (relatorioSaidasPorCategoria(transacoes, "Alimentação") / totalSaida) * 100;
const trasporte =
  (relatorioSaidasPorCategoria(transacoes, "Transporte") / totalSaida) * 100;

exibirGraficosDetalhado("🏠 Moradia:", moradia);
exibirGraficosDetalhado("🍔 Alimentação:", alimentacao);
exibirGraficosDetalhado("🚗 Transporte:", trasporte);
