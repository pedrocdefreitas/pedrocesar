const w = window;
console.log(document.URL);

let SaldoInicial = 0.0;

let mensagensDeAvisos = {
  saldo: {
    sucesso: {
      msg_sucesso: "Saldo será exibido...",
      tipo_msg: "sucesso",
    },

    falha: {
      msg_erro:
        "Não podemos realizar sua requisição nesse momento, tente mais tarde",
      msg_sem_saldo:
        "Você está sem saldo, Realize seu déposito por pix ou boleto!",
      tipo_msg: "falha",
    },
  },

  saque: {
    sucesso: {
      msg_sucesso: "Saque realizado com sucesso, gerando comprovante de saque.",
      tipo_msg: "sucesso",
    },

    falha: {
      msg_erro:
        "Não podemos realizar sua guia de saque nesse momento, tente mais tarde",

      msg_sem_saldo:
        "Você está sem saldo, Realize seu déposito por pix ou boleto!",

      msg_erro_vazio: "Preencha todos os dados corretamente.",

      tipo_msg: "falha",
    },
  },
};

function historicoDeSaldoPorOperacoes() {
  let historicoSaldos =
    JSON.parse(localStorage.getItem("historicoSaldos")) || [];
  historicoSaldos.push(arguments[0]);
  localStorage.setItem("historicoSaldos", JSON.stringify(historicoSaldos));
  console.log(historicoSaldos);
}

function ATUALIZA_DADOS_CLIENTE_CABECALHO() {
  let RECUPERA_DADOS_USUARIO_DB = JSON.parse(localStorage.getItem("usuario"));

  let NOME_DO_CLIENTE = document.querySelector('[data-perfil="nome"]');

  let CONTA_D0_CLIENTE = document.querySelector(
    '[data-perfil="conta-usuario"]'
  );

  let SALDO_DO_CLIENTE = document.querySelector('[data-perfil="saldo-user"]');

  if (RECUPERA_DADOS_USUARIO_DB) {
    NOME_DO_CLIENTE.innerHTML =
      RECUPERA_DADOS_USUARIO_DB.nome || "carregando nome";

    CONTA_D0_CLIENTE.innerHTML =
      `Ag ${RECUPERA_DADOS_USUARIO_DB.agencia} - ${RECUPERA_DADOS_USUARIO_DB.conta}` ||
      "carregando informações da conta";
  } else {
    window.location = "../../../criaConta.html";
  }

  if (SOMA__DE_DEPOSITOS_REALIZADOS() == "00") {
    setTimeout(() => {
      SALDO_DO_CLIENTE.innerHTML = " Você está sem saldo! ";

      document.querySelector('[data-perfil="saldo-user"]').style.fontSize =
        "15px";
      document.querySelector('[data-perfil="saldo-user"]').style.color =
        "wrhite";
    }, 2000);
  } else {
    SALDO_DO_CLIENTE.innerHTML = "R$ " + SaldoInicial.toFixed(2);
  }
}

function flashMsg(mensagem, tipoMsg) {
  // let msg = mensagem;
  let tipo_de_msg = tipoMsg;
  console.log(tipoMsg);
  let boxContainerMensagem = document.getElementById("mensagensInformativas");

  let divDasMensagens = document.createElement("div");
  divDasMensagens.textContent = mensagem;

  boxContainerMensagem.append(divDasMensagens);

  if (tipo_de_msg == "sucesso") {
    boxContainerMensagem.setAttribute("class", "Set_msg_sucesso");
    boxContainerMensagem.style.marginTop = "10vh";

    setTimeout(() => {
      boxContainerMensagem.style.marginTop = "-100vh";
      boxContainerMensagem.innerHTML = "";
      boxContainerMensagem.style.marginTop = "none";
      boxContainerMensagem.parentNode.removeChild(divDasMensagens);
    }, 2500);

    return;
  } else if (tipo_de_msg == "falha") {
    boxContainerMensagem.setAttribute("class", "Set_msg_error");
    boxContainerMensagem.style.marginTop = "10vh";

    setTimeout(() => {
      boxContainerMensagem.style.marginTop = "-100vh";
      boxContainerMensagem.innerHTML = "";
      boxContainerMensagem.style.marginTop = "none";
      boxContainerMensagem.parentNode.removeChild(divDasMensagens);
    }, 2500);

    return;
  } else {
    boxContainerMensagem.setAttribute("class", "Set_mensagens_informativas");
    boxContainerMensagem.style.marginTop = "10vh";

    setTimeout(() => {
      boxContainerMensagem.style.marginTop = "-100vh";
      boxContainerMensagem.innerHTML = "";
      boxContainerMensagem.style.marginTop = "none";
      boxContainerMensagem.parentNode.removeChild(divDasMensagens);
    }, 2500);
  }
}

