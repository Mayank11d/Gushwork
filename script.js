"use strict";

// Product gallery images used by the hero carousel.
const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200&h=800",
    alt: "Industrial worker in manufacturing setup",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200&h=800",
    alt: "Construction and infrastructure worksite",
  },
  {
    src: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200&h=800",
    alt: "Industrial pipeline and plant environment",
  },
  {
    src: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=1200&h=800",
    alt: "Factory equipment and operations",
  },
  {
    src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200&h=800",
    alt: "Engineering inspection in industrial facility",
  },
  {
    src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop",
    alt: "Modern industrial process and machinery",
  },
];

// Step-wise content and image data for the manufacturing process section.
const processSteps = [
  {
    title: "High-Grade Raw Material Selection",
    desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
    points: ["PE100 grade material", "Optimal molecular weight distribution"],
    img: "https://images.unsplash.com/photo-1507336641158-886006775dd0?q=80&w=1170&auto=format&fit=crop",
  },
  {
    title: "Precision Extrusion Process",
    desc: "State-of-the-art twin-screw extruders melt the PE100 compound and push it through precision-machined dies at controlled temperatures.",
    points: ["Temperature-controlled extrusion", "Consistent melt flow index"],
    img: "https://images.unsplash.com/photo-1694532438941-06bb0d95dae5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Controlled Water Cooling",
    desc: "The extruded pipe passes through a series of water baths to rapidly and uniformly cool the material, locking in dimensional accuracy.",
    points: ["Multi-stage cooling tanks", "Uniform heat dissipation"],
    img: "https://images.unsplash.com/photo-1655204903983-73007f15cb3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Precision Vacuum Sizing",
    desc: "Vacuum calibration sleeves ensure the pipe maintains exact outer diameter tolerances as it cools.",
    points: ["Tight OD tolerances (+/- 0.3%)", "Real-time diameter monitoring"],
    img: "https://images.unsplash.com/photo-1709766295180-6ffdfb0faefb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Rigorous Quality Control",
    desc: "Every batch undergoes hydrostatic pressure testing, wall thickness measurement, and visual inspection per IS 5984 and ISO 4427.",
    points: ["100% hydrostatic testing", "Dimensional verification"],
    img: "https://images.unsplash.com/photo-1767389193137-77d6f9b8b56a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Inkjet Marking & Identification",
    desc: "Pipes are continuously marked with size, pressure rating, SDR, certification, and date of manufacture for full traceability.",
    points: ["IS/ISO certification markings", "Full production traceability"],
    img: "https://images.unsplash.com/photo-1604138290658-2bc80c707bbf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Precision Saw Cutting",
    desc: "Automatic saw stations cut pipes to exact lengths with clean, square ends ready for butt fusion or electrofusion jointing.",
    points: ["Automated length control", "Square-end finish"],
    img: "https://plus.unsplash.com/premium_photo-1661899574771-7489680d5e13?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Protective Packaging",
    desc: "Coils are wound on mandrels and bundled with UV-protective wrap; straight pipes are bundled and strapped for safe transport.",
    points: ["UV-protective wrapping", "Export-grade packaging"],
    img: "https://plus.unsplash.com/premium_photo-1682144557019-e85937bc1ba3?q=80&w=1200&auto=format&fit=crop",
  },
];

(function initStickyHeader() {
  const stickyHeader = document.getElementById("sticky-header");
  const mainHeader = document.getElementById("main-header");

  if (!stickyHeader || !mainHeader) return;

  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const currentY = window.scrollY;
    // Show sticky header only after user passes the first fold.
    const threshold = mainHeader.offsetHeight + window.innerHeight * 0.25;

    const scrollingDown = currentY > lastScrollY;

    if (currentY > threshold) {
      if (scrollingDown) {
        stickyHeader.classList.add("visible");
        stickyHeader.setAttribute("aria-hidden", "false");
      } else {
        stickyHeader.classList.remove("visible");
        stickyHeader.setAttribute("aria-hidden", "true");
      }
    } else {
      stickyHeader.classList.remove("visible");
      stickyHeader.setAttribute("aria-hidden", "true");
    }

    lastScrollY = currentY;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
})();

(function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen.toString());
    mobileMenu.setAttribute("aria-hidden", (!isOpen).toString());
  });
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });
})();

