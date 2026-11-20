// ---------- 1. Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});
// close the menu after clicking a link
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});

// ---------- 2. Typing effect ----------
const roles = ["CSE Student", "Web Developer", "Problem Solver"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typingEl = document.getElementById("typing");

function type() {
  const word = roles[roleIndex];
  if (deleting) {
    charIndex--;
  } else {
    charIndex++;
  }
  typingEl.textContent = word.substring(0, charIndex);

  let speed = deleting ? 50 : 100;
  if (!deleting && charIndex === word.length) {
    speed = 1500;            // pause at the end of the word
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }
  setTimeout(type, speed);
}
type();

// ---------- 3. Highlight the active nav link while scrolling ----------
const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {
  let current = "home";
  sections.forEach(function (sec) {
    if (window.scrollY >= sec.offsetTop - 140) {
      current = sec.id;
    }
  });
  links.forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });

  // back-to-top button
  document.getElementById("toTop").classList.toggle("show", window.scrollY > 500);
});

// ---------- 4. Fade-in when sections come into view ----------
const revealItems = document.querySelectorAll(".card, .project, .timeline .item, .video-box");
revealItems.forEach(function (el) { el.classList.add("reveal"); });

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });
revealItems.forEach(function (el) { observer.observe(el); });

// ---------- 5. Contact form: opens the visitor's email app ----------
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:sadikhossain230802@gmail.com?subject=" + subject + "&body=" + body;
});

// ---------- 6. Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
