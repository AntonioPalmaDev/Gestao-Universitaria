# 🎓 Sistema de Gestão Universitária

Uma aplicação web simples e funcional para administração acadêmica de instituições de ensino superior. Voltada para uso administrativo interno, permite o controle eficiente de alunos, professores, cursos, grades curriculares, matrículas, faltas e notas.

## ⚙️ Funcionalidades

- **Cadastro de Alunos e Professores**  
  Registro completo de dados acadêmicos e pessoais dos envolvidos.

- **Gestão de Turmas**  
  Criação e organização de turmas vinculadas a cursos, sem controle por período letivo.

- **Gestão de Grades Curriculares**  
  Cadastro de grades curriculares associadas a cursos e semestres, com definição de disciplinas por semestre.

- **Gestão de Matrículas**  
  Matrícula de alunos em cursos, com base na grade curricular e no semestre correspondente (sem rematrícula).

- **Gestão de Faltas e Notas**  
  Registro de presenças, ausências e notas por disciplina, de forma prática e centralizada.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 e JavaScript puro (Vanilla JS)  
- **Backend:** Node.js com Express *(ou substitua pela linguagem/framework usado)*  
- **Banco de Dados:** PostgreSQL / MySQL *(ajuste conforme seu uso)*  
- **Outros:** Docker (opcional), Sequelize (caso use ORM)

> 🔐 *Este sistema é voltado para uso administrativo e não possui autenticação.*

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js  
- Banco de dados (PostgreSQL ou MySQL)  
- Docker e Docker Compose (opcional)

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

### Instalando e Executando

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

Abra o arquivo `index.html` localizado na pasta `frontend` diretamente no navegador ou configure um servidor local simples (ex: Live Server no VSCode).

## 📄 Documentação da API

Caso tenha documentado com Swagger ou similar, disponibilize aqui:

```
http://localhost:5000/api-docs
```

## 🧑‍💻 Contribuições

Contribuições são bem-vindas!  

1. Faça um fork do projeto  
2. Crie uma branch: `git checkout -b minha-feature`  
3. Commit: `git commit -m 'feat: minha nova funcionalidade'`  
4. Push: `git push origin minha-feature`  
5. Abra um Pull Request

## 📃 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
