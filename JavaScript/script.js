document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    // Define o tema inicial com base no localStorage
    document.body.classList.toggle("dark-theme", currentTheme === "dark");
    themeToggleButton.textContent = currentTheme === "dark" ? "☀️" : "🌙";

    // Alterna entre os temas ao clicar no botão
    themeToggleButton.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        themeToggleButton.textContent = isDarkMode ? "☀️" : "🌙";
    });
});

// Seleciona todas as imagens de produtos
const productImages = document.querySelectorAll('.produto img');

// Adiciona os eventos a cada imagem
productImages.forEach(img => {
  img.addEventListener('mouseover', () => {
    img.style.transform = 'scale(1.2)'; // Aumenta 20%
    img.style.transition = 'transform 0.5s ease'; // Animação suave
  });

  img.addEventListener('mouseout', () => {
    img.style.transform = 'scale(1)'; // Retorna ao tamanho original
  });
});