function ocultaBody() {
  let conteudo = document.querySelector("#main-pagina-inicial");

  conteudo.style.marginTop = "-100vh";

  setTimeout(() => {
    conteudo.style.display = "none";
  }, 1000);
}

function dataFormatada() {
  let data = new Date();
  let dataformatada = new Intl.DateTimeFormat("pt-BR").format(data);
  return dataformatada;
}

function botaoVoltar() {
  let container = document.getElementsByClassName("main-modal-principal");
  let botao = document.createElement("button");
  let span = document.createElement("span");

  span.innerHTML = "Voltar";

  botao.setAttribute("id", "btn-voltar");
  botao.append(span);
  container[0].append(botao);

  botao.addEventListener("click", function () {
    window.location = "./paginaInicialPerfil.html";
  });
}

function geraExtrato(data, descricao, tipoDeOperacao, valorOperacao) {
  let operacao = {
    DATA: data,
    DESCRICAO: descricao,
    TIPO_OPERACAO: tipoDeOperacao,
    VALOR: valorOperacao,
  };

  let historicoExtrato =
    JSON.parse(localStorage.getItem("historicoExtrato")) || [];
  historicoExtrato.push(operacao);
  localStorage.setItem("historicoExtrato", JSON.stringify(historicoExtrato));
  console.log("Extrato gerado");
}

function exibeCard() {
  let card = document.querySelector(".card-container");

  card.addEventListener("click", function () {
    card.classList.toggle("show");

    if (card.classList.contains("hiden")) {
      card.classList.remove("hiden");
      card.classList.add("show");
    } else {
      card.classList.remove("show");
      card.classList.add("hiden");
    }
  });
}

