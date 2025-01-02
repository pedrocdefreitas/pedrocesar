

let movimentacoesBancarias = [];
let saldoInicial = 0;

let tarifaBancarias = {
    tarifaSaque: 0.05
};


let data = function(){
    let data = new Date
    let dataFormatada =
    `${data.getDate()}/${data.getMonth()}/${data.getFullYear()} às ${data.getHours()}:${data.getMinutes()}`
    return dataFormatada
}

function GravaExtrato(data, descricao, valor, saldo){
    return{
        dataOperacao: data ,
        descricaoOperacao: descricao,
        valorOperacao: `R$ ${valor}`,
        saldoAtualizado: `R$ ${saldo}` 
    }
}

function depositoConta(valorDeposito){
    let valorDepositado = valorDeposito;
    saldoInicial += valorDeposito;

    movimentacoesBancarias.push(
        GravaExtrato(data(), 'Deposito em dinheiro', valorDeposito, saldoInicial ));

    return
}

export default function saqueConta(valorDoSaque){
    
    try{
        if( valorDoSaque > saldoInicial ){
            
            setTimeout( ()=>{
                window.location = "../../../paginaInicialPerfil.html"
           }, 2000)

            //Sempre use o Error para parar a execução...
            throw new Error("Você não tem saldo suficiente para esse saque!, Deseja contratar o serviço de atencipação de saque?")
           
        }


        let tarifaCobrada = valorDoSaque * tarifaBancarias.tarifaSaque;
        saldoInicial -= (valorDoSaque + tarifaCobrada);
        // let msg = `Saque realizado de ${valorDoSaque.toFixed(2)}. Tarifa de ${tarifaCobrada}. Saldo de: ${ saldoInicial}`;
        movimentacoesBancarias.push(GravaExtrato(data(), 'Saque de valores', valorDoSaque, saldoInicial));
        
    }catch{
        console.log('Sem saldo!')

      
       
        // let showerror = document.querySelector('.modal-main-drop .show-error')
        // showerror.innerHTML = 'Operação não realizada! por falta de saldo!'
        // showerror.style.color = 'red'
        // showerror.style.fontSize = '1.5rem'
    }
}

function enviarPix(contaDestino, valorAserEnviado){

    if(saldoInicial < valorAserEnviado){
        console.log('Você não tem saldo suficiente para enviar valores, deseja agendar?')
        return
    }

    saldoInicial -= valorAserEnviado;
    let msg = `Transferencia de ${valorAserEnviado} realizada para ${contaDestino}. Saldo de: ${ saldoInicial}`;
    movimentacoesBancarias.push( GravaExtrato( data(), msg, valorAserEnviado, saldoInicial ))

 

    return
}


//eu estava trabalhando no export da funcao sacar e no modal de saque...

