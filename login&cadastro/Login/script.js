const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});



 // Função para exibir a notificação
 function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.backgroundColor = type === 'sucesso' ? '#4CAF50' : '#f44336'; // verde para sucesso, vermelho para erro
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000); // Esconde a notificação após 5 segundos
}

// Captura o parâmetro 'status' da URL
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('status');

// Se o status for 'sucesso' ou 'erro', exibe a notificação correspondente
if (status === 'sucesso') {
    showNotification('Cadastro realizado com sucesso!', 'sucesso');
} else if (status === 'erro') {
    showNotification('Erro ao cadastrar, tente novamente!', 'erro');
}