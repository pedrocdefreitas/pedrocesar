"use strict";

const xhr = new XMLHttpRequest();
let valorSalvoHistorico;
let historicoSaqueDB = [];
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
        // console.log(link)
      }
    });
  });
});

// itensDoMenu.forEach( div => {

//     div.addEventListener('click', (elemento)=>{
//         if( elemento.target.tagName === "DIV"){

//             const attr = elemento.target.attributes[0].value

//             let resultado = Object.values(menu).forEach( el =>{
//                 if( attr === el.idName){ console.log( el.linkMenu )}
//             })
//         }

//     })
// })

function setDataHistorico() {
  let data = new Date();
  let dataFormatada = `${data.getDate()} ${
    data.getMonth() + 1
  } ${data.getFullYear()}`;
  return dataFormatada;
}

function setHoraHistorico() {
  let data = new Date();
  let HoraFormatada = `${data.getHours()} ${data.getMinutes()} ${data.getSeconds()}`;
  return HoraFormatada;
}

xhr.open("GET", "./assets/src/views/Sacar.html", true);

xhr.responseType = "text";

xhr.onload = function () {
  if (xhr.status === 200) {
    let botaoDeSaque = document.querySelector('[data-menu-main="saque"]');
    botaoDeSaque.addEventListener("click", function () {
      let container = document.querySelector("#container-modal-main");
      container.innerHTML = xhr.responseText;

      let mainModal = document.querySelector("#main-modal");

      setTimeout(function () {
        mainModal.style.top = "0";
      }, 100);

      let botaoDesistir = document
        .querySelector(".btn-de-desistir-tela-um")
        .addEventListener("click", function () {
          let confirma_is = confirm("Deseja desistir?");
          if (confirma_is == true) {
            window.location = "./paginaInicialPerfil.html";
          }
        });

      let botaoConfirmaSaque = document
        .querySelector("#btn-de-confirmar")
        .addEventListener("click", function () {
          // Validações do input
          let valorInputSaque = document.querySelector("#valor-a-enviar");
          if (valorInputSaque.value == "") {
            throw new Error("Digite um valor para seguir com o saque");
          }
          if (isNaN(valorInputSaque.value)) {
            throw new Error("Só é aceito números para seguir.");
          }
          valorSalvoHistorico = valorInputSaque.value;

          // Verificação de confirmação do usuario para proseguir como saque
          let confirmaAcao = confirm("Deseja confirmar saque?");

          // Menssagem de aguarde, antes de realizar o saque.
          let btnConfirma = document.querySelector("#btn-de-confirmar");
          btnConfirma.textContent = "Aguarde a solicitação";

          // Desição sobre a confirmação do usuario, se "ok" o saque é realizado
          if (confirmaAcao == true) {
            let salvaHistoricoDeSaque = function (
              idCliente,
              Op = "Debito",
              Valor,
              Data,
              Hora
            ) {
              this.idCliente = idCliente;
              this.operacao = Op;
              this.valorDoSaque = Valor;
              this.DataDoSaque = Data;
              this.HoraDoSaque = Hora;
            };

            historicoSaqueDB.push(
              new salvaHistoricoDeSaque(
                "12345",
                "Deb",
                valorSalvoHistorico,
                setDataHistorico(),
                setHoraHistorico()
              )
            );

            setTimeout(() => {
              alert(
                `Saque realizado com sucesso no valor de ${valorSalvoHistorico}`
              );
              console.log(historicoSaqueDB);
            }, 3500);
          }
        });
    });
  }
};

xhr.send();
