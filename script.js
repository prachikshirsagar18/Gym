// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle && navToggle.addEventListener('click', () => {
  siteNav.style.display = siteNav.style.display === 'flex' ? 'none' : 'flex';
});

// Quick form submit (hero card)
document.getElementById('quickForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('qname').value.trim();
  const phone = document.getElementById('qphone').value.trim();
  if (!name || !phone) return showToast('Please enter name and phone');
  showToast(`Thanks ${name}! We'll call you at ${phone}`);
  this.reset();
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  showToast('Message sent. We will contact you soon.');
  this.reset();
});

// Select plan buttons
document.querySelectorAll('.select-plan').forEach(btn => {
  btn.addEventListener('click', () => {
    const plan = btn.dataset.plan || 'Plan';
    showToast(`You selected the ${plan} plan. Our team will contact you.`);
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) en.target.classList.add('visible');
  });
}, { threshold: 0.12 });
reveals.forEach(r => ro.observe(r));

// Counters animation
document.querySelectorAll('.counter strong').forEach(el => {
  const target = +el.dataset.target;
  let current = 0;
  const step = Math.max(1, Math.floor(target / 120));
  const run = () => {
    current += step;
    if (current < target) {
      el.textContent = current;
      requestAnimationFrame(run);
    } else {
      el.textContent = target;
    }
  };
  run();
});

// Toast helper
function showToast(msg, ms = 3000) {
  const t = document.getElementById('toast');
  if (!t) return alert(msg);
  t.textContent = msg;
  t.style.opacity = 1;
  t.style.transform = 'translateY(0)';
  setTimeout(() => {
    t.style.opacity = 0;
    t.style.transform = 'translateY(12px)';
  }, ms);
}
// PLAN MODAL FUNCTIONALITY
const modal = document.getElementById('planModal');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.plan-click').forEach(card => {
  card.addEventListener('click', () => {
    const plan = card.dataset.plan;
    const price = card.dataset.price;
    const features = card.dataset.features.split(',');

    document.getElementById('modalTitle').textContent = plan + " Plan";
    document.getElementById('modalPrice').textContent = price;

    const featureList = document.getElementById('modalFeatures');
    featureList.innerHTML = "";
    features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      featureList.appendChild(li);
    });

    modal.style.display = "flex";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
