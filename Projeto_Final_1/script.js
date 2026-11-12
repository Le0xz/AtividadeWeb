
const formulario = document.getElementById("meuFormulario");

const telaLogin = document.getElementById("telaLogin");
const telaHome = document.getElementById("telaHome");

const mensagem = document.getElementById("mensagem");

const btnSair = document.getElementById("btnSair");


// FUNÇÃO PARA FAZER LOGIN
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const checkbox = document.getElementById("checkbox").checked;

    // Validar senha
    if (senha.length < 6) {
        mensagem.innerHTML = `
            <div class="alert alert-danger">
                A senha deve ter pelo menos 6 caracteres!
            </div>
        `;
        return;
    }

    // Validar checkbox
    if (!checkbox) {
        mensagem.innerHTML = `
            <div class="alert alert-warning">
                Marque a caixa de confirmação!
            </div>
        `;
        return;
    }

    // Esconder login
    telaLogin.classList.add("d-none");

    // Mostrar página inicial
    telaHome.classList.remove("d-none");

});


// FUNÇÃO PARA SAIR
btnSair.addEventListener("click", function() {

    // Esconder página inicial
    telaHome.classList.add("d-none");

    // Mostrar login
    telaLogin.classList.remove("d-none");

    // Limpar formulário
    formulario.reset();

    // Limpar mensagens
    mensagem.innerHTML = "";

});
