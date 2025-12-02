// Smooth scroll for nav links
document.querySelectorAll('.nav a, .btn[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Theme toggle (Light/Dark)
  const themeToggle = document.getElementById('themeToggle');

  // عند التحميل: اقرأ القيمة من LocalStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.textContent = 'Light';
  }

  // عند الضغط على الزر: غيّر الوضع وخزّن القيمة
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      themeToggle.textContent = isDark ? 'Light' : 'Dark';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
  // Search filtering
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const location = document.getElementById('location').value.trim().toLowerCase();
      const type = document.getElementById('type').value.trim().toLowerCase();
      const budgetVal = document.getElementById('budget').value.trim();
      const budget = budgetVal ? parseInt(budgetVal, 10) : null;
  
      const cards = document.querySelectorAll('#popularList .card');
      let found = 0;
      cards.forEach(card => {
        const city = (card.dataset.city || '').toLowerCase();
        const t = (card.dataset.type || '').toLowerCase();
        const price = parseInt(card.dataset.price || '0', 10);
  
        const matchLocation = !location || city.includes(location);
        const matchType = !type || t === type;
        const matchBudget = !budget || price <= budget;
  
        const visible = matchLocation && matchType && matchBudget;
        card.style.display = visible ? 'block' : 'none';
        if (visible) found++;
      });
  
      // small feedback
      if (!found) {
        alert('No properties match your filters. Try adjusting your search.');
      }
      // scroll to results on search
      const propertiesSection = document.getElementById('properties');
      if (propertiesSection) propertiesSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Card buttons animation
  document.querySelectorAll('.card .card__action').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('loading');
      btn.textContent = 'Booking...';
      setTimeout(() => {
        btn.classList.remove('loading');
        btn.textContent = 'Booked';
        btn.disabled = true;
      }, 1200);
    });
  });
  
  // Contact form (demo)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cfName').value.trim();
      const email = document.getElementById('cfEmail').value.trim();
      const message = document.getElementById('cfMessage').value.trim();
  
      if (!name || !email || !message) {
        alert('Please fill all fields.');
        return;
      }
      // هنا لاحقًا تربطيه بـ backend (PHP/Laravel) أو خدمة إرسال فورم بديلة
      alert('Message sent successfully (demo).');
      contactForm.reset();
    });
  }
  
  // Subtle entrance animations on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.12 });
  
  document.querySelectorAll('.card, .stat, .testimonial__grid, .search__bar').forEach(el => observer.observe(el));