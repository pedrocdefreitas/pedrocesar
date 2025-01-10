let SaldoInicial = atualizaSaldo();

function atualizaSaldo() {
  let valores = [];
  let historicoDeDepositos =
    JSON.parse(localStorage.getItem("historicoDeposito")) || [];

  let displaySaldo = document.querySelector('[data-perfil="saldo-user"]');

  historicoDeDepositos.forEach((depositos) => {
    valores.push(depositos.valorDepositado);
  });

  let somaSaldo = valores.reduce(function (acumulador, valorAtual) {
    return acumulador + valorAtual;
  }, 0);

  displaySaldo.innerHTML = "R$ " + somaSaldo.toFixed(2);

  return somaSaldo;
}

function totalOperacaoDebitos() {  
  let saquesRealizados = JSON.parse(localStorage.getItem('historicoSaque'))
  let pixRealizados = JSON.parse(localStorage.getItem('historicoPix'))
  let pagamentosRealizados = JSON.parse(localStorage.getItem('historicoPagamento'))

  let somaSaque = 0
  let somaPix = 0
  let somaPagamentos = 0

  saquesRealizados.forEach( (saques)=> {
    somaSaque += parseFloat(saques.valorSolicitado)
  })

  pixRealizados.forEach( pixs => {
    somaPix += parseFloat(pixs.valor)
  })

  pagamentosRealizados.forEach( pagamentos => {
    somaPagamentos += parseFloat( pagamentos.valorDoBoleto )
    
  })

  return{
    'totalPixRealizado': somaPix.toFixed(2),
    'totalSaquesRealizado': somaSaque.toFixed(2),
    'totalPagamentos': somaPagamentos.toFixed(2)
  }
  
}

console.log(totalOperacaoDebitos())

function exibeCard() {

  let card = document.querySelector(".card-container");

  card.addEventListener("click", function () {

    card.classList.toggle('show')
    
    // if( card.classList.contains('hiden')){
    //   card.classList.remove('hiden')
    //   card.classList.add('show')
    // }else{
    //   card.classList.remove('show')
    //   card.classList.add('hiden')
    // }
  }

)}

let geraExtrato = function (tipoDeOperacao, valorOperacao) {
  let operacao = {
    data: new Date(),
    descricao: tipoDeOperacao,
    valor: valorOperacao,
  };

  let historicoExtrato =
    JSON.parse(localStorage.getItem("historicoExtrato")) || [];
  historicoExtrato.push(operacao);
  localStorage.setItem("historicoExtrato", JSON.stringify(historicoExtrato));

  console.log("Extrato gerado");
};

let extratoNaTela = function () {
  let i;
  let movimentacoes = JSON.parse(localStorage.getItem("historicoExtrato"));
  let tbody = document.querySelector("#tbody");

  for (i = 0; i < movimentacoes.length; i++) {
    let th = document.createElement("th");
    let td = document.createElement("td");
    let tr = document.createElement("tr");

    tr.append(th);

    th.setAttribute("scope", "row");

    tr.innerHTML += `
      <td>${movimentacoes[i].data}</td>
      <td>${movimentacoes[i].descricao}</td>
      <td>${movimentacoes[i].valor}</td>
      `;

    tbody.append(tr);
  }
};

let capturaLinksMenuPrincipal = function () {
  //Função adicionando evento de click nos botões e retornando o link para suas respectivas.
  let itensDoMenu = document.querySelectorAll("[data-menu-main]");

  let menu = {
    saque: {
      idName: "saque",
      linkMenu: "./assets/src/views/Sacar.html",
    },

    deposito: {
      idName: "deposito",
      linkMenu: "./assets/src/views/Depositar.html",
    },

    pix: {
      idName: "pix",
      linkMenu: "./assets/src/views/Pix.html",
    },

    pagar: {
      idName: "pagar",
      linkMenu: "./assets/src/views/Pagamentos.html",
    },

    extrato: {
      idName: "extrato",
      linkMenu: "./assets/src/views/Extrato.html",
    },

    mais: {
      idName: "mais",
      linkMenu: "*",
    },
  };

  itensDoMenu.forEach((res) => {
    res.addEventListener("click", (el) => {
      const attr = el.target.attributes[0].value;

      let resultado = Object.values(menu).forEach((obj) => {
        if (obj.idName === attr) {
          let link = obj.linkMenu;
          let idName = obj.idName;
          htmlRequest(link, idName);
        }
      });
    });
  });
};

