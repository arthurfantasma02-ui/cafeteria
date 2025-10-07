// === 1️⃣ URL da API ===
// Sempre coloque o recurso (ex: "/clientes") no final da URL
const API = "https://crudcrud.com/api/596432d986b74e3f971c9ba8cb495649/clientes";

// === 2️⃣ Selecionar elementos do HTML ===
const form = document.getElementById("form");
const lista = document.getElementById("lista"); 

// === 3️⃣ Função para buscar e exibir clientes ===
async function listarClientes() {
  const resposta = await fetch(API);
  const dados = await resposta.json();

  // Limpa a lista antes de mostrar
  lista.innerHTML = "";

  // Cria os itens na tela
  dados.forEach((cliente) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="nome">${cliente.nome}</span>
      <span class="email">${cliente.email}</span>
      <button class="remover" data-id="${cliente._id}">X</button>
    `;
    lista.appendChild(li); // ✅ Importante! precisa adicionar na <ul>
  });
}

// === 4️⃣ Função para cadastrar cliente ===
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // impede o reload da página

  
  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();

  // Se os campos estiverem vazios, avisa
  if (!nome || !email) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoCliente = { nome, email };

  // Envia para a API (POST)
  const resposta = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoCliente),
  });

  if (resposta.ok) {
    form.reset(); // limpa o formulário
    listarClientes(); // atualiza a lista
  } else {
    alert("Erro ao adicionar cliente.");
  }
});

// === 5️⃣ Função para remover cliente (DELETE) ===
lista.addEventListener("click", async (event) => {
  if (event.target.classList.contains("remover")) {
    const id = event.target.getAttribute("data-id");

    const resposta = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (resposta.ok) {
      listarClientes(); // atualiza a lista
    } else {
      alert("Erro ao remover cliente.");
    }
  }
});

// === 6️⃣ Exibe clientes logo que a página abrir ===
listarClientes();
