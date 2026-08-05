const urlParams = new URLSearchParams(window.location.search);
let currentChapter = parseInt(urlParams.get("chap")) || 1;
let currentPageIndex = 0;
let isScrollMode = true;
let currentData = null;

const chapterTitleEl = document.getElementById("chapter-title");
const chapterSelectEl = document.getElementById("chapter-select");
const toggleModeBtn = document.getElementById("toggle-mode-btn");
const scrollView = document.getElementById("scroll-view");
const pagedView = document.getElementById("paged-view");
const pageContainer = document.getElementById("page-container");
const pageCounter = document.getElementById("page-counter");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");
const prevChapterBtn = document.getElementById("prev-chapter-btn");
const nextChapterBtn = document.getElementById("next-chapter-btn");

async function loadChapter(chapNum) {
    // Formatage sur 2 chiffres (1 -> 01, 2 -> 02)
    const formattedChap = String(chapNum).padStart(2, "0");

    try {
        const response = await fetch(`./chapitre-${formattedChap}/data.json`);
        currentData = await response.json();

        chapterTitleEl.textContent = currentData.chapterTitle;
        chapterSelectEl.value = chapNum;
        currentPageIndex = 0;

        renderScrollView();
        renderPagedView();
    } catch (error) {
        chapterTitleEl.textContent = "Erreur de chargement du chapitre.";
    }
}

function renderScrollView() {
    scrollView.innerHTML = "";
    currentData.pages.forEach((page) => {
        const div = document.createElement("div");
        div.innerHTML = `
      <img src="${page.image}" alt="Page">
      ${page.caption ? `<p>${page.caption}</p>` : ""}
    `;
        scrollView.appendChild(div);
    });
}

function renderPagedView() {
    const page = currentData.pages[currentPageIndex];
    pageContainer.innerHTML = `
    <img src="${page.image}" alt="Page ${currentPageIndex + 1}">
    ${page.caption ? `<p>${page.caption}</p>` : ""}
  `;
    pageCounter.textContent = `Page ${currentPageIndex + 1} / ${currentData.pages.length}`;

    prevPageBtn.disabled = currentPageIndex === 0;
    nextPageBtn.disabled = currentPageIndex === currentData.pages.length - 1;
}

toggleModeBtn.addEventListener("click", () => {
    isScrollMode = !isScrollMode;
    if (isScrollMode) {
        scrollView.hidden = false;
        pagedView.hidden = true;
        toggleModeBtn.textContent = "Mode : Défilement";
    } else {
        scrollView.hidden = true;
        pagedView.hidden = false;
        toggleModeBtn.textContent = "Mode : Page par Page";
        renderPagedView();
    }
});

prevPageBtn.addEventListener("click", () => {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        renderPagedView();
    }
});

nextPageBtn.addEventListener("click", () => {
    if (currentPageIndex < currentData.pages.length - 1) {
        currentPageIndex++;
        renderPagedView();
    }
});

chapterSelectEl.addEventListener("change", (e) => {
    window.location.search = `?chap=${e.target.value}`;
});

prevChapterBtn.addEventListener("click", () => {
    if (currentChapter > 1) {
        window.location.search = `?chap=${currentChapter - 1}`;
    }
});

nextChapterBtn.addEventListener("click", () => {
    window.location.search = `?chap=${currentChapter + 1}`;
});

loadChapter(currentChapter);