function geraComprovante(tipoDeComprovante, valor) {
  let linkComprovante = "./assets/src/views/Comprovante.html";
  let tipoComprovante = tipoDeComprovante;

  let div_secao_um = document.getElementsByClassName(
    "div-com-informes-principais-comprovante"
  );
  let divInstrucoes = document.getElementsByClassName(
    "div-com-textos-de-instrucoes"
  );
  let img_logo_comprovante = document.getElementsByClassName(
    "img-logo-comprovante"
  );
  let div_informacoes_complementar = document.getElementsByClassName(
    "div-com-informacoes-complementares-comprovante"
  );
  let html = document.getElementsByTagName("html");
  let btn = document.getElementsByClassName("brn-comprovante");

  let http = new XMLHttpRequest();
  http.open("GET", linkComprovante, true);
  http.responseType = "text";

  http.onload = function () {
    if (http.status == 200 || http.status == 304) {
      html[0].innerHTML = http.responseText;

      if (tipoComprovante === "deposito") {
        let instrucoes = `
        <p>Deposito realizado com sucesso. Em alguns minutos seu dinheiro estará disponível para realizar transações.</p>

        `;
        img_logo_comprovante[0].innerHTML = `<img src='./assets/src/img/5299035.png'>`;
        div_secao_um[0].childNodes[3].innerHTML = "Comprovante de depósito";
        div_secao_um[0].childNodes[5].innerHTML = valor;
        divInstrucoes[0].innerHTML = instrucoes;
        div_informacoes_complementar[0].innerHTML = `
 
        <img src="./assets/src/img/11175737-unscreen.gif" width='140px' class='icon-smyle'>
  
        <small>Estamos muitos felizes por você escolher continuar conosco. Sempre que precisar, envie seu feedback para nos ajudar a manter nosso aplicativo moderno e atualizado</small>
        `;
      }

      if (tipoComprovante === "saque") {
        let instrucoes = `
            <p>Seu comprovante com o código de saque e as instruções foram enviadas para o email cadastrado no app.</p>
    
            <p>Após a confirmação, basta dirigir-se a uma <span class="destaque-texto">loterica ou ATM 24Hrs mais próximo e realizar o saque.</span></p>
    
            <p class="destaque-texto">Documentos necessários</p>
            <img src="../../../assets/src/img/ico-id.png" alt="" width="50px" class="img-compro">
            <p>Documento de identificação (Para saque na lotérica)</p>

            <img src="../../../assets/src/img/ico-cod.png" alt="" width="50px" class="img-compro">
            <p>Código do saque enviado por email.</p>
    
            <p class="destaque-texto">O Código de saque só é válido por 02 Horas(Duas horas)</p>

        `;

        div_secao_um[0].childNodes[3].innerHTML = "Comprovante de saque";
        div_secao_um[0].childNodes[5].innerHTML = valor;
        divInstrucoes[0].innerHTML = instrucoes;
      }

      if (tipoComprovante === "pagamento") {
        img_logo_comprovante[0].innerHTML = `<img src='./assets/src/img/5299035.png'>`;
        div_secao_um[0].childNodes[3].innerHTML = "Comprovante de pagamento";
        div_secao_um[0].childNodes[5].innerHTML = "R$ " + valor.toFixed(2);
        divInstrucoes[0].innerHTML = `Pagamento realizado com sucesso para o banco emissor. <small>Em breve novas infomações no comprovante, estou trabalhando nisso</small>`;
      }

      if (tipoComprovante === "pix") {
        img_logo_comprovante[0].innerHTML = `<img src='./assets/src/img/icones-menu/pix.png'>`;
        div_secao_um[0].childNodes[3].innerHTML = "Comprovante pix";
        div_secao_um[0].childNodes[5].innerHTML = "R$ " + valor;
        divInstrucoes[0].innerHTML = `Pix enviado com sucesso`;
        div_informacoes_complementar[0].innerHTML = `
        <h5>Últimos pix enviados</h5>
        <h5>Principais destinatários</h5>
        <h5>Pix recebidos</h5>
        `;
      }

      btn[0].addEventListener("click", function () {
        window.location = "./paginaInicialPerfil.html";
      });
    }
  };

  http.send();
}

let modalConfirmacaoOperacoes = function () {
  let bg = document.querySelector(".main-modal-principal");

  let div = document.createElement("div");
  div.setAttribute("id", "css_config_comprovante");

  let divCicle = document.createElement("div");
  divCicle.setAttribute("id", "cicle-png");

  let textoPrincipal = document.createElement("p");
  textoPrincipal.textContent = "Deseja Confirmar essa ação?";
  textoPrincipal.setAttribute("class", "config-text-principal");

  let span = document.createElement("span");
  span.textContent = "cancelar";
  span.setAttribute("class", "span_cancelar");

  span.addEventListener("click", function () {
    localStorage.setItem("confirma", "false");
    setTimeout(() => {
      window.location = "./paginaInicialPerfil.html";
    }, 500);
  });

  let button = document.createElement("button");
  button.textContent = "OK";

  div.append(divCicle, textoPrincipal, span, button);

  let container = document.querySelector("#container-para-mostrar-menu");
  container.append(div);

  setTimeout(function () {
    div.style.marginTop = "40vh";
    bg.setAttribute("class", "blur");
  }, 500);

  button.addEventListener("click", () => {
    localStorage.setItem("confirma", "true");
    // setTimeout( ()=>{
    //   window.location = './paginaInicialPerfil.html'
    // }, 500)
    return;
  });
};

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