(function initCarousel() {
  const track = document.getElementById("carousel-track");
  const thumbsEl = document.getElementById("thumbnails");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const zoomOverlay = document.getElementById("zoom-overlay");
  const zoomImg = document.getElementById("zoom-img");

  if (!track) return;

  let currentIndex = 0;

  // Build main image slides from the configured dataset.
  carouselImages.forEach((img, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.setAttribute("role", "group");
    slide.setAttribute(
      "aria-label",
      `Image ${i + 1} of ${carouselImages.length}`,
    );

    const imgEl = document.createElement("img");
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.loading = i === 0 ? "eager" : "lazy";

    imgEl.addEventListener("mouseenter", () => openZoom(img.src, img.alt));
    imgEl.addEventListener("mouseleave", () => closeZoom());

    imgEl.addEventListener("click", () => {
      if (zoomOverlay.classList.contains("active")) {
        closeZoom();
      } else {
        openZoom(img.src, img.alt);
      }
    });

    slide.appendChild(imgEl);
    track.appendChild(slide);
  });

  // Build clickable thumbnail strip.
  carouselImages.forEach((img, i) => {
    const thumb = document.createElement("div");
    thumb.className = "thumb" + (i === 0 ? " active" : "");
    thumb.setAttribute("role", "listitem");
    thumb.setAttribute("aria-label", `Thumbnail ${i + 1}`);
    thumb.tabIndex = 0;

    const imgEl = document.createElement("img");
    imgEl.src = img.src;
    imgEl.alt = `Thumbnail: ${img.alt}`;

    thumb.appendChild(imgEl);

    thumb.addEventListener("click", () => goTo(i));
    thumb.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        goTo(i);
      }
    });

    thumbsEl.appendChild(thumb);
  });

  function goTo(index) {
    // Keep index in bounds and move track with a single transform.
    currentIndex = (index + carouselImages.length) % carouselImages.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    const thumbs = thumbsEl.querySelectorAll(".thumb");
    thumbs.forEach((t, i) => t.classList.toggle("active", i === currentIndex));
    const activeThumb = thumbs[currentIndex];
    if (activeThumb) {
      const targetLeft =
        activeThumb.offsetLeft -
        (thumbsEl.clientWidth - activeThumb.clientWidth) / 2;
      thumbsEl.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    }
  }

  prevBtn?.addEventListener("click", () => goTo(currentIndex - 1));
  nextBtn?.addEventListener("click", () => goTo(currentIndex + 1));

  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(currentIndex + (diff > 0 ? 1 : -1));
  });

  document.addEventListener("keydown", (e) => {
    if (zoomOverlay.classList.contains("active")) {
      if (e.key === "Escape") closeZoom();
      return;
    }
  });

  function openZoom(src, alt) {
    zoomImg.src = src;
    zoomImg.alt = alt;
    zoomOverlay.classList.add("active");
    zoomOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeZoom() {
    zoomOverlay.classList.remove("active");
    zoomOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  zoomOverlay?.addEventListener("click", closeZoom);
  zoomImg?.addEventListener("click", (e) => e.stopPropagation());

  // Auto-rotate gallery, pause while user hovers the carousel.
  let autoTimer = setInterval(() => goTo(currentIndex + 1), 5000);
  track.addEventListener("mouseenter", () => clearInterval(autoTimer));
  track.addEventListener("mouseleave", () => {
    autoTimer = setInterval(() => goTo(currentIndex + 1), 5000);
  });
})();

(function initAppCarousel() {
  const carousel = document.getElementById("app-carousel");
  const prevBtn = document.getElementById("app-prev");
  const nextBtn = document.getElementById("app-next");

  if (!carousel) return;

  let offset = 0;

  function getCardWidth() {
    const card = carousel.querySelector(".app-card");
    if (!card) return 296;
    return card.offsetWidth + 16;
  }

  function maxOffset() {
    const cards = carousel.querySelectorAll(".app-card");
    const visCount = Math.floor(
      carousel.parentElement.offsetWidth / getCardWidth(),
    );
    return Math.max(0, (cards.length - visCount) * getCardWidth());
  }

  prevBtn?.addEventListener("click", () => {
    offset = Math.max(0, offset - getCardWidth());
    carousel.style.transform = `translateX(-${offset}px)`;
  });

  nextBtn?.addEventListener("click", () => {
    offset = Math.min(maxOffset(), offset + getCardWidth());
    carousel.style.transform = `translateX(-${offset}px)`;
  });

  let touchStart = 0;
  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStart = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  carousel.addEventListener("touchend", (e) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 40) {
      offset = Math.min(maxOffset(), offset + getCardWidth());
      carousel.style.transform = `translateX(-${offset}px)`;
    } else if (diff < -40) {
      offset = Math.max(0, offset - getCardWidth());
      carousel.style.transform = `translateX(-${offset}px)`;
    }
  });
})();

