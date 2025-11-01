document.addEventListener("DOMContentLoaded", function () {
  // Toujours charger depuis la racine avec un chemin absolu
  const navbarPath = "/partials/navbar.html";

  // Charger la navbar
  fetch(navbarPath)
    .then((response) => {
      if (!response.ok) throw new Error('Navbar not found');
      return response.text();
    })
    .then((html) => {
      document.getElementById("navbar-container").innerHTML = html;
      // NE PAS appeler fixNavbarLinks() car universal-links.js s'en occupe déjà
      highlightActiveLink();
    })
    .catch((err) => {
      console.error("Error loading navbar:", err);
      loadFallbackNavbar();
    });

  // Solution de repli si fetch échoue
  function loadFallbackNavbar() {
    document.getElementById("navbar-container").innerHTML = `
      <nav class="navbar">
        <ul class="nav-list">
          <li><a href="/">Home</a></li>
          <li><a href="/illustration/">Illustration</a></li>
          <li><a href="/selection/">Selection</a></li>
          <li><a href="/contact/">Contact</a></li>
          <li><a href="/linktree/">Links</a></li>
          <li><a href="/purchase/">Purchase</a></li>
        </ul>
      </nav>
    `;
    highlightActiveLink();
  }

  // Mettre en surbrillance le lien actif
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    
    // Extraire le nom du dossier actuel (illustration, contact, etc.)
    const pathParts = currentPath.split('/').filter(p => p && p !== 'index.html');
    const currentFolder = pathParts[pathParts.length - 1] || 'home';
    
    document.querySelectorAll(".nav-list a").forEach((link) => {
      const linkHref = link.getAttribute("href");
      
      // Vérifier si le lien correspond à la page actuelle
      if (
        (currentFolder === 'home' && (linkHref === '/' || linkHref.includes('index.html'))) ||
        (linkHref && linkHref.includes('/' + currentFolder + '/'))
      ) {
        link.classList.add("active");
      }
    });
  }
});
