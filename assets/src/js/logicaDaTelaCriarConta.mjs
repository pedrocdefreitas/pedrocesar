
    function init () { 

        let direction = document.querySelector('.direction')
        let criarConta = document.querySelector('.criarConta')
        let tela = document.querySelector('.tela-1')
        let nome = document.querySelector('#nome')
        let email = document.querySelector('#email')
        let num = document.querySelector('#passSecret')
        paraEventoSubmit()

        let infor = localStorage.getItem('User');

        if( infor != null ){
            alert('já existe usuario para esse navegador...')
            direction.style.display = 'none'
            window.location = "../../../paginaInicialPerfil.html"
            return
        }

        
        function paraEventoSubmit(){

            let form = document.querySelectorAll('form')

            form.forEach( form => {
                form.addEventListener('submit', elemento =>{
                    elemento.preventDefault()
            })
            })
        }


        function salvaUserLocalStorage(user) {  
            localStorage.setItem('User', JSON.stringify(user));
        }

        function recuperaUserLocalStorage(){
            let objSalvo = localStorage.getItem('User');
            return objSalvo 
        }

        function avancaQuadro(el){
            if(!nome.value){
                alert('digite seu nome...')
                return
            }
    
            tela.style.marginLeft= '-100vw'
        }

        function criarContaV(el) {

            if(!nome.value || !email.value || !num.value ){
                alert('falta informar algum dado...')
                return
            }

            alert('Conta criada com sucesso e salvo do localStorage...')

            let date = new Date()
            let id = date.getDate() + '' + date.getMilliseconds()

            let user = {
                idUser: id,
                nome: nome.value,
                email: email.value,
                pass: num.value
            }
            console.log( user )

            salvaUserLocalStorage(user)

            window.location = "../../../paginaInicialPerfil.html"

    
        }
        
        direction.addEventListener('click', avancaQuadro)
        criarConta.addEventListener('click', criarContaV)
  
    }
    
init()
    
    