let userDadosHtml = document.querySelectorAll('[data-perfil]')

(function(){
    atualizaDadosNaPagina()
    validaUsuarioAtivo()
})()



function validaUsuarioAtivo(){
    let infor = localStorage.getItem('User');

    if( infor == null ){
        window.location = "../../../criaConta.html"
    }
}


function recuperaUserLocalStorage(){
    let objSalvo = localStorage.getItem('User');
    return JSON.parse(objSalvo) 
}


function atualizaDadosNaPagina(){
   
    let dadosLocalStorege = recuperaUserLocalStorage()
    userDadosHtml[0].innerHTML = ''
    userDadosHtml[3].innerHTML = '0,00'
    userDadosHtml[4].innerHTML = ''

}








