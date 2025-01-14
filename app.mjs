  let dadosDoUsuario = JSON.parse(localStorage.getItem('usuario'))
  let nomeUsuario = document.querySelector('[data-perfil="nome"]')
  let contaUsuario = document.querySelector('[data-perfil="conta-usuario"]')
    
  console.log( dadosDoUsuario )
    
  if( dadosDoUsuario ){
        nomeUsuario.innerHTML = dadosDoUsuario.nome || "carregando nome"
        contaUsuario.innerHTML = `Ag ${dadosDoUsuario.agencia} - ${dadosDoUsuario.conta}` || "carregando informações da conta"
        console.log('temos usuário por aqui...')
  }else{
         window.location = '../../../criaConta.html'
  }

let SaldoInicial = atualizaSaldo();

if( SaldoInicial == '00'){
  
  setTimeout(()=>{
    document.querySelector('[data-perfil="saldo-user"]')
    .innerHTML = "Você está sem saldo, faça seu primeiro depósito."

    document.querySelector('[data-perfil="saldo-user"]').style.fontSize  = '15px'
    document.querySelector('[data-perfil="saldo-user"]').style.color = 'red'

  }, 2000)
}

let mensagens = {
    saldo: {
      sucesso: "SUCESSO: Saldo atualizado",
      semSaldo: "ERRO: Você ainda não realizou um depósito, faça seu primeiro depósito."
    },

    saque:{
      erroDeValor: "ERRO: Informe o valor corretamente.",
      erroDeSaldo: "ERRO: Saldo insuficiente para essa operação.",
      erroDeInput: "ERRO: Este campo não pode ser vazio.",
      sucesso: "SUCESSO: Saque realizado com sucesso."
    },

    pix:{
      erroDeValor: "ERRO: Informe o valor corretamente.",
      erroDeSaldo: "ERRO: Saldo insuficiente para essa operação.",
      errorDestinatario: "ERRO: Verifique as informações do destinatário.",
      erroInputDest: "ERRO: Este campo de destinatario não pode ser vazio.",
      erroInputInpt: "ERRO: Este campo de valor não pode ser vazio.",
      sucesso: "SUCESSO: Pix enviado com sucesso."
    },

    deposito: {
      erroDeValor: "ERRO: Preenchimento inválido: Informe o valor corretamente.",
      sucesso: "SUCESSO: Deposito realizado com sucesso.",
      erroInputVazio: 'ERRO: Campo inválido: O campo valor não pode estar vazio, informe algum valor.'
    }
}

function flashMsg (mensagem){ 
  let modal = document.querySelector('#mensagensInformativas')

  //Recebe a mensagem que foi configurada no objeto de mensagens.
  let msg = mensagem


  if(msg.includes('ERRO')){
    modal.style.backgroundColor = "red"
    modal.style.color = "white"
    modal.style.fontWeight = 'bold'
  }

  if(msg.includes('SUCESSO')){
    modal.style.backgroundColor = "#00ff00"
    modal.style.fontWeight = 'bold'
     modal.style.color = "black"
  }
    
    modal.style.display = 'block'
    modal.innerHTML = msg
  
    setTimeout( ()=>{
      modal.style.marginTop = '40px'
        setTimeout( ()=>{
          modal.style.marginTop = '-50px'
          modal.style.display = 'none'
        }, 4000)
    }, 100)
}




  //Funções de saudação e exibição de saldo atualizado.
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
//   textoDataPorExtenso.textContent =
//     "" +
//     dayName[now.getDay()] +
//     ", " +
//     now.getDate() +
//     " de " +
//     monName[now.getMonth()] +
//     " de " +
//     now.getFullYear() +
//     ".";
};

let funcaoSaudacao = function(){
  let date = new Date()
   
  let get = {
    hora: date.getHours(),
    minutos: date.getMinutes(),
    segundos: date.getSeconds(),
    horafull: date.getTime(),
    mensagemSaudacao: document.querySelector('[data-perfil="saudacao"]')
  } 

  let horaFull =  `${get.hora}:${get.minutos}:${get.segundos}`

  if( get.hora >= 0 && get.hora <= 9) get.hora = '0'+ get.hora 
  if( get.minutos >= 0 && get.minutos <= 9) get.minutos = '0'+ get.minutos 


   if( horaFull > '00:00:00' && horaFull <= '11:59:59'){
      console.log('Bom dia!')
      console.log( horaFull )
      return  get.mensagemSaudacao.innerHTML  = "Bom dia,"
   } else if ( horaFull >= '12:00:00' && horaFull <= '17:59:59'){
      console.log('Boa tarde!')
      console.log( horaFull )
      return  get.mensagemSaudacao.innerHTML  = "Boa tarde,"
   } else if (horaFull >= '18:00:00' && horaFull <= '23:59:59'){
      console.log('Boa Noite!')
      console.log( horaFull )
        return get.mensagemSaudacao.innerHTML = "Boa noite,"
   }
}