let htmlRequest = function (linkPaginaMenu, idName) {
  //funcão para fazer a requisição das paginas dos links do menu.
  let containerMenu = document.querySelector("#container-para-mostrar-menu");
  let http = new XMLHttpRequest();

  http.open("GET", linkPaginaMenu, true);
  http.responseType = "text";

  http.onload = function () {
    if (http.status == 200 || http.status == 304) {
      containerMenu.innerHTML = http.responseText;

      if (idName === "saque") funcaoSaque();
      if (idName === "deposito") funcaoDeposito();
      if (idName === "pix") funcaoPix();
      if (idName === "pagar") funcaoPagamento();
      if (idName === "extrato") extratoNaTela();
      //É necessário esse tempo para que o elemento surga na tela, para então ocorrer a animação de descer.
      setTimeout(function () {
        containerMenu.style.marginTop = "0px";
      }, 100);

      // acaoDoBotaoDesistir(containerMenu)
    }
  };

  http.send();
};

let acaoDoBotaoDesistir = function (containerMenu) {
  //Função para o botão de desistir ( está funcionando em todas as Views... )
  // let botaoDesistir = document.querySelector('.btn-de-desistir-tela-um')
  // botaoDesistir.addEventListener('click', function(){
  //   console.log('desisti')
  //   //É necessário esse tempo para que o elemento surga na tela, para então ocorrer a animação de subir.
  //   setTimeout( function () {
  //     containerMenu.style.top = '-100vh'
  //   }, 100)
  // })
};

let saudacaoInicial = function () {
  let textoDataPorExtenso = document.querySelector(
    '[data-perfil="data-sistema"]'
  );
  let now = new Date();
  let dayName = new Array(
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  );
  let monName = new Array(
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "agosto",
    "outubro",
    "novembro",
    "dezembro"
  );
  textoDataPorExtenso.textContent =
    "" +
    dayName[now.getDay()] +
    ", " +
    now.getDate() +
    " de " +
    monName[now.getMonth()] +
    " de " +
    now.getFullYear() +
    ".";
};

let funcaoSaque = function () {
  console.log("Abriu janela de saque...");

  let inputSaque = document.querySelector(
    '[data-modal-sacar="valor-a-enviar"]'
  );
  let btnDeConfirmarSaque = document.querySelector(
    '[data-modal-sacar="btn-de-confirmar"]'
  );

  btnDeConfirmarSaque.addEventListener("click", function () {
    let valorDigitado = inputSaque.value;

    if (isNaN(valorDigitado)) {
      throw new Error("Digite o valor corretamente.");
    }

    if (SaldoInicial < valorDigitado) {
      throw new Error("Saldo insuficiente.." + SaldoInicial);
    }

    console.log(valorDigitado);

    let dadosDoSaque = {
      idClinte: "123456",
      tipo: "saque",
      modo: "débito",
      taxAdm: "",
      saldoAnterior: "saldoAnterior",
      valorSolicitado: valorDigitado,
      dataOperacao: new Date(),
      descricao: "Saque efetuado ATM",
      saldoAtualizado: "saldofinal",
    };

    let confirmaSaque_is = confirm("Deseja confirmar o saque ?");

    if (confirmaSaque_is == true) {
      let historicoSaque =
        JSON.parse(localStorage.getItem("historicoSaque")) || [];
      historicoSaque.push(dadosDoSaque);
      localStorage.setItem("historicoSaque", JSON.stringify(historicoSaque));
      geraExtrato(dadosDoSaque.tipo, dadosDoSaque.valorSolicitado);

      setTimeout(() => {
        alert("Deposito realizado com sucesso!");
        window.location = "./paginaInicialPerfil.html";
      }, 1500);
      return;
    }

    alert("Operação cancelada");
  });
};

let funcaoDeposito = function () {
  let valorDoDeposito = document.querySelector(
    '[data-modal-deposito="valor-a-enviar"]'
  );
  let btnConfirmaDeposito = document.querySelector(
    '[data-modal-deposito="btn-de-confirmar"]'
  );

  btnConfirmaDeposito.addEventListener("click", function () {
    let valorParaDepositar = parseFloat(valorDoDeposito.value);

    if (isNaN(valorParaDepositar)) {
      throw new Error("Digite o valor corretamente.");
    }

    let dadosDoDeposito = {
      idClinte: "123456",
      tipo: "deposito",
      modo: "crédito",
      taxAdm: "",
      valorDepositado: valorParaDepositar,
      dataOperacao: new Date(),
      descricao: "Deposito efetuado no ATM",
    };

    let confirmaDeposito_is = confirm("Deseja confirmar esse deposito?");

    if (confirmaDeposito_is == true) {
      let historicoDeposito =
        JSON.parse(localStorage.getItem("historicoDeposito")) || [];

      historicoDeposito.push(dadosDoDeposito);

      localStorage.setItem(
        "historicoDeposito",
        JSON.stringify(historicoDeposito)
      );
      geraExtrato(dadosDoDeposito.tipo, dadosDoDeposito.valorDepositado);

      setTimeout(() => {
        alert("Deposito realizado com sucesso!");
        window.location = "./paginaInicialPerfil.html";
      }, 1500);

      return;
    }

    alert("Operação cancelada");
  });
};

