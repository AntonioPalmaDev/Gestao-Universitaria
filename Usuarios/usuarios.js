
async function cadastrarUsuario() {
  const nome = document.querySelector('#campo-nome').value;
  const tipo = document.querySelector('#campo-tipo').value;

  const resposta = await fetch('/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, tipo })
  });

  if (resposta.ok) {
    document.querySelector('#campo-nome').value = '';
    atualizarTabela();
  }
}




async function atualizarTabela() {
  const res = await fetch('/usuarios');
  const usuarios = await res.json();

  const tabela = document.querySelector('#tabela-usuarios');
  tabela.innerHTML = '';

  usuarios.forEach(usuario => {
    const linha = `<tr>
      <td>${usuario.matricula}</td>
      <td>${usuario.nome}</td>
      <td>${usuario.tipo}</td>
    </tr>`;
    tabela.innerHTML += linha;
  });
}

// Carrega tabela ao iniciar
document.addEventListener('DOMContentLoaded', atualizarTabela);

const botoesEditar = document.querySelectorAll('.btn-editar');
botoesEditar.forEach(botao => {
  botao.addEventListener('click', () => {
      const linha = botao.parentElement.parentElement; // Linha <tr> do botão
      const colunas = linha.querySelectorAll('td');

      if (botao.textContent === "Editar") {
          // Transformar células em inputs
          for (let i = 0; i < colunas.length - 1; i++) { // ignora a última coluna (botão)
              const textoAtual = colunas[i].textContent;
              colunas[i].innerHTML = `<input type="text" value="${textoAtual}" style="width: 100%; padding: 5px;">`;
          }
          botao.textContent = "Salvar";
          botao.style.backgroundColor = "#4CAF50"; // Verde para salvar

          // Criar botão de lixeira
          const botaoLixeira = document.createElement('button');
          botaoLixeira.innerHTML = "🗑️";
          botaoLixeira.classList.add('btn-lixeira');
          botaoLixeira.style.marginLeft = '8px';
          botao.parentElement.appendChild(botaoLixeira);

          // Evento de click na lixeira para excluir a linha
          botaoLixeira.addEventListener('click', () => {
              linha.remove();
          });

      } else {
          // Salvar os novos valores
          for (let i = 0; i < colunas.length - 1; i++) {
              const input = colunas[i].querySelector('input');
              colunas[i].textContent = input.value;
          }
          botao.textContent = "Editar";
          botao.style.backgroundColor = "black"; // Volta cor original

          // Remover botão da lixeira
          const botaoLixeira = linha.querySelector('.btn-lixeira');
          if (botaoLixeira) {
              botaoLixeira.remove();
          }
      }
  });
});