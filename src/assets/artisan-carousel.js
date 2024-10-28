document.querySelectorAll(".artisan").forEach((artisan) => {
  artisan.addEventListener("click", () => {
    const firstArtisan = document.querySelector(".artisan-1");
    const secondArtisan = document.querySelector(".artisan-2");
    const thirdArtisan = document.querySelector(".artisan-3");

    // Déplace les classes pour créer l'effet de carrousel
    firstArtisan.classList.replace("artisan-1", "artisan-2");
    secondArtisan.classList.replace("artisan-2", "artisan-3");
    thirdArtisan.classList.replace("artisan-3", "artisan-1");
  });
});
// il reste preférable de placer le javascript directemtn dans le component concerné
