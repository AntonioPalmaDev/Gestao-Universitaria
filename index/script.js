document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu-lateral");
    const btnAbrir = document.getElementById("menu-btn");
    const btnFechar = document.getElementById("fechar-menu");
    const conteudo = document.getElementById("conteudo");

    // Abrir o menu
    btnAbrir.addEventListener("click", function () {
        menu.classList.add("ativo");
        conteudo.classList.add("margem");
    });

    // Fechar o menu
    btnFechar.addEventListener("click", function () {
        menu.classList.remove("ativo");
        conteudo.classList.remove("margem");
    });
});
