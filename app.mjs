let historicoOperacoes = [];
let SaldoInicial = 100

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
          htmlRequest(link);
        }
      });
    });
  });
};

let htmlRequest = function (linkPaginaMenu) {
  //funcão para fazer a requisição das paginas dos links do menu.
  let containerMenu = document.querySelector("#container-modal-menu");
  let http = new XMLHttpRequest();
  http.open("GET", linkPaginaMenu, true);
  http.responseType = "text";

  http.onload = function () {
    if (http.status == 200 || http.status == 304) {
      containerMenu.innerHTML = http.responseText;
      funcaoSaque()
      
      
    //É necessário esse tempo para que o elemento surga na tela, para então ocorrer a animação de descer.
      setTimeout( function () {  
        containerMenu.style.top = '0px'
      }, 100)

      acaoDoBotaoDesistir(containerMenu)
    }

  };

  http.send();

};

let acaoDoBotaoDesistir = function( containerMenu ){
  //Função para o botão de desistir ( está funcionando em todas as Views... )
  let botaoDesistir = document.querySelector('.btn-de-desistir-tela-um')
  botaoDesistir.addEventListener('click', function(){
    console.log('desisti')

    //É necessário esse tempo para que o elemento surga na tela, para então ocorrer a animação de subir.
    setTimeout( function () {  
      containerMenu.style.top = '-100vh'
    }, 100)
  })
}

let saudacaoInicial = function(){
  let textoDataPorExtenso = document.querySelector('[data-perfil="data-sistema"]')
  let now = new Date
  let dayName = new Array ("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado")
  let monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
  textoDataPorExtenso.textContent = "" + dayName[now.getDay() ] + ", " + now.getDate () + " de " + monName [now.getMonth() ]   +  " de "  +     now.getFullYear () + "."
}


let funcaoSaque = function(){

    let elementosSaque = document.querySelectorAll('[data-modal-sacar]')
    elementosSaque[3].addEventListener('keyup', function () {
    let valorDigitado = elementosSaque[1].value 
    let saldoAnterior = SaldoInicial

    if(isNaN( valorDigitado )){ 
      historicoOperacoes.push("Tentativa de saque não realizada, valor incorreto.")
      throw new Error('Digite o valor corretamente.')}

    if( SaldoInicial < valorDigitado){ 
      historicoOperacoes.push("Tentativa de saque não realizada, Saldo insuficiente!")
      throw new Error('Saldo insuficiente..' + SaldoInicial)}

    let saldofinal = SaldoInicial -= valorDigitado

    let dadosDoSaque = {
      "idClinte": '123456',
      "tipo": "saque",
      "modo": "débito",
      "taxAdm": '',
      "saldoAnterior": saldoAnterior,
      "valorSolicitado": valorDigitado,
      "dataOperacao": '04/01/2025',
      "descricao": 'Saque efetuado ATM',
      "saldoAtualizado": saldofinal
    }

    historicoOperacoes.push(dadosDoSaque)
    console.log( historicoOperacoes )

  })

}

let funcaoDeposito = function(){
  
}



//Inicio das funções - NÃO APAGUE.
saudacaoInicial()
capturaLinksMenuPrincipal();




















// function OperacaoBancaria(SaldoInicial, idCliente, DataOperacao, TipoOperacao, Descricao, Tarifa, Destinatario, ValorBruto, ValorNominal ){ 

//     let saldoInicial = SaldoInicial
//     //Cadastro base para operações bancárias.

//     this.IdCliente    = idCliente
//     this.DataOperacao = DataOperacao
//     this.TipoOperacao = TipoOperacao
//     this.Descricao    = Descricao
//     this.Tarifa       = Tarifa
//     this.Destinatario = Destinatario
//     this.ValorBruto   = ValorBruto
//     this.ValorNominal = ValorNominal


//     this.Saque = function (ValorDoSaque, taxaDeSaque) {

//       if( saldoInicial > ValorDoSaque) {
//         return saldoInicial -= saldoInicial - ValorDoSaque
//       }

//       throw new Error('Sem saldo suficiente, Realize um deposito')
//       //Ofereça o link para a tela do deposito.
//     }

//     // this.ResumoCliente = function(){}
//     // this.Pix = function (ValorDoPix){
//     //   if( SaldoInicial > ValorDoPix){
//     //     return SaldoInicial -= ValorDoPix
//     //   } 
//     //   throw new Error('Sem saldo suficiente, Realize um deposito')
//     // }

//     // this.Deposito = function (ValorDeposito) {
//     //   return SaldoInicial += ValorDeposito
//     // }

//     // this.Pagamento = function(){}

//     // this.Extrato = function () {}

//     // this.AtualizaSaldo = function( ){}

//   }