let funcaoSaudacao = function () {
  let date = new Date();

  let get = {
    hora: date.getHours(),
    minutos: date.getMinutes(),
    segundos: date.getSeconds(),
    horafull: date.getTime(),
    mensagemSaudacao: document.querySelector('[data-perfil="saudacao"]'),
  };

  if (get.hora >= 0 && get.hora <= 9) get.hora = "0" + get.hora;
  if (get.minutos >= 0 && get.minutos <= 9) get.minutos = "0" + get.minutos;
  let horaFull = `${get.hora}:${get.minutos}:${get.segundos}`;

  if (horaFull > "00:00:00" && horaFull <= "11:59:59") {
    console.log("Bom dia!");
    console.log(horaFull);
    return (get.mensagemSaudacao.innerHTML = "Bom dia,");
  } else if (horaFull >= "12:00:00" && horaFull <= "17:59:59") {
    console.log("Boa tarde!");
    console.log(horaFull);
    return (get.mensagemSaudacao.innerHTML = "Boa tarde,");
  } else if (horaFull >= "18:00:00" && horaFull <= "23:59:59") {
    console.log("Boa Noite!");
    console.log(horaFull);
    return (get.mensagemSaudacao.innerHTML = "Boa noite,");
  }
};

//função para criação e exibição do cartão virtual da conta

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
      if (idName === "extrato") EXIBE_EXTRATO_AO_CLIENTE();

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

//SAQUE
let funcaoSaque = function () {
  let saldoInicial = SaldoInicial;
  let set = "espera";
  const taxaOperacao = 2.5 / 100;

  localStorage.setItem("confirma", JSON.stringify(set));

  ocultaBody();
  botaoVoltar();

  let btnDeConfirmarSaque = document.querySelector(
    '[data-modal-sacar="btn-de-confirmar"]'
  );

  btnDeConfirmarSaque.addEventListener("click", function () {
    let inputSaque = document.querySelector(
      '[data-modal-sacar="valor-a-enviar"]'
    );

    //formatando o valor em moeda.
    let valor_do_input = Number(inputSaque.value);

    if (valor_do_input == "" || valor_do_input == "0,00") {
      window.scrollTo({ top: 0, behavior: "smooth" });

      flashMsg(
        mensagensDeAvisos.saque.falha.msg_erro_vazio,
        mensagensDeAvisos.saque.falha.tipo_msg
      );

      throw new Error("O campo de valor está vazio.");
    }

    if (saldoInicial < valor_do_input) {
      window.scrollTo({ top: 0, behavior: "smooth" });

      flashMsg(
        mensagensDeAvisos.saque.falha.msg_sem_saldo,
        mensagensDeAvisos.saque.falha.tipo_msg
      );

      throw new Error("Saldo insuficiente para saque.");
    }

    let RECUPERA_DADOS_USUARIO_DB = JSON.parse(localStorage.getItem("usuario"));

    let DADOS_DO_SAQUE = {
      ID_CLIENTE: RECUPERA_DADOS_USUARIO_DB.conta,
      OPERACAO: "saque".toUpperCase(),
      MODO: "debito".toUpperCase(),
      TAXA_DE_SAQUE: taxaOperacao.toFixed(2),
      VALOR_DO_SAQUE: valor_do_input,
      DATA_DO_SAQUE: dataFormatada(),
      DESCRICAO: "Saque efetuado ATM".toUpperCase(),
      VALOR_LIQUIDO:
        parseFloat(valor_do_input) - taxaOperacao * parseFloat(valor_do_input),
    };

    console.log(DADOS_DO_SAQUE);
    console.log(typeof valor_do_input);
    console.log(typeof saldoInicial);

    modalConfirmacaoOperacoes();

    let segueFluxo = setInterval(() => {
      let verificaConfirma = JSON.parse(localStorage.getItem("confirma"));
      console.log(verificaConfirma);

      if (verificaConfirma === true) {
        clearInterval(segueFluxo);
        console.log("pode continuar...");

        let historicoSaque =
          JSON.parse(localStorage.getItem("historicoSaque")) || [];
        historicoSaque.push(DADOS_DO_SAQUE);
        localStorage.setItem("historicoSaque", JSON.stringify(historicoSaque));

        geraExtrato(
          dataFormatada(),
          DADOS_DO_SAQUE.DESCRICAO,
          DADOS_DO_SAQUE.OPERACAO,
          DADOS_DO_SAQUE.VALOR_LIQUIDO
        );
        historicoDeSaldoPorOperacoes("-" + valor_do_input);

        setTimeout(() => {
          geraComprovante(
            "saque",
            "R$ " + DADOS_DO_SAQUE.VALOR_LIQUIDO.toFixed(2)
          );
        }, 2000);
      }
    }, 2000);

    // valor_do_input = Intl.NumberFormat("pt-BR", {
    //   style: "currency",
    //   currency: "BRL",
    // })
    //   .format(valor_do_input)
    //   .replace("R$", "")
    //   .trimStart();
  });
};

