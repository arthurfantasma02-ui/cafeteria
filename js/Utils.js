// js/utils.js

export const API = "https://crudcrud.com/api/596432d986b74e3f971c9ba8cb495649/clientes";

// Função para buscar todos os clientes
export async function getClientes() {
  const resposta = await fetch(API);
  return resposta.json();
}

// Função para adicionar cliente
export async function postCliente(cliente) {
  return fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
}

// Função para deletar cliente
export async function deleteCliente(id) {
  return fetch(`${API}/${id}`, {
    method: "DELETE",
  });
}
