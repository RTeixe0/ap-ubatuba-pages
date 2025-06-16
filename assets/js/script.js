(() => {
  const init = () => {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImage");
    const closeModalBtn = document.getElementById("closeModal");

  // Configuração das imagens
  const body = document.body;
  const pasta = body.dataset.pasta || "assets/img/dna";
  const prefixo = body.dataset.prefixo || "dna";
  const totalImagens = parseInt(body.dataset.total) || 3;
  const extensao = ".jpg";

  // Containers
  const carouselContainer = document.getElementById("carouselContainer");
  const galleryContainer = document.getElementById("galleryContainer");

  for (let i = 1; i <= totalImagens; i++) {
    const src = `${pasta}/${prefixo}${i}${extensao}`;

    // Adiciona imagem ao carrossel
    if (carouselContainer) {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `<img src="${src}" alt="Foto ${i}" />`;
      carouselContainer.appendChild(slide);
    }

    // Adiciona imagem à galeria
    if (galleryContainer) {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.alt = `Foto ${i}`;
      thumb.className = "mosaic-img";
      galleryContainer.appendChild(thumb);
    }
  }

  // Função para exibir imagem no modal
  function bindModalImages() {
    document.querySelectorAll(".swiper-slide img, .mosaic-img").forEach(img => {
      img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.style.display = "flex";
      });
    });
  }

  bindModalImages();

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Inicia o Swiper depois de montar os slides
  new Swiper(".swiper", {
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

  // Menu dinâmico de apartamentos (mantido do seu script original)
  const navContainer = document.getElementById("menu-apartamentos");
  if (navContainer && typeof apartamentos !== "undefined") {
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
  // Animacao de rolagem das seções
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".scroll-animate").forEach(el => observer.observe(el));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