(function initProcessTabs() {
  const tabs = document.querySelectorAll(".process-tab");
  const titleEl = document.getElementById("process-title");
  const descEl = document.getElementById("process-desc");
  const pointsEl = document.getElementById("process-points");
  const imgEl = document.getElementById("process-img");
  const prevBtn = document.getElementById("proc-prev");
  const nextBtn = document.getElementById("proc-next");

  if (!tabs.length) return;

  let currentStep = 0;

  function updateStep(idx) {
    // Rotate through steps and swap text/image as one state update.
    currentStep = (idx + processSteps.length) % processSteps.length;
    const step = processSteps[currentStep];
    const content = document.getElementById("process-content");
    content.style.opacity = "0";
    setTimeout(() => {
      if (titleEl) titleEl.textContent = step.title;
      if (descEl) descEl.textContent = step.desc;
      if (imgEl) {
        imgEl.src = step.img;
        imgEl.alt = step.title;
      }

      if (pointsEl) {
        pointsEl.innerHTML = step.points
          .map((p) => `<li><span class="check-blue">&#10003;</span> ${p}</li>`)
          .join("");
      }

      content.style.opacity = "1";
    }, 160);
    tabs.forEach((t, i) => {
      t.classList.toggle("active", i === currentStep);
      t.setAttribute("aria-selected", (i === currentStep).toString());
    });
    const activeTab = tabs[currentStep];
    const tabsWrap = document.querySelector(".process-tabs");
    if (activeTab && tabsWrap) {
      const targetLeft =
        activeTab.offsetLeft -
        (tabsWrap.clientWidth - activeTab.clientWidth) / 2;
      tabsWrap.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
    }
  }
  document.getElementById("process-content").style.transition =
    "opacity 0.16s ease";

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => updateStep(i));
  });

  prevBtn?.addEventListener("click", () => updateStep(currentStep - 1));
  nextBtn?.addEventListener("click", () => updateStep(currentStep + 1));
})();

(function initFaq() {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const answerId = btn.getAttribute("aria-controls");
      const answer = document.getElementById(answerId);
      const arrow = btn.querySelector(".faq-arrow");
      questions.forEach((q) => {
        q.setAttribute("aria-expanded", "false");
        const aId = q.getAttribute("aria-controls");
        const a = document.getElementById(aId);
        const ar = q.querySelector(".faq-arrow");
        if (a) a.classList.add("hidden");
        if (ar) {
          ar.textContent = "\u2228";
          ar.classList.remove("open");
        }
      });
      if (!isExpanded) {
        btn.setAttribute("aria-expanded", "true");
        if (answer) answer.classList.remove("hidden");
        if (arrow) {
          arrow.textContent = "\u2227";
          arrow.classList.add("open");
        }
      }
    });
  });
})();

function openModal(id) {
  // Lock body scroll while modal is open.
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    const firstInput = modal.querySelector(
      "input, select, button:not(.modal-close)",
    );
    firstInput?.focus();
  }, 50);
}

function closeModal(id) {
  // Restore page scroll and hide the selected modal.
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".modal-overlay.open")
      .forEach((m) => closeModal(m.id));
  }
});
window.openModal = openModal;
window.closeModal = closeModal;

(function initTestimonials() {
  const track = document.getElementById("testimonials-track");
  if (!track) return;

  let offset = 0;
  const cardWidth = 320 + 24;

  function maxOffset() {
    const cards = track.querySelectorAll(".testimonial-card");
    const wrapW = track.parentElement.offsetWidth;
    const visCount = Math.floor(wrapW / cardWidth);
    return Math.max(0, (cards.length - visCount) * cardWidth);
  }
  // Loop cards horizontally to simulate a continuous testimonial slider.
  setInterval(() => {
    offset += cardWidth;
    if (offset > maxOffset()) offset = 0;
    track.style.transform = `translateX(-${offset}px)`;
    track.style.transition = "transform 0.5s ease";
  }, 3500);

  let touchStart = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStart = e.changedTouches[0].clientX;
    },
    { passive: true },
  );
  track.addEventListener("touchend", (e) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 40) {
      offset = Math.min(maxOffset(), offset + cardWidth);
    } else if (diff < -40) {
      offset = Math.max(0, offset - cardWidth);
    }
    track.style.transform = `translateX(-${offset}px)`;
  });
})();

(function initReveal() {
  // Skip reveal animation on reload to avoid startup flicker.
  const navEntry = performance.getEntriesByType("navigation")[0];
  if (navEntry && navEntry.type === "reload") return;

  const elements = document.querySelectorAll(
    ".feature-card, .portfolio-card, .testimonial-card, .faq-item, .download-item, .specs-table tbody tr",
  );

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  elements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.4s ease ${(i % 6) * 0.08}s, transform 0.4s ease ${(i % 6) * 0.08}s`;
    observer.observe(el);
  });
})();
