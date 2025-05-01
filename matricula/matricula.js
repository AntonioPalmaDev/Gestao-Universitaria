const cursosCadastrados = ["Administração", "ADS", "Direito"];

const gradesCadastradas = [
  {
    id: "ADS-2024",
    curso: "ADS",
    disciplinas: ["Lógica", "POO", "Banco de Dados"]
  },
  {
    id: "ADM-2024",
    curso: "Administração",
    disciplinas: ["Contabilidade", "Marketing", "RH"]
  }
];
function carregarCursos() {
    const cursoSelect = document.getElementById("cursoMat");
    cursosCadastrados.forEach(curso => {
      const opt = document.createElement("option");
      opt.value = curso;
      opt.textContent = curso;
      cursoSelect.appendChild(opt);
    });
    window.onload = function() {
        carregarCursos();
      };
      
  }
  
  function carregarGradesMatricula() {
    const cursoSelecionado = document.getElementById("cursoMat").value;
    const selectGrade = document.getElementById("gradeMat");
    selectGrade.innerHTML = "<option value=''>Selecione a grade</option>";
  
    const gradesFiltradas = gradesCadastradas.filter(grade => grade.curso === cursoSelecionado);
  
    gradesFiltradas.forEach(grade => {
      const opt = document.createElement("option");
      opt.value = grade.id;
      opt.textContent = grade.id;
      selectGrade.appendChild(opt);
    });
  
    document.getElementById("lista-disciplinas-mat").innerHTML = "";
  }
  
  function carregarDisciplinasMatricula() {
    const gradeSelecionada = document.getElementById("gradeMat").value;
    const lista = document.getElementById("lista-disciplinas-mat");
    lista.innerHTML = "";
  
    const grade = gradesCadastradas.find(g => g.id === gradeSelecionada);
    if (grade) {
      grade.disciplinas.forEach(disc => {
        const li = document.createElement("li");
        li.textContent = disc;
        lista.appendChild(li);
      });
    }
  }
  
  function inserirMatricula() {
    const matricula = document.getElementById("matriculaAluno").value.trim();
  
    // Buscar nome do aluno baseado na matrícula
    const alunoEncontrado = alunosCadastrados.find(a => a.matricula === matricula);
  
    if (!alunoEncontrado) {
      alert("Aluno não encontrado para essa matrícula.");
      return;
    }
  
    const nome = alunoEncontrado.nome;
  
    const curso = document.getElementById("cursoMat").value;
    const grade = document.getElementById("gradeMat").value;
    const semestre = document.getElementById("semestreMat").value;
  
    const disciplinas = Array.from(document.querySelectorAll("#lista-disciplinas-mat li"))
                             .map(li => li.textContent);
  
    // Inserir na tabela
    const tabela = document.getElementById("tabela-matriculas");
    const linha = document.createElement("tr");
  
    linha.innerHTML = `
      <td>${nome}</td>
      <td>${matricula}</td>
      <td>${curso}</td>
      <td>${grade}</td>
      <td>${semestre}</td>
      <td>${disciplinas.join(", ")}</td>
    `;
  
    tabela.appendChild(linha);
  
    // Limpar formulário
    document.getElementById("matriculaAluno").value = "";
    document.getElementById("cursoMat").value = "";
    document.getElementById("gradeMat").value = "";
    document.getElementById("semestreMat").value = "";
    document.getElementById("lista-disciplinas-mat").innerHTML = "";
  }
  
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
      const colNome= linha.children[1]?.textContent.toLowerCase() || "";
      const colCurso = linha.children[2]?.textContent.toLowerCase() || "";
      const colGrade = linha.children[3]?.textContent.toLowerCase() || "";
      const colSemestre = linha.children[4]?.textContent.toLowerCase() || "";





    const corresponde = colMatricula.includes(termo) || colNome.includes(termo) || colCurso.includes(termo) || 
    colGrade.includes(termo) || colSemestre.includes(termo); 
    linha.style.display = corresponde ? "" : "none";
  });
}