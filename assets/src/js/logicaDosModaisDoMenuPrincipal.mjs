import funcaoSaque from "./oparacoesBancarias.mjs";

let elementosDaPagina = {
  mainModalDisplaySaque: document.querySelector("#main-modal-display-saque"),
  modalDoValorDoSaque: document.querySelector(".tela-insira-valor-de-saque"),
  botaoConfirmaSaque: document.querySelector(".btnConfirmaSaque"),
  botaoDesistirSaque: document.querySelector(".btn-desistir"),
  spanMostraErros: document.querySelector(".show-error"),
  modalDeConfirmacaoDeSaque: document.querySelector(".modal-saque-realizado"),
  spanMostraValorDoSaque: document.querySelector(".valordoSaque"),
  valorAtualizadoDoSaldoAposSaque: document.querySelector(".valor-atualizado-display"),
  inputValordeSaque: document.querySelector(".tela-insira-valor-de-saque input"),
  avancarProximo: document.querySelector('.tela-insira-valor-de-saque'),
  botaoMenuDeSaque: document.querySelector('#menu-main .btnSacar')
};


function acoesDoModalDeSaque() {

  elementosDaPagina.botaoDesistirSaque.addEventListener('click', ()=>{
    let confirma = confirm('Deseja desistir do saque?')

    if(confirma != false){
        alert('operação cancelada')
    }

    setTimeout(()=>{
      window.location = "./../../../paginaInicialPerfil.html"
    })
    
  })
  
  elementosDaPagina.botaoMenuDeSaque.addEventListener('click', ()=>{
    elementosDaPagina.mainModalDisplaySaque.style.display = 'block'
  })
  
  elementosDaPagina.botaoConfirmaSaque.addEventListener("click", (event) => {
    event.preventDefault();
    
    if (elementosDaPagina.inputValordeSaque.value == "") {
      throw new Error(
        "O campo do valor do saque não pode ser vazio para seguir.."
      );
    }

    if (isNaN(elementosDaPagina.inputValordeSaque.value)) {
      throw new Error("É necessário informar um valor válido.");
    }

    elementosDaPagina.botaoConfirmaSaque.innerHTML = "Aguarde..."

    setTimeout( ()=>{
      elementosDaPagina.avancarProximo.style.marginLeft = '-100%'
      elementosDaPagina.spanMostraValorDoSaque.innerHTML = elementosDaPagina.inputValordeSaque.value
      console.log(elementosDaPagina.inputValordeSaque.value);

      setTimeout(()=>{
        window.location = "./../../../paginaInicialPerfil.html"
      }, 2000)
      
    }, 2000)

  });
}
acoesDoModalDeSaque();

function acoesDoModalDeDeposito(e) {
  let btnSeguirDeposito = document.querySelector(".btnSeguirDeposito");
  let inputValorDeposito = document.querySelector(
    ".input-valor-a-ser-depositado"
  );
  let formularioDeposito = document.querySelector(".formulario-deposito");
  let displayBoleto = document.querySelector(".tela-insira-valor-deposito");
  let btnConfirmaDeposito = document.querySelector(".btnConfirmaDeposito");
  let btnMenuDepositar = document.querySelector(".btnDepositar");
  let btnCancelarDeposito = document.querySelector(".btn-cancelar-deposito");
  let mainModalDeposito = document.querySelector(
    "#main-modal-guia-de-deposito"
  );

  // função para o botão de cancelar operação de deposito:
  btnCancelarDeposito.addEventListener("click", function () {
    let confirme = confirm("Deseja cancelar ?");

    if (confirme == true) {
      window.location = "../../../paginaInicialPerfil.html";
    } else {
      alert("Ok!");
    }
  });

  // função para parar o evento de carregamento do submit:
  formularioDeposito.addEventListener("click", function (e) {
    e.preventDefault();
  });

  // função de click para abrir a tela de guia do deposito:
  btnMenuDepositar.addEventListener("click", () => {
    mainModalDeposito.style.display = "block";
  });

  // funcao de click para pegar o valor do deposito no input:
  btnSeguirDeposito.addEventListener("click", function () {
    let valor = inputValorDeposito.value;
    if (valor === "") {
      return alert("Erro de vazio");
    }
    //Is NAN retorna verdadeiro se for um string...
    if (isNaN(valor)) {
      return alert("Precisa ser um número");
    }
    displayBoleto.style.marginLeft = "-50vw";
  });

  btnConfirmaDeposito.addEventListener("click", function () {
    alert("pagamento confirmado...");

    setTimeout(function () {
      window.location = "../../../paginaInicialPerfil.html";
    }, 3000);
  });
}
acoesDoModalDeDeposito();
