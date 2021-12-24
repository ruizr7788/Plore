// --------- Transition service cards into view
const serviceCards = document.getElementById("services");

const serviceFadeIn = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section_translate-left");
  observer.unobserve(entry.target);
};

const serviceCardObserver = new IntersectionObserver(serviceFadeIn, {
  root: null,
  threshold: 0.1,
});
serviceCardObserver.observe(serviceCards);