function atualizaSaldo() {

  let somaDebitos = totalOperacaoDebitos()
  let debitosTotais = parseInt(somaDebitos.totalPagamentos) + parseInt(somaDebitos.totalPixRealizado) + parseInt( somaDebitos.totalSaquesRealizado ) 

  
  let valores = [];
  let historicoDeDepositos =
    JSON.parse(localStorage.getItem("historicoDeposito")) || [];

  let displaySaldo = document.querySelector('[data-perfil="saldo-user"]') || {};

  historicoDeDepositos.forEach((depositos) => {
    valores.push(depositos.valorDepositado);
  });

  let somaSaldo = valores.reduce(function (acumulador, valorAtual) {
    return acumulador + valorAtual;
  }, 0);

  let result = somaSaldo - debitosTotais

  displaySaldo.innerHTML = "R$ " + result.toFixed(2);

  

  return result;
}

function exibeCard() {

  let card = document.querySelector(".card-container");

  card.addEventListener("click", function () {

    card.classList.toggle('show')
    
    if( card.classList.contains('hiden')){
      card.classList.remove('hiden')
      card.classList.add('show')
    }else{
      card.classList.remove('show')
      card.classList.add('hiden')
    }
  }

)}

function dataFormatada(){
  let data = new Date
  let dataformatada = new Intl.DateTimeFormat('pt-BR').format(data)
  return dataformatada
}

console.log(dataFormatada())





//Funções de Requisição de Views e captura dos botões para ativação de views.

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