let funcaoPix = function () {
  let destinatario = document.querySelector(
    '[data-modal-pix="destinatario-pix"]'
  );
  let tipoPix;
  let botaoConfirma = document.querySelector(
    '[data-modal-pix="btn-de-confirmar"]'
  );
  let valorAEnviar = document.querySelector(
    '[data-modal-pix="input-valor-a-enviar"]'
  );

  destinatario.addEventListener("keyup", function () {
    if (pixDestinatario.value.includes("@")) {
      console.log("Pix do tipo email.");
      tipoPix = "email.";
    }

    console.log(destinatario.value.length);

    if (destinatario.value.length == "12") {
      console.log("Pix do tipo celular.");
      tipoPix = "celular";
    }

    if (destinatario.value.length == "14") {
      console.log("Pix do tipo cnpj.");
      tipoPix = "cnpj";
    }

    if (destinatario.value.length == "11") {
      console.log("Pix do tipo cpf.");
      tipoPix = "cpf";
    }
  });

  botaoConfirma.addEventListener("click", function () {
    if (destinatario.value == "") {
      console.log("O campo de remetente não pode ser em branco ");
      return;
    }

    if (valorAEnviar.value == "") {
      console.log("O campo de valor a enviar, não pode ser em branco ");
      return;
    }

    let dadosPix = {
      idClinte: "123456",
      destinatario: destinatario.value,
      "tipo de pix": tipoPix || "tipo não encontrado",
      remetente: "Pedro",
      valor: valorAEnviar.value,
      data: new Date(),
      descrição: "Envio",
      tipo: "pix",
      "tipo operacao": "debito",
    };

    let confirmaPix_is = confirm(
      `Deseja confirmar o pix no valor de R$ ${valorAEnviar.value} para ${destinatario.value}`
    );

    if (confirmaPix_is == true) {
      let historicoPix = JSON.parse(localStorage.getItem("historicoPix")) || [];
      historicoPix.push(dadosPix);
      localStorage.setItem("historicoPix", JSON.stringify(historicoPix));
      geraExtrato(dadosPix.tipo, dadosPix.valor);

      setTimeout(() => {
        alert("Pix enviado com sucesso!");
        window.location = "./paginaInicialPerfil.html";
      }, 1500);
      return;
    }

    alert("Operação cancelada");
  });
};

let funcaoPagamento = function () {
  let elementosPagamentos = document.querySelectorAll("[data-modal-pagamento]");

  let dadosDoCodigoDeBarras = {
    idClinte: "123456",
    beneficiario: "Companhia de energia do estado de pernambuco",
    "data-documento": "25/12/2024",
    "n-do-documento": 123456785,
    vencimento: "12/12/2024",
    "data-do-pagamento": new Date(),
  };

  document
    .querySelector('[data-modal-pagamento="btn-de-confirmar"]')
    .addEventListener("click", function () {
      let codBarras = elementosPagamentos[0].value;
      let vencimentoBoleto = elementosPagamentos[2].value;
      let valorBoleto = elementosPagamentos[1].value;

      let dadosBoleto = {
        idClinte: "123456",
        "codigo-de-barras": codBarras,
        "pagamento-data-boleto": vencimentoBoleto,
        "valorDoBoleto": valorBoleto,

        dadosDoBoleto: dadosDoCodigoDeBarras,
      };

      let confirmaPagamento_is = confirm(
        `Deseja confirmar o PAGAMENTO no valor de R$ ${valorBoleto} ?`
      );

      if (confirmaPagamento_is == true) {
        let historicoPagamento =
          JSON.parse(localStorage.getItem("historicoPagamento")) || [];
        historicoPagamento.push(dadosBoleto);
        localStorage.setItem(
          "historicoPagamento",
          JSON.stringify(historicoPagamento)
        );
        geraExtrato("Pagamento de título", valorBoleto);

        setTimeout(() => {
          alert("Pix enviado com sucesso!");
          window.location = "./paginaInicialPerfil.html";
        }, 1500);
        return;
      }

      alert("Operação cancelada");
    });
};

//Inicio das funções - NÃO APAGUE.
console.log('Saldo inicial: R$ ' + SaldoInicial);
exibeCard();
saudacaoInicial();
capturaLinksMenuPrincipal();
