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

    // === 1. Monta o carrossel completo ===
    for (let i = 1; i <= totalImagens; i++) {
      const src = `${pasta}/${prefixo}${i}${extensao}`;
      if (carouselContainer) {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `<img src="${src}" alt="Foto ${i}" loading="lazy" />`;
        carouselContainer.appendChild(slide);
      }
    }

    // === 2. Galeria em blocos ===
    let loaded = 0;
    const batchSize = 15;

    function loadNextBatch() {
      const end = Math.min(loaded + batchSize, totalImagens);
      for (let i = loaded + 1; i <= end; i++) {
        const src = `${pasta}/${prefixo}${i}${extensao}`;
        const thumb = document.createElement("img");
        thumb.src = src;
        thumb.alt = `Foto ${i}`;
        thumb.loading = "lazy";
        thumb.className = "mosaic-img";
        thumb.style.display = "none"; // Inicialmente escondida

        // Mostra só quando estiver carregada
        thumb.onload = () => {
          thumb.classList.add("loaded");
          thumb.style.display = "block";
        };

        thumb.addEventListener("click", () => {
          modalImg.src = thumb.src;
          modal.style.display = "flex";
        });

        galleryContainer.appendChild(thumb);
      }
      loaded = end;
    }

    // === 3. Inicialização da galeria de forma suave ===
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => loadNextBatch());
    } else {
      setTimeout(() => loadNextBatch(), 500);
    }

    // === 4. Carregamento progressivo ao rolar ===
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 900
      ) {
        if (loaded < totalImagens) loadNextBatch();
      }
    });

    // === 5. Modal de imagem ===
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // === 6. Swiper ===
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

    // === 7. Menu dinâmico ===
    const navContainer = document.getElementById("menu-apartamentos");
    if (navContainer && typeof apartamentos !== "undefined") {
      const currentPage = window.location.pathname.split("/").pop();
      apartamentos.forEach((ap) => {
        const a = document.createElement("a");
        a.href = ap.arquivo;
        a.textContent = ap.nome;
        a.className = "nav-link";
        if (ap.arquivo === currentPage) a.classList.add("active");
        navContainer.appendChild(a);
      });
    }

    // === 8. Scroll animation ===
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".scroll-animate")
      .forEach((el) => observer.observe(el));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
