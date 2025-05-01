
  
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


  let disciplinasTemp = [];

function adicionarDisciplina() {
    const disciplinaInput = document.getElementById("disciplina");
    const disciplina = disciplinaInput.value.trim();
  
    if (!disciplina) {
      alert("Digite uma disciplina antes de adicionar.");
      return;
    }
  
    // Normaliza: remove espaços e deixa minúsculo
    const disciplinaNormalizada = disciplina.replace(/\s+/g, "").toLowerCase();
  
    const existe = disciplinasTemp.some(d =>
      d.replace(/\s+/g, "").toLowerCase() === disciplinaNormalizada
    );
  
    if (existe) {
      alert("Essa disciplina já foi adicionada (mesmo com variação de espaço ou letra).");
      return;
    }
  
    disciplinasTemp.push(disciplina);
    atualizarListaDisciplinas();
    disciplinaInput.value = "";
  }linaInput.value = "";
  

function atualizarListaDisciplinas() {
  const lista = document.getElementById("lista-disciplinas");
  lista.innerHTML = "";
  disciplinasTemp.forEach((disc, index) => {
    const li = document.createElement("li");
    li.textContent = disc;
    lista.appendChild(li);
  });
}

function inserirGrade() {
  const identificacao = document.getElementById("identificacao").value.trim();
  const curso = document.getElementById("curso").value.trim();

  if (!identificacao || !curso || disciplinasTemp.length === 0) {
    alert("Preencha todos os campos e adicione pelo menos uma disciplina!");
    return;
  }

  const tabela = document.getElementById("tabela-corpo");
  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
    <td>${identificacao}</td>
    <td>${curso}</td>
    <td>${disciplinasTemp.join(", ")}</td>
    
  `;
  tabela.appendChild(novaLinha);

  // Limpa os dados
  document.getElementById("identificacao").value = "";
  document.getElementById("curso").value = "";
  disciplinasTemp = [];
  atualizarListaDisciplinas();
}
function filtrarTabela() {
    const termo = document.getElementById("busca").value.toLowerCase();
    const linhas = document.querySelectorAll("#tabela-corpo tr");
  
    linhas.forEach(linha => {
      const colGrade = linha.children[0]?.textContent.toLowerCase() || "";
      const colCurso = linha.children[1]?.textContent.toLowerCase() || "";
  
      const corresponde = colGrade.includes(termo) || colCurso.includes(termo);
      linha.style.display = corresponde ? "" : "none";
    });
  }