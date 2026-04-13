document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".custom-navbar");
  const backToTop = document.getElementById("backToTop");
  const counters = document.querySelectorAll(".counter");
  const revealElements = document.querySelectorAll(".reveal-up");
  const currentYear = document.getElementById("year");
  const contactForm = document.getElementById("contactForm");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id], header[id]");

  /* =========================
     Navbar scroll effect
  ========================= */
  function handleScroll() {
    if (window.scrollY > 60) {
      if (navbar) {
        navbar.classList.add("scrolled");
      }

      if (backToTop) {
        backToTop.classList.add("show");
      }
    } else {
      if (navbar) {
        navbar.classList.remove("scrolled");
      }

      if (backToTop) {
        backToTop.classList.remove("show");
      }
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  /* =========================
     Back to top
  ========================= */
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================
     Current year
  ========================= */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =========================
     Reveal on scroll
  ========================= */
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("active");
    });
  }

  /* =========================
     Counter animation
  ========================= */
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 100));

    const updateCounter = () => {
      current += increment;

      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }

  if ("IntersectionObserver" in window && counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  } else {
    counters.forEach((counter) => {
      animateCounter(counter);
    });
  }

  /* =========================
     Active nav link on scroll
  ========================= */
  function setActiveNav() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  if (navLinks.length > 0 && sections.length > 0) {
    window.addEventListener("scroll", setActiveNav);
    setActiveNav();
  }

  /* =========================
     Auto close mobile menu on click
  ========================= */
  const navbarCollapse = document.getElementById("navbarContent");

  if (
    navbarCollapse &&
    typeof bootstrap !== "undefined" &&
    bootstrap.Collapse
  ) {
    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
      toggle: false,
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (
          window.innerWidth < 992 &&
          navbarCollapse.classList.contains("show")
        ) {
          bsCollapse.hide();
        }
      });
    });
  }

  /* =========================
     Fake contact form handler
  ========================= */
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Pesan Anda berhasil dikirim. Terima kasih telah menghubungi kami.",
      );
      contactForm.reset();
    });
  }
});
