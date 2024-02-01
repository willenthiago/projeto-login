const btn = document.getElementById("btnlogin");
const email = document.getElementById('idlogin');
const senha = document.getElementById('idsenha');

btn.addEventListener("click", validar);
function validar(){
    if(email.value == ''){
        alert('Por favor digite um email!');
    } else {
    }
}