let SOMA_SAQUES_REALIZADOS = function () {
  let somaDeValores = 0;
  let historicoDeSaques =
    JSON.parse(localStorage.getItem("historicoSaque")) || [];

  historicoDeSaques.forEach((saques) => {
    somaDeValores += parseFloat(saques.VALOR_DO_SAQUE);
  });

  return somaDeValores;
};

//DEPOSITO
let funcaoDeposito = function () {
  let set = "espera";
  localStorage.setItem("confirma", JSON.stringify(set));

  ocultaBody();
  botaoVoltar();

  let RECUPERA_DADOS_USUARIO_DB = JSON.parse(localStorage.getItem("usuario"));

  let valorDoDeposito = document.querySelector(
    '[data-modal-deposito="valor-a-enviar"]'
  );

  let btnConfirmaDeposito = document.querySelector(
    '[data-modal-deposito="btn-de-confirmar"]'
  );

  btnConfirmaDeposito.addEventListener("click", function () {
    let valorDeposito = Number(valorDoDeposito.value);

    if (valorDeposito == "" || valorDeposito == "0.00") {
      throw new Error("Preencha o valor corretamente.");
    }

    let DADOS_DO_DEPOSITO = {
      ID_CLIENTE: RECUPERA_DADOS_USUARIO_DB.conta,
      DECRICAO: "Depósito efetuado no ATM".toUpperCase(),
      OPERACAO: "crédito".toUpperCase(),
      TAXA: "Sem taxa",
      VALOR_DEPOSITADO: valorDeposito.toFixed(2),
      DATA_DEPOSITO: dataFormatada(),
      VALOR_LIQUIDO: Number(valorDeposito),
    };

    console.log(DADOS_DO_DEPOSITO);

    modalConfirmacaoOperacoes();

    let segueFluxo = setInterval(() => {
      let verificaConfirma = JSON.parse(localStorage.getItem("confirma"));
      console.log(verificaConfirma);

      if (verificaConfirma === true) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        flashMsg("Deposito Feito com sucesso.", "sucesso");
        clearInterval(segueFluxo);

        let historicoDeposito =
          JSON.parse(localStorage.getItem("historicoDeposito")) || [];
        historicoDeposito.push(DADOS_DO_DEPOSITO);

        localStorage.setItem(
          "historicoDeposito",
          JSON.stringify(historicoDeposito)
        );

        geraExtrato(
          dataFormatada(),
          DADOS_DO_DEPOSITO.DECRICAO,
          DADOS_DO_DEPOSITO.OPERACAO,
          DADOS_DO_DEPOSITO.VALOR_LIQUIDO
        );

        geraComprovante("deposito", valorDeposito.toFixed(2));
        historicoDeSaldoPorOperacoes(valorDeposito);
      }
    }, 2000);
  });
};

