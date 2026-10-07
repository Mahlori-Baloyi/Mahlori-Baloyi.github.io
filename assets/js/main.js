(function () {
  "use strict";

  const navbar = document.querySelector("#navbar");
  const toggle = document.querySelector(".mobile-nav-toggle");

  const setNav = (open) => {
    navbar.classList.toggle("navbar-mobile", open);
    toggle.classList.toggle("bi-list", !open);
    toggle.classList.toggle("bi-x", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };

  toggle.addEventListener("click", () => setNav(!navbar.classList.contains("navbar-mobile")));
  toggle.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setNav(!navbar.classList.contains("navbar-mobile"));
    }
  });
  navbar.querySelectorAll("ul a").forEach((a) => a.addEventListener("click", () => setNav(false)));

  // Hero typing effect
  const typed = document.querySelector(".typed");
  if (typed && typeof Typed !== "undefined") {
    new Typed(".typed", {
      strings: typed.getAttribute("data-typed-items").split(","),
      loop: true, typeSpeed: 250, backSpeed: 50, backDelay: 2000
    });
  }

  // Highlight the nav link for the section in view
  const links = [...navbar.querySelectorAll("ul a")];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("active", a.hash === "#" + entry.target.id));
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  links.forEach((a) => {
    const section = document.querySelector(a.hash);
    if (section) observer.observe(section);
  });
})();