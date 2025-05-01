// Seleciona todos os botões "Editar"
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
// Função para capturar dados do formulário e inserir na tabela
document.getElementById("inserirBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos campos do formulário
    const curso = document.querySelector("select[name='curso']").value;
    const professor = document.querySelector("select[name='professor']").value;
    const codTurma = document.querySelector("input[name='codTurma']").value;
    const disciplina = document.querySelector("input[name='disciplina']").value;
    const sala = document.querySelector("input[name='sala']").value;

    // Valida se todos os campos foram preenchidos
    if (curso && professor && codTurma && disciplina && sala) {
        // Cria uma nova linha na tabela
        const tabela = document.querySelector("table tbody");
        const novaLinha = document.createElement("tr");

        // Cria as células da nova linha
        novaLinha.innerHTML = `
            <td>${codTurma}</td>
            <td>${disciplina}</td>
            <td>${professor}</td>
            <td>${sala}</td>
            <td><button class="btn-editar">Editar</button></td>
        `;

        // Adiciona a nova linha à tabela
        tabela.appendChild(novaLinha);

        // Limpa os campos do formulário após a inserção
        document.querySelector("select[name='curso']").value = "";
        document.querySelector("select[name='professor']").value = "";
        document.querySelector("input[name='codTurma']").value = "";
        document.querySelector("input[name='disciplina']").value = "";
        document.querySelector("input[name='sala']").value = "";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});



function filtrarTabela() {
    const termo = document.getElementById("busca").value.toLowerCase();
    const linhas = document.querySelectorAll("#tabela-registros tr");
   
  
    linhas.forEach(linha => {
        const colTurma = linha.children[0]?.textContent.toLowerCase() || "";
        const colDisciplina = linha.children[1]?.textContent.toLowerCase() || "";
        const colProf = linha.children[2]?.textContent.toLowerCase() || "";
        const colSala = linha.children[3]?.textContent.toLowerCase() || "";





      const corresponde = colTurma.includes(termo) || colDisciplina.includes(termo) || colProf.includes(termo) || colSala.includes(termo); 
      linha.style.display = corresponde ? "" : "none";
    });
  }