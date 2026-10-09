const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const header = document.getElementById("header");
const progress = document.getElementById("scrollProgress");

menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("active"));
});

window.addEventListener("scroll", () => {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 24);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? y / max : 0;
    progress.style.width = `${Math.min(ratio * 100, 100)}%`;
}, { passive: true });

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;
            entry.target.style.transitionDelay = `${(index % 4) * 80}ms`;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelectorAll(".faq-item").forEach((item) => {
    item.querySelector("button").addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
    });
});

document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (event) => {
        const box = el.getBoundingClientRect();
        const mx = event.clientX - box.left - box.width / 2;
        const my = event.clientY - box.top - box.height / 2;
        el.style.transform = `translate(${mx * 0.18}px, ${my * 0.22}px)`;
    });

    el.addEventListener("mouseleave", () => {
        el.style.transform = "";
    });
});

const yearElement = document.querySelector(".footer-bottom span");
if (yearElement) {
    yearElement.textContent = "© " + new Date().getFullYear() + " ПРОЕКТ DANTES";
}
