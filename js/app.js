// js/app.js
import { Cliente } from "./classes.js";
import { getClientes, postCliente, deleteCliente } from "./Utils.js";

const form = document.getElementById("form");
const lista = document.getElementById("lista");

// === Função para listar clientes na tela ===
async function listarClientes() {
  const dados = await getClientes();

  // Programação funcional: usando map() para gerar o HTML
  lista.innerHTML = dados
    .map(
      (cliente) => `
      <li>
        <span class="nome">${cliente.nome}</span>
        <span class="email">${cliente.email}</span>
        <button class="remover" data-id="${cliente._id}">X</button>
      </li>
    `
    )
    .join(""); // junta tudo numa string única
}

// === Evento de envio do formulário ===
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();

  if (!nome || !email) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoCliente = new Cliente(nome, email); // POO aplicada
  const resposta = await postCliente(novoCliente);

  if (resposta.ok) {
    form.reset();
    listarClientes();
  } else {
    alert("Erro ao adicionar cliente.");
  }
});

// === Evento para remover cliente ===
lista.addEventListener("click", async (event) => {
  if (event.target.classList.contains("remover")) {
    const id = event.target.dataset.id;
    const resposta = await deleteCliente(id);

    if (resposta.ok) {
      listarClientes();
    } else {
      alert("Erro ao remover cliente.");
    }
  }
});

// === Inicializa a lista quando a página carrega ===
listarClientes();