let SOMA__DE_DEPOSITOS_REALIZADOS = function () {
  let valores = [];
  let soma_de_depositos = 0;

  let historicoDeDepositos =
    JSON.parse(localStorage.getItem("historicoDeposito")) || [];

  historicoDeDepositos.forEach((depositos) => {
    valores.push(depositos.VALOR_DEPOSITADO);
  });

  valores.forEach((depositos) => {
    soma_de_depositos += Number(depositos);
  });

  return soma_de_depositos;
};

//PIX
let funcaoPix = function () {
  let saldoInicial = 50;
  let set = "espera";
  localStorage.setItem("confirma", JSON.stringify(set));

  ocultaBody();
  botaoVoltar();

  let RECUPERA_DADOS_USUARIO_DB = JSON.parse(localStorage.getItem("usuario"));
  let regex_validation_email =
    /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
  let regex_cpf_cpng =
    /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
  let regex_celular = /^\+?\d{2}?\s*\(\d{2}\)?\s*\d{4,5}\-?\d{4}$/g;

  let destinatario = document.querySelector(
    '[data-modal-pix="destinatario-pix"]'
  );

  let botaoConfirma = document.querySelector(
    '[data-modal-pix="btn-de-confirmar"]'
  );

  let valorAEnviarPIx = document.querySelector(
    '[data-modal-pix="input-valor-a-enviar"]'
  );

  botaoConfirma.addEventListener("click", function () {
    let pix = destinatario.value;

    if (
      regex_validation_email.test(pix) === false &&
      regex_cpf_cpng.test(pix) === false &&
      regex_celular.test(pix) === false
    ) {
      throw new Error("dados inválidos");
    }

    if (saldoInicial < valorAEnviarPIx.value) {
      throw new Error("Sem saldo.");
    }

    let valorFormatado = parseFloat(valorAEnviarPIx.value);

    let DADOS_PIX = {
      ID_CLIENTE: RECUPERA_DADOS_USUARIO_DB.conta,
      NOME: "",
      CHAVE_PIX: "",
      TIPO_PIX: "VERIFICANDO..." || "tipo não encontrado",
      VALOR_DO_PIX: "",
      DATA: dataFormatada(),
      DESCRICAO: "ENVIO DE PIX",
      TIPO: "DÉBITO",
    };

    if (regex_validation_email.test(pix) === true) DADOS_PIX.TIPO_PIX = "EMAIL";
    if (regex_cpf_cpng.test(pix) === true || pix.length === 11)
      DADOS_PIX.TIPO_PIX = "CPF";
    if (regex_cpf_cpng.test(pix) === true) DADOS_PIX.TIPO_PIX = "CPF";
    if (regex_celular.test(pix) === true) DADOS_PIX.TIPO_PIX = "CELULAR";

    DADOS_PIX.NOME = "DESTINATÁRIO CENSURADO PELO MINISTRO CARECA";
    DADOS_PIX.CHAVE_PIX = pix;
    DADOS_PIX.VALOR_DO_PIX = valorFormatado.toFixed(2);

    console.log(DADOS_PIX);

    modalConfirmacaoOperacoes();

    let segueFluxo = setInterval(() => {
      let verificaConfirma = JSON.parse(localStorage.getItem("confirma"));

      if (verificaConfirma === true) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        flashMsg("Pix enviado com sucesso.", "sucesso");
        clearInterval(segueFluxo);

        let historicoPix =
          JSON.parse(localStorage.getItem("historicoPix")) || [];
        historicoPix.push(DADOS_PIX);
        localStorage.setItem("historicoPix", JSON.stringify(historicoPix));
        console.log("pix enviado...");

        geraExtrato(
          dataFormatada(),
          DADOS_PIX.DESCRICAO,
          DADOS_PIX.TIPO,
          DADOS_PIX.VALOR_DO_PIX
        );

        geraComprovante("pix", DADOS_PIX.VALOR_DO_PIX, DADOS_PIX);
      }
    }, 1500);
  });
};

