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
  
  