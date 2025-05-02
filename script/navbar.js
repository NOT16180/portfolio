document.addEventListener("DOMContentLoaded", function () {
  // Solution 1 : Fetch (fonctionne sur GitHub Pages)
  fetch("partials/navbar.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("navbar-container").innerHTML = html;
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

          <li><a href="index.html">home</a></li>
          <li><a href="selection.html">selection</a></li>
          <li><a href="https://www.inprnt.com/gallery/not/">purchase</a></li>
          <li><a href="contact.html">contact</a></li>
        </ul>
      </nav>
    `;
    highlightActiveLink();
  }

  function highlightActiveLink() {
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-list a").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  }
});