let SOMA_PIX_REALIZADOS = function () {
  let somaDeValores = 0;
  let historicoDePix = JSON.parse(localStorage.getItem("historicoPix")) || [];

  historicoDePix.forEach((pix) => {
    somaDeValores += parseFloat(pix.VALOR_DO_PIX);
  });

  return somaDeValores;
};

//PAGAMENTO
let funcaoPagamento = function () {
  let saldoInicial = SaldoInicial;
  let set = "espera";
  localStorage.setItem("confirma", JSON.stringify(set));

  ocultaBody();
  botaoVoltar();

  let RECUPERA_DADOS_USUARIO_DB = JSON.parse(localStorage.getItem("usuario"));
  let elementosPagamentos = document.querySelectorAll("[data-modal-pagamento]");
  let btn_confirma_pagamento = document.querySelector(
    '[data-modal-pagamento="btn-de-confirmar"]'
  );

  btn_confirma_pagamento.addEventListener("click", function () {
    if (saldoInicial < elementosPagamentos[1].value) {
      throw new Error(
        "Saldo insuficiente para efetuar pagamentos, realize um deposito antes."
      );
    }

    if (!elementosPagamentos[2].value) {
      throw new Error("Campo da DATA incorreto");
    }

    if (
      elementosPagamentos[1].value == "" ||
      elementosPagamentos[1].value == "0"
    ) {
      throw new Error("Preencha o campo VALOR Corretamente");
    }

    let DADOS_DO_PAGAMENTO = {
      ID_CLIENTE: RECUPERA_DADOS_USUARIO_DB.conta,
      BENEFICIARIO: "PEDRO C DE FREITAS",
      COD_BARRAS: elementosPagamentos[0].value,
      DESCRICAO: "PAGAMENTO DE TÍTULOS",
      TIPO_DE_OPERACAO: "DÉBITO",
      VALOR_DO_PAGAMENTO: parseFloat(elementosPagamentos[1].value),
      DATA_DO_PAGAMENTO: elementosPagamentos[2].value,
    };

    modalConfirmacaoOperacoes();

    let segueFluxo = setInterval(() => {
      let verificaConfirma = JSON.parse(localStorage.getItem("confirma"));
      console.log(verificaConfirma);

      if (verificaConfirma === true) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        // flashMsg("Pagamento Feito com sucesso.", "sucesso");
        clearInterval(segueFluxo);

        let historicoPagamento =
          JSON.parse(localStorage.getItem("historicoPagamento")) || [];
        historicoPagamento.push(DADOS_DO_PAGAMENTO);

        localStorage.setItem(
          "historicoPagamento",
          JSON.stringify(historicoPagamento)
        );

        geraExtrato(
          dataFormatada(),
          DADOS_DO_PAGAMENTO.DESCRICAO,
          DADOS_DO_PAGAMENTO.TIPO_DE_OPERACAO,
          DADOS_DO_PAGAMENTO.VALOR_DO_PAGAMENTO
        );

        geraComprovante("pagamento", DADOS_DO_PAGAMENTO.VALOR_DO_PAGAMENTO);
      }
    }, 1300);
  });
};

let SOMA_TODOS_PAGAMENTOS = function () {
  let somaDeValores = 0;
  let historicopPagamento =
    JSON.parse(localStorage.getItem("historicoPagamento")) || [];

  historicopPagamento.forEach((pagamentos) => {
    somaDeValores += parseFloat(pagamentos.VALOR_DO_PAGAMENTO);
  });

  return somaDeValores;
};

