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
function filtrarTabela() {
    const termo = document.getElementById("busca").value.toLowerCase();
    const linhas = document.querySelectorAll("#tabela-registros tr");
   
  
    linhas.forEach(linha => {
        const colMatricula = linha.children[0]?.textContent.toLowerCase() || "";
        const colDisciplina = linha.children[1]?.textContent.toLowerCase() || "";
        const colTipo = linha.children[2]?.textContent.toLowerCase() || "";
        const colValor = linha.children[3]?.textContent.toLowerCase() || "";





      const corresponde = colMatricula.includes(termo) || colDisciplina.includes(termo) || colTipo.includes(termo) || colValor.includes(termo); 
      linha.style.display = corresponde ? "" : "none";
    });
  }