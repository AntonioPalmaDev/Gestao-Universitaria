const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 3000;


// Configurar Supabase
const supabaseUrl = 'https://xlimdehkyjmuvxlqcqtv.supabase.co'; // Substitua pela URL do seu projeto
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsaW1kZWhreWptdXZ4bHFjcXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyNTk3ODEsImV4cCI6MjA1NjgzNTc4MX0.4E0LlAl5gUylR2NeGJMDiKc7eKw6jc6sbZvOgpFpMhU';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Servir arquivos estáticos (CSS, JS, imagens, etc.)
app.use(express.static(__dirname));

// Rota para a tela de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login&cadastro', 'Login', 'index.html'));
});

// Rota de cadastro
app.post('/cadastro', async (req, res) => {
    try {
      console.log('Dados recebidos:', req.body);
  
      const { nome_usuario, email_usuario, telefone_usuario, endereco_usuario, tipo_usuario, senha } = req.body;

  
      const { data, error } = await supabase
  .from('usuario')
  .insert([{
    nome_usuario,
    email_usuario,
    telefone_usuario,
    endereco_usuario,
    tipo_usuario,
    senha
  }]);

  
      if (error) {
        console.error('Erro do Supabase:', error);
        return res.redirect('/login&cadastro/Login/index.html?status=erro');
      }
        return res.redirect('/login&cadastro/Login/index.html?status=sucesso');
  
      
    } catch (err) {
      console.error('Erro geral no /cadastro:', err);
      return res.redirect('/login&cadastro/Login/index.html?status=erro');
    }
  });
  
// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    // Busca o usuário com o e-mail e senha
    const { data: usuarios, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('email_usuario', email)
        .eq('senha', senha)
        .limit(1);

    if (error) {
        console.error(error);
        return res.status(500).send('Erro ao buscar usuário.');
    }

    if (!usuarios || usuarios.length === 0) {
        return res.status(401).send('E-mail ou senha inválidos.');
    }

    const usuario = usuarios[0];
    res.status(200).send(`Login realizado com sucesso. Bem-vindo, ${usuario.nome_usuario}!`);
    res.redirect('/index/index.html'); // ou qualquer outro HTML que represente a "home"

});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