let EXIBE_EXTRATO_AO_CLIENTE = function () {
  ocultaBody();
  botaoVoltar();

  let DADOS_DO_EXTRATO = JSON.parse(localStorage.getItem("historicoExtrato"));

  let CONTAINER = document.querySelector(".container-dados-do-extrato");

  console.log(DADOS_DO_EXTRATO);

  for (let i = 0; i < DADOS_DO_EXTRATO.length; i++) {

    let dadosDoSaldo = JSON.parse(localStorage.getItem("historicoSaldos"));
    console.log(dadosDoSaldo);

    let div_container = document.createElement("div");
    div_container.setAttribute("class", "container-valores");

    let div_conteudo_do_extrato = document.createElement("div");
    div_conteudo_do_extrato.setAttribute("class", "descricao-dos-valores");

    let div_saldo = document.createElement("div");
    div_saldo.setAttribute("class", "saldo-extrato");
    // div_saldo.textContent = "R$ " + dadosDoSaldo[i]

    let p_data = document.createElement("p");
    p_data.textContent = DADOS_DO_EXTRATO[i].DATA;

    let p_desc = document.createElement("p");
    p_desc.textContent = DADOS_DO_EXTRATO[i].DESCRICAO;

    let p_tipo = document.createElement("p");
    p_tipo.textContent = DADOS_DO_EXTRATO[i].TIPO_OPERACAO;

    let h5 = document.createElement("h5");
    h5.textContent =" R$ " + Number(DADOS_DO_EXTRATO[i].VALOR).toFixed(2).replaceAll('.', ',');

    if( DADOS_DO_EXTRATO[i].TIPO_OPERACAO == 'DÉBITO'){
      p_tipo.setAttribute('class', 'debito_valores')
      h5.setAttribute('class', 'debito_valores')
    }

    if( DADOS_DO_EXTRATO[i].TIPO_OPERACAO == 'SAQUE'){
      p_tipo.setAttribute('class', 'SAQUE_VALORES')
      h5.setAttribute('class', 'SAQUE_VALORES')
    }

    if( DADOS_DO_EXTRATO[i].TIPO_OPERACAO == 'CRÉDITO'){
      p_tipo.setAttribute('class', 'CREDITO_VALORES')
      h5.setAttribute('class', 'CREDITO_VALORES')
    }
    
    
    
    h5.setAttribute("class", "valor-do-movimento");

    div_container.append(div_conteudo_do_extrato, div_saldo);
    div_conteudo_do_extrato.append(p_data, p_desc, p_tipo, h5);

    console.log(div_container);
    CONTAINER.append(div_container);
  }

  // for (let i = 0; i < DADOS_DO_EXTRATO.length; i++) {
  //   let div = document.createElement("div");
  //   let p_data = document.createElement("p");
  //   p_data.innerHTML = DADOS_DO_EXTRATO[i].DATA;

  //   let p_descricao = document.createElement("p");
  //   p_descricao.innerHTML = DADOS_DO_EXTRATO[i].DESCRICAO;

  //   let p_operacao = document.createElement("p");
  //   p_operacao.innerHTML = DADOS_DO_EXTRATO[i].TIPO_OPERACAO;

  //   let p_valor = document.createElement("p");
  //   p_valor.innerHTML = parseFloat(DADOS_DO_EXTRATO[i].VALOR).toLocaleString(
  //     "pt-br",
  //     { style: "currency", currency: "BRL" }
  //   );

  //   div.setAttribute("class", "formatacao-texto-extrato");
  //   div.append(p_data, p_descricao, p_operacao, p_valor);
  //   CONTAINER.append(div);
  // }
};

let pix = SOMA_PIX_REALIZADOS();
let saqes = SOMA_SAQUES_REALIZADOS();
let depositos = SOMA__DE_DEPOSITOS_REALIZADOS();
let pagamentos = SOMA_TODOS_PAGAMENTOS();

SaldoInicial = depositos - (saqes + pagamentos + pix);

console.log({
  pix,
  saqes,
  depositos,
  pagamentos,
});

console.log(SaldoInicial);
//Inicio das funções - NÃO APAGUE.

funcaoSaudacao();
exibeCard();
saudacaoInicial();
capturaLinksMenuPrincipal();
ATUALIZA_DADOS_CLIENTE_CABECALHO();