//Funções de operações bancárias.
function totalOperacaoDebitos() {  
  
  let saquesRealizados = JSON.parse(localStorage.getItem('historicoSaque')) || []
  let pixRealizados = JSON.parse(localStorage.getItem('historicoPix')) || []
  let pagamentosRealizados = JSON.parse(localStorage.getItem('historicoPagamento')) || []

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

let funcaoSaque = function () {

  let inputSaque = document.querySelector(
    '[data-modal-sacar="valor-a-enviar"]'
  );
  let btnDeConfirmarSaque = document.querySelector(
    '[data-modal-sacar="btn-de-confirmar"]'
  );

  btnDeConfirmarSaque.addEventListener("click", function () {
    let valorDigitado = inputSaque.value;

    // if (typeof valorDigitado === 'string') {
    //   window.scrollTo({ top: 0, behavior: 'smooth'})
    //   flashMsg(mensagens.saque.erroDeValor)
    //   throw new Error("Digite o valor corretamente.");
    // }

    if (SaldoInicial < valorDigitado) {
      window.scrollTo({ top: 0, behavior: 'smooth'})
      flashMsg(mensagens.saque.erroDeSaldo)
      throw new Error("Saldo insuficiente.." + SaldoInicial);
    }

    if (valorDigitado == '') {
      window.scrollTo({ top: 0, behavior: 'smooth'})
      flashMsg(mensagens.saque.erroDeInput)
      throw new Error("O campo de valor está vazio.");
    }


    let dadosDoSaque = {
      idClinte: dadosDoUsuario.conta,
      tipo: "saque",
      modo: "débito",
      taxAdm: "",
      saldoAnterior: "saldoAnterior",
      valorSolicitado: valorDigitado,
      dataOperacao: dataFormatada(),
      descricao: "Saque efetuado ATM",
      saldoAtualizado: "saldofinal",
    };

    let confirmaSaque_is = confirm("Deseja confirmar o saque ?");

    if (confirmaSaque_is == true) {
    
      // flashMsg(mensagens.saque.sucesso)
      

      let historicoSaque =
        JSON.parse(localStorage.getItem("historicoSaque")) || [];

      historicoSaque.push(dadosDoSaque);
     
      localStorage.setItem("historicoSaque", JSON.stringify(historicoSaque));

      geraExtrato(dadosDoSaque.tipo, dadosDoSaque.valorSolicitado);


      setTimeout(() => {
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
      window.scrollTo({ top: 0, behavior: 'smooth'})
      flashMsg(mensagens.deposito.erroDeValor)
      throw new Error("Digite o valor corretamente.");
    }

    if (valorParaDepositar == '') {
      window.scrollTo({ top: 0, behavior: 'smooth'})
      flashMsg(mensagens.deposito.erroInputVazio)
      throw new Error("O campo de valor está vazio.");
    }

    

    let dadosDoDeposito = {
      idClinte: dadosDoUsuario.conta,
      tipo: "deposito",
      modo: "crédito",
      taxAdm: "",
      valorDepositado: valorParaDepositar,
      dataOperacao: dataFormatada(),
      descricao: "Deposito efetuado no ATM",
    };

    let confirmaDeposito_is = confirm("Deseja confirmar esse deposito?");

    if (confirmaDeposito_is == true) {
      window.scrollTo({ top: 0, behavior: 'smooth'})
      flashMsg(mensagens.deposito.sucesso)
      let historicoDeposito =
        JSON.parse(localStorage.getItem("historicoDeposito")) || [];

      historicoDeposito.push(dadosDoDeposito);
  
      localStorage.setItem(
        "historicoDeposito",
        JSON.stringify(historicoDeposito)
      );
      geraExtrato(dadosDoDeposito.tipo, dadosDoDeposito.valorDepositado);

      setTimeout(() => {
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
    destinatario.value = parseFloat(destinatario.value )

    if (destinatario.value == "") {
      window.scrollTo({ top: 0, behavior: 'smooth'})
      flashMsg(mensagens.pix.erroInputDest)
      console.log("O campo de remetente não pode ser em branco ");
      throw new Error('O campo de remetente não pode ser em branco ');
    }

    if (valorAEnviar.value == "") {
      window.scrollTo({ top: 0, behavior: 'smooth'})
      flashMsg(mensagens.pix.erroInputInpt)
      console.log("O campo de valor a enviar, não pode ser em branco ");
      throw new Error("O campo de valor a enviar, não pode ser em branco");
    }


    if (SaldoInicial < valorAEnviar.value) {
      window.scrollTo({ top: 0, behavior: 'smooth'})
      flashMsg(mensagens.pix.erroDeSaldo)
      throw new Error("Saldo insuficiente.." + SaldoInicial);
    }

    let dadosPix = {
      idClinte: dadosDoUsuario.conta,
      destinatario: destinatario.value,
      "tipo de pix": tipoPix || "tipo não encontrado",
      remetente: "Pedro",
      valor: valorAEnviar.value,
      data: dataFormatada(),
      descrição: "Envio",
      tipo: "pix",
      "tipo operacao": "debito",
    };

    let confirmaPix_is = confirm(
      `Deseja confirmar o pix no valor de R$ ${valorAEnviar.value} para ${destinatario.value}`
    );

    if (confirmaPix_is == true) {
      window.scrollTo({ top: 0, behavior: 'smooth'})
      flashMsg(mensagens.pix.sucesso)
      let historicoPix = JSON.parse(localStorage.getItem("historicoPix")) || [];
      historicoPix.push(dadosPix);
      localStorage.setItem("historicoPix", JSON.stringify(historicoPix));
      geraExtrato(dadosPix.tipo, dadosPix.valor);

      setTimeout(() => {
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
    idClinte: dadosDoUsuario.conta,
    beneficiario: "Companhia de energia do estado de pernambuco",
    "data-documento": "25/12/2024",
    "n-do-documento": 123456785,
    vencimento: "12/12/2024",
    "data-do-pagamento": dataFormatada(),
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

      if (SaldoInicial < valorBoleto) {
        window.scrollTo({ top: 0, behavior: 'smooth'})
        flashMsg(mensagens.saque.erroDeSaldo)
        throw new Error("Saldo insuficiente.." + SaldoInicial);
      }

      let confirmaPagamento_is = confirm(
        `Deseja confirmar o PAGAMENTO no valor de R$ ${valorBoleto} ?`
      );

      if (confirmaPagamento_is == true) {
        window.scrollTo({ top: 0, behavior: 'smooth'})
        flashMsg("Pagamento realizado com sucesso!")

        let historicoPagamento =
          JSON.parse(localStorage.getItem("historicoPagamento")) || [];
        historicoPagamento.push(dadosBoleto);
        localStorage.setItem(
          "historicoPagamento",
          JSON.stringify(historicoPagamento)
        );

        geraExtrato("Pagamento de título", valorBoleto);

        setTimeout(() => {
          window.location = "./paginaInicialPerfil.html";
        }, 1500);
        return;
      }

      alert("Operação cancelada");
    });
};

function geraExtrato(tipoDeOperacao, valorOperacao) {

  let operacao = {
    data: dataFormatada(),
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

  let movimentacoes = JSON.parse(localStorage.getItem("historicoExtrato"));
  // console.log( movimentacoes[i].descricao)
  
  
  

  let i;
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



//Funções da tela de cadastro de usuário.




//Inicio das funções - NÃO APAGUE.
console.log('Saldo inicial: R$ ' + SaldoInicial);
funcaoSaudacao()
exibeCard();
saudacaoInicial();
capturaLinksMenuPrincipal();
