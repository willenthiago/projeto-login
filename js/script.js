const btnCad = document.getElementById("btnCadastro");
const btnLog = document.getElementById('btnLogin');
const newNome = document.getElementById('idNome');
const newEmail = document.getElementById('idlogin-cadastro');
const newSenha = document.getElementById('idsenha-cadastro');
const confirmNewSenha = document.getElementById('idConfirma-senha');
const email = document.getElementById('idlogin');
const senha = document.getElementById('idsenha');
const campoNome = document.getElementById('campo-nome');
const campoEmail = document.getElementById('campo-email');
const campoNewSenha = document.getElementById('campo-novaSenha');
const campoConfirmaSenha = document.getElementById('campo-confirmaSenha');
const pagCadastro = document.getElementById('pag-cadastro');
const pagLogin = document.getElementById('pag-login');
const tipoForm1 = document.getElementById('formulario-login');
const tipoForm2 = document.getElementById('formulario-cadastro');
const imagem = document.getElementById('imagem');

// variáveis de controle das funções de validação dos campos

let validName = false;
let validSenha = false;
let validEmail = false;
let validConfirm = false;

newNome.addEventListener('keyup', validaNome);
newEmail.addEventListener('keyup', validaEmail);
newSenha.addEventListener('keyup', validaSenha);
confirmNewSenha.addEventListener('keyup', validaConfirmaSenha);

// função pra validação do campo Nome

function validaNome(){
    if(newNome.value.length == 0){
        campoNome.setAttribute('style','background-color: #ff4100');
        newNome.placeholder='Digite um nome!'
        validName = false;
    } else {
        campoNome.setAttribute('style','background-color: #06ff06');
        validName = true;
    }
}

// função de validação do campo email

function validaEmail(){
    if(newEmail.value.length == 0){
        campoEmail.setAttribute('style','background-color: #ff4100');
        newEmail.placeholder='Digite um email!'
        validEmail = false;
    } else {
        campoEmail.setAttribute('style','background-color: #06ff06');
        validEmail = true;
    }
}


// função de validação do campo nova senha


function validaSenha(){
    const label = document.getElementById('label-nova-senha');
    if(newSenha.value.length == 0){
        campoNewSenha.setAttribute('style','background-color: #ff4100');
        newSenha.placeholder='Digite uma senha!'
        validSenha = false
    } else if(newSenha.value.length <= 7){
        campoNewSenha.setAttribute('style','background-color: #ff4100');
        label.innerText='Sua senha deve ter 8 caracteres';
        validSenha
    } else {
        campoNewSenha.setAttribute('style','background-color: #41ff00');
        label.innerText='Nova senha: '
        validSenha = true;
    }
}


// função de validação do campo confirma senha
 

function validaConfirmaSenha(){
    const label = document.getElementById('label-confirma-senha');
    if(confirmNewSenha.value.length == 0){
        campoConfirmaSenha.setAttribute('style','background-color: #ff4100');
        confirmNewSenha.placeholder='Confirme sua senha!';
        validConfirm = false;
    } else if(confirmNewSenha.value !== newSenha.value){
        campoConfirmaSenha.setAttribute('style','background-color: #ff4100');
        label.innerText = 'Senhas não conferem!'
        validConfirm = false;
    } else {
        campoConfirmaSenha.setAttribute('style','background-color: #41ff00');
        label.innerText = 'Confirma senha'
        validConfirm = true;
    }
}

/**
 * função que valida o formulário de cadastro
 * com verificação simples
 * de campo preenchido e igualdade de senha. 
 */

function validarCadastro(){
    if(validName && validEmail && validSenha && validConfirm){

        /**
         * declaração de variável para armazenar dados localmente usando
         * local storage
         */

        let listUser = JSON.parse(localStorage.getItem('listUser') || '[]')

        // inserção dos dados no objeto 

        listUser.push(
            {
                user: newNome.value,
                userEmail: newEmail.value,
                senhaUser: newSenha.value
            }
        )

        //inserção do objeto no localstorage

        localStorage.setItem('listUser', JSON.stringify(listUser));

        setTimeout(()=>{
            /**
             * quantidade de milisegundos que vai aguardar 
             * pra carregar a página
             */

            location.href='index.html'
        },3000) 

        btnCad.innerText = 'Cadastrando...'
        btnCad.setAttribute('style', 'background-color: #00ff00');
    } else {
        alert('Preencha todos os dados corretamente!');
    }
}

// função de validação do formulário de login

function validaLogin(){
    let listaUser = []; //lista que vai receber o objeto no localstorage

    let userValid = {
        nome: '',
        email: '',
        senha: ''
    }

    // acessar a lista de usuarios cadastrados no localstorage 

    listaUser = JSON.parse(localStorage.getItem('listUser'));  

    listaUser.forEach((item) => {
        if(email.value === item.userEmail && senha.value === item.senhaUser){
            userValid = {
                nome: item.user,
                email: item.userEmail,
                senha: item.senhaUser
            }
        }
    })

    if(email.value === userValid.email && senha.value === userValid.senha){
        location.href = 'welcome.html';

        // token para validação da sessão

        let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
        localStorage.setItem('token', token);

        localStorage.setItem('userLogado', JSON.stringify(userValid));

    } else {
        alert('Usuário ou senha incorretos');
        document.getElementById('idlogin').value = '';
        document.getElementById('idsenha').value = '';
        email.focus();
    }

}

/**
 *  função sair para finalizar sessão e apagar token de validação da sessão
 */



//criar variavel de controle pra posição da imagem no formulario
// se estiver no formulario de cadastro ou formulario de login

let form = 0;

function mudaForm(){
    if(form == 0){
        imagem.style.position='absolute';
        tipoForm1.style.display='none';
        tipoForm2.style.display='block';
        form = 1;
    } else {
        imagem.style.position='relative';
        tipoForm1.style.display='block';
        tipoForm2.style.display='none';
        form = 0;
    }
}

btnLog.addEventListener('click', validaLogin);
btnCad.addEventListener("click", validarCadastro);
pagCadastro.addEventListener('click', mudaForm);
pagLogin.addEventListener('click', mudaForm);
