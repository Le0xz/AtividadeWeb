//Elementos da tela de login

const formulario = document.getElementById("meuFormulario");
const telaLogin = document.getElementById("telaLogin");
const telaHome = document.getElementById("telaHome");
const mensagem = document.getElementById("mensagem");
const btnEntrar = document.getElementById("btnEntrar");
const btnSair = document.getElementById("btnSair");

//Elementos da Galeria

const telaLista = document.getElementById("telaLista");
const telaDetalhe = document.getElementById("telaDetalhe");
const listaFotos = document.getElementById("listaFotos");
const mensagemFotos = document.getElementById("mensagemFotos");
const tituloFoto = document.getElementById("tituloFoto");
const imagemGrande = document.getElementById("imagemGrande");
const btnVoltar = document.getElementById("btnVoltar");

//Endereços das Apis

const API_USUARIOS = "https://jsonplaceholder.typicode.com/users";
const API_FOTOS = "https://jsonplaceholder.typicode.com/photos";

//Quantidade inicial de fotos
const LIMITE_FOTOS = 20;

//Guarda as fotos recebidas da API
let fotos = [];

//LOGIN

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();
    const usuarioDigitado = document.getElementById("usuario").value.trim();
    const senhaDigitada = document.getElementById("senha").value.trim();

// Verificar campos vazios
    if (!usuarioDigitado || !senhaDigitada) {
        mensagem.innerHTML = `
            <div class="alert alert-warning"> Preencha o usuário e a senha! </div> `;
        return;
    }

        btnEntrar.disabled = true;
        btnEntrar.textContent = "Verificando...";
        mensagem.innerHTML = "";

        try {
//Consultar API de usuários
        const resposta = await fetch(API_USUARIOS);
            if (!resposta.ok) {
            throw new Error("Erro ao consultar usuários.");
        }

        const usuarios = await resposta.json();
//Verificar usuário e senha
        const usuarioEncontrado = usuarios.find(function(usuario) {

            return usuario.username.toLowerCase() === usuarioDigitado.toLowerCase()
                && usuario.email.toLowerCase() === senhaDigitada.toLowerCase();

        });

//Se os dados estiverem corretos
        if (usuarioEncontrado) {
            mensagem.innerHTML = "";
            telaLogin.classList.add("d-none");
            telaHome.classList.remove("d-none");
//Carregar galeria
            carregarFotos();
        } else {
            mensagem.innerHTML = `
            <div class="alert alert-danger">
                Usuário ou senha incorretos!
            </div> `;
        }
    } catch (erro) {
             mensagem.innerHTML = `
            <div class="alert alert-danger">
                Erro ao realizar login. Verifique sua conexão!
            </div> `;

        console.error("Erro no login:", erro);
    } finally {
        btnEntrar.disabled = false;
        btnEntrar.textContent = "Entrar";
    }
});

//CARREGAR FOTOS DA API

async function carregarFotos() {
        telaLista.classList.remove("d-none");
        telaDetalhe.classList.add("d-none");
//Mensagem de carregamento
    mensagemFotos.innerHTML = `
        <div class="alert alert-info">
            Carregando fotos, aguarde...
        </div> `;
    listaFotos.innerHTML = "";

    try {
//Consultar API de fotos
        const resposta = await fetch(API_FOTOS);
        if (!resposta.ok) {
            throw new Error("Erro ao buscar fotos.");
        }
        const dados = await resposta.json();
//Limitar quantidade de fotos
        fotos = dados.slice(0, LIMITE_FOTOS);
        mensagemFotos.innerHTML = "";
// Criar lista de fotos
        fotos.forEach(function(foto) {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "list-group-item list-group-item-action d-flex align-items-center gap-3";
//Criar miniatura
            const miniatura = document.createElement("img");
            miniatura.src = foto.thumbnailUrl;
            miniatura.alt = "Miniatura da foto";
            miniatura.width = 32;
            miniatura.height = 32;
            miniatura.className = "miniatura";
//Criar título
            const titulo = document.createElement("span");
            titulo.textContent = foto.title;
//Adicionar elementos ao item
            item.appendChild(miniatura);
            item.appendChild(titulo);
//Abrir foto ao clicar
            item.addEventListener("click", function() {
                mostrarFoto(foto);
            });
//Adicionar item à lista
            listaFotos.appendChild(item);
        });
//Verificar se existem fotos
        if (fotos.length === 0) {
            mensagemFotos.innerHTML = `
                <div class="alert alert-warning">
                    Nenhuma foto encontrada.
                </div> `;
        }

    } catch (erro) {
//Mensagem de erro
        mensagemFotos.innerHTML = `
            <div class="alert alert-danger">
                Não foi possível carregar as fotos.
                <button type="button"
                    class="btn btn-sm btn-outline-danger ms-2"
                    id="btnTentarNovamente">
                    Tentar novamente
                </button>
            </div> `;
//Tentar carregar novamente
        document.getElementById("btnTentarNovamente")
            .addEventListener("click", carregarFotos);
        console.error("Erro ao carregar fotos:", erro);
    }
}

//MOSTRAR AS FOTO AMPLIADA

function mostrarFoto(foto) {
//Mostrar título completo
    tituloFoto.textContent = foto.title;
//Mostrar imagem original
    imagemGrande.src = foto.url;
    imagemGrande.alt = foto.title;
//Esconder lista
    telaLista.classList.add("d-none");
//Mostrar detalhes
    telaDetalhe.classList.remove("d-none");

}

//VOLTAR PARA A LISTA DE FOTOS

        btnVoltar.addEventListener("click", function() {
        telaDetalhe.classList.add("d-none");
        telaLista.classList.remove("d-none");

});


//SAIR E VOLTAR PARA O LOGIN

        btnSair.addEventListener("click", function() {
//Esconder galeria
        telaHome.classList.add("d-none");
//Mostrar login
        telaLogin.classList.remove("d-none");
//Limpar formulário
        formulario.reset();
//Limpar mensagens
        mensagem.innerHTML = "";
//Voltar para a lista
        telaDetalhe.classList.add("d-none");
        telaLista.classList.remove("d-none");
//Limpar foto ampliada
        tituloFoto.textContent = "";
        imagemGrande.src = "";
        imagemGrande.alt = "";

});
