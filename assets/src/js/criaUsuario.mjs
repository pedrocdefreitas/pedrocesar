function criaUsuario(){

    let usuario_is = JSON.parse(localStorage.getItem('usuario'))
    console.log( usuario_is )

    if( usuario_is ){
        console.log('temos usuário por aqui...')
        window.location = '../../../paginaInicialPerfil.html'
    }
   

    window.document.addEventListener('submit', function (event) {  
        event.preventDefault()
    })

    const dadosUsuarios = document.getElementsByTagName('input')
    const btnCriaUsuario = document.getElementById('btnCriaUsuario')
    
    
    btnCriaUsuario.addEventListener('click', function(){

        let novoUsuario = {
            nome: dadosUsuarios[0].value,
            email: dadosUsuarios[1].value,
            hash: dadosUsuarios[2].value,
            atv: 'inativo',
            conta: geraNumeroConta(),
            agencia: '2025',
            dataCriação: dataformatada()
        }

        geraUsuarioNoDb(novoUsuario)
    })

    function dataformatada() {  
        date = new Date;
        let dataFormatada = Intl.DateTimeFormat('pt-BR').format(date)
        let dataAux = dataFormatada.replaceAll('/', '')
        return {
            dataFormatada,
            dataAux
        }
    }

    function geraNumeroConta(){
        let ag = '0001'
        let conta;

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }
        return conta = getRandomInt(4, 8) * dataformatada().dataAux
    }

    function geraUsuarioNoDb(dadosDoUsuario){

        if( !dadosDoUsuario == ""){
            localStorage.setItem('usuario', JSON.stringify(dadosDoUsuario))
            console.log('Usuário criado com sucesso!')
            setTimeout( function(){
                window.location = '../../../paginaInicialPerfil.html'
            }, 3000)
            
            loadingUsuario()
        }else{
            throw new Error('Algo não se saiu bem por aqui...')
        }

       
    }
}


criaUsuario()