// Helfer-Skript: Branding-Integration, Jahr einfügen, Nav toggle, Video lazy-load mit Hinweis
document.addEventListener('DOMContentLoaded', function(){
  // Jahr im Footer
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Branding: Logo ersetzen, Footer-Name anpassen falls BRAND gesetzt
  try {
    const brand = window.BRAND || null;
    if (brand) {
      // Footer company name
      const footerCompany = document.getElementById('footer-company');
      if (footerCompany) footerCompany.textContent = brand.companyName || footerCompany.textContent;

      // Replace text logo with image if provided
      const brandEl = document.getElementById('brand-logo');
      if (brandEl && brand.logoUrl) {
        const img = document.createElement('img');
        img.src = brand.logoUrl;
        img.alt = brand.companyName || 'Logo';
        img.onload = function(){ /* optional: could add classes */ };
        // clear and insert
        brandEl.textContent = '';
        brandEl.appendChild(img);
      } else if (brandEl && brand.companyName) {
        brandEl.textContent = brand.companyName;
      }
    }
  } catch (e) {
    // no-op
    console.warn('Branding init error', e);
  }

  // Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        navList.style.display = '';
      } else {
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
      }
    });
  }

  // Video lazy-load: beim Klick wird iframe src gesetzt, ansonsten Hinweis, wie einzufügen
  const loadBtn = document.getElementById('load-video');
  const iframeContainer = document.querySelector('.video-iframe');
  if (loadBtn && iframeContainer) {
    loadBtn.addEventListener('click', function(){
      const src = iframeContainer.getAttribute('data-src');
      if (!src) {
        // Kein Video-Embed gesetzt — kurze Anleitung anzeigen
        alert('Kein Pitch-Video eingebunden. Bitte setze das data-src der .video-iframe auf einen YouTube- oder Vimeo-Embed-Link (z. B. https://www.youtube.com/embed/DEINE_ID).');
        return;
      }
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', src);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframeContainer.innerHTML = '';
      iframeContainer.appendChild(iframe);
      iframeContainer.setAttribute('aria-hidden', 'false');
    });
  }
});