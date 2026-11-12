
document.getElementById("meuFormulario")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let email = document.getElementById("exampleInputEmail1").value;
    let senha = document.getElementById("exampleInputPassword1").value;
    let checkbox = document.getElementById("exampleCheck1").checked;

    let mensagem = document.getElementById("mensagem");

    // Verificar tamanho da senha
    if (senha.length < 6) {
        mensagem.innerHTML =
            '<div class="alert alert-danger">A senha deve ter pelo menos 6 caracteres!</div>';
        return;
    }

    // Verificar checkbox
    if (!checkbox) {
        mensagem.innerHTML =
            '<div class="alert alert-warning">Marque a caixa de confirmação!</div>';
        return;
    }

    // Mensagem de sucesso
    mensagem.innerHTML =
        '<div class="alert alert-success">Formulário enviado com sucesso!</div>';

    console.log("Email:", email);
    console.log("Senha validada!");

});
