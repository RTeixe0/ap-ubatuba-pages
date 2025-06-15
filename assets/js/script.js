// Swiper config
const swiper = new Swiper(".swiper", {
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Modal de imagem
window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  const closeModalBtn = document.getElementById("closeModal");

  document.querySelectorAll(".swiper-slide img").forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.style.display = "flex";
    });
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Menu dinâmico de apartamentos
const navContainer = document.getElementById("menu-apartamentos");

if (navContainer) {
  const currentPage = window.location.pathname.split("/").pop();

  apartamentos.forEach(ap => {
    const a = document.createElement("a");
    a.href = ap.arquivo;
    a.textContent = ap.nome;
    a.className = "nav-link";
    if (ap.arquivo === currentPage) a.classList.add("active");
    navContainer.appendChild(a);
  });
}
