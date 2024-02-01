const sair = document.getElementById('sair');

let userLogado = JSON.parse(localStorage.getItem('userLogado'));

let logado = document.getElementById('saudacao');



if(localStorage.getItem('token') == null){
    alert('Você precisa estar logado para acessar a página!');
    location.href = 'index.html';
}

function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    location.href='index.html';
}

logado.innerText = `Olá, ${userLogado.nome}! Seja bem-vindo ao seu Dashboard.`;

sair.addEventListener('click', logout)