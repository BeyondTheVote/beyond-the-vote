(function () {
  "use strict";

  const data = window.CAMPAIGN_DATA;
  const page = document.body.dataset.page;

  if (!data || !page) return;

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const params = new URLSearchParams(window.location.search);

  function updateMeta(selector, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", value);
  }

  function portraitMarkup(candidate, faculty) {
    const label = candidate.name === "Candidate profile" ? "Photo coming soon" : candidate.name;
    const portraitClass = candidate.portraitClass ? ` ${escapeHtml(candidate.portraitClass)}` : "";
    const fallback = `
      <div class="portrait-fallback">
        <span class="portrait-monogram">${escapeHtml(faculty.shortName)}</span>
        <span>${escapeHtml(label)}</span>
      </div>`;

    if (!candidate.image) return fallback;

    return `
      <div class="portrait-image-wrap${portraitClass}">
        <img src="${escapeHtml(candidate.image)}" alt="${escapeHtml(candidate.imageAlt || candidate.name)}" loading="lazy">
        ${fallback}
      </div>`;
  }

  function activateImageFallbacks(scope) {
    scope.querySelectorAll(".portrait-image-wrap img").forEach((image) => {
      const showFallback = () => image.parentElement.classList.add("image-missing");
      image.addEventListener("error", showFallback, { once: true });
      if (image.complete && image.naturalWidth === 0) showFallback();
    });
  }

  function renderFaculties() {
    const grid = document.querySelector("#faculty-grid");
    const count = document.querySelector("#faculty-count");
    if (!grid || !count) return;

    count.textContent = `${String(data.faculties.length).padStart(2, "0")} faculties`;
    grid.innerHTML = data.faculties
      .map(
        (faculty, index) => `
          <a class="faculty-card" href="candidates.html?faculty=${encodeURIComponent(faculty.id)}">
            <div class="faculty-card-topline">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <span class="faculty-arrow" aria-hidden="true">↗</span>
            </div>
            <div class="faculty-card-copy">
              <p>${escapeHtml(faculty.campaignName)}</p>
              <h3>${escapeHtml(faculty.shortName)}</h3>
              <p>${escapeHtml(faculty.fullName)}</p>
            </div>
            <span class="faculty-card-action">View candidates <span aria-hidden="true">→</span></span>
          </a>`
      )
      .join("");
  }

  function renderCandidates() {
    const facultyId = params.get("faculty");
    const faculty = data.faculties.find((item) => item.id === facultyId);
    const hero = document.querySelector("#directory-hero");
    const grid = document.querySelector("#candidate-grid");
    const count = document.querySelector("#candidate-count");

    if (!hero || !grid || !count) return;

    if (!faculty) {
      document.title = "Faculty Not Found | Beyond the Vote";
      hero.innerHTML = `
        <div class="error-state">
          <p class="eyebrow"><span></span> Faculty not found</p>
          <h1>Let’s get you<br><em>back on track.</em></h1>
          <p>The faculty link may be incomplete or no longer available.</p>
          <a class="button button-primary" href="faculties.html">Choose a faculty <span class="button-icon" aria-hidden="true">→</span></a>
        </div>`;
      grid.closest("section").hidden = true;
      return;
    }

    const pageTitle = `${faculty.shortName} Candidates | Beyond the Vote`;
    const pageDescription = `Meet the ${faculty.shortName} candidates for ${faculty.campaignName}.`;
    document.title = pageTitle;
    updateMeta('meta[name="description"]', pageDescription);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', pageDescription);
    hero.innerHTML = `
      <div class="directory-title">
        <p class="eyebrow"><span></span> ${escapeHtml(faculty.campaignName)} · ${escapeHtml(faculty.shortName)}</p>
        <h1>Meet your<br><em>candidates.</em></h1>
      </div>
      <div class="directory-note">
        <span>${String(faculty.candidates.length).padStart(2, "0")}</span>
        <p>${escapeHtml(faculty.description)} Select a profile to read the complete candidate information.</p>
      </div>`;

    count.textContent = `${String(faculty.candidates.length).padStart(2, "0")} profiles`;
    grid.innerHTML = faculty.candidates
      .map(
        (candidate, index) => `
          <a class="candidate-card" href="candidate.html?id=${encodeURIComponent(candidate.id)}">
            <div class="candidate-portrait">
              ${portraitMarkup(candidate, faculty)}
              <span class="candidate-number">${String(index + 1).padStart(2, "0")}</span>
            </div>
            <div class="candidate-card-body">
              <div class="candidate-meta-row">
                <p class="candidate-faculty">${escapeHtml(faculty.shortName)} · ${escapeHtml(faculty.campaignName)}</p>
                ${candidate.designation ? `<span class="candidate-designation">${escapeHtml(candidate.designation)}</span>` : ""}
              </div>
              <h3>${escapeHtml(candidate.name)}</h3>
              <p class="candidate-position">${escapeHtml(candidate.position)}</p>
              <span class="candidate-link">View full profile <span aria-hidden="true">↗</span></span>
            </div>
          </a>`
      )
      .join("");

    activateImageFallbacks(grid);
  }

  function findCandidate(id) {
    for (const faculty of data.faculties) {
      const candidate = faculty.candidates.find((item) => item.id === id);
      if (candidate) return { candidate, faculty };
    }
    return null;
  }

  function renderCandidate() {
    const match = findCandidate(params.get("id"));
    const content = document.querySelector("#profile-content");
    const backLink = document.querySelector("#profile-back-link");
    if (!content || !backLink) return;

    if (!match) {
      document.title = "Candidate Not Found | Beyond the Vote";
      content.innerHTML = `
        <section class="profile-error error-state">
          <p class="eyebrow"><span></span> Profile not found</p>
          <h1>This profile isn’t<br><em>available yet.</em></h1>
          <p>Return to the faculty directory to find an available candidate profile.</p>
          <a class="button button-primary" href="faculties.html">Choose a faculty <span class="button-icon" aria-hidden="true">→</span></a>
        </section>`;
      return;
    }

    const { candidate, faculty } = match;
    backLink.href = `candidates.html?faculty=${encodeURIComponent(faculty.id)}`;
    backLink.innerHTML = `<span aria-hidden="true">←</span> ${escapeHtml(faculty.shortName)} candidates`;
    const pageTitle = `${candidate.name} | ${faculty.shortName} | Beyond the Vote`;
    const pageDescription = `${candidate.name}, ${candidate.position}, ${faculty.fullName}.`;
    document.title = pageTitle;
    updateMeta('meta[name="description"]', pageDescription);
    updateMeta('meta[property="og:title"]', pageTitle);
    updateMeta('meta[property="og:description"]', pageDescription);

    content.innerHTML = `
      <article class="profile-layout">
        <div class="profile-portrait candidate-portrait">
          ${portraitMarkup(candidate, faculty)}
          <div class="profile-badge"><span>${escapeHtml(faculty.shortName)}</span><span>2026</span></div>
        </div>

        <div class="profile-details">
          <nav class="breadcrumbs" aria-label="Breadcrumb">
            <a href="faculties.html">Faculties</a><span aria-hidden="true">/</span>
            <a href="candidates.html?faculty=${encodeURIComponent(faculty.id)}">${escapeHtml(faculty.shortName)}</a><span aria-hidden="true">/</span>
            <span aria-current="page">Profile</span>
          </nav>
          <div class="profile-kicker">
            <p class="profile-campaign">${escapeHtml(faculty.campaignName)}</p>
            ${candidate.designation ? `<span class="candidate-designation">${escapeHtml(candidate.designation)}</span>` : ""}
          </div>
          <h1>${escapeHtml(candidate.name)}</h1>
          <p class="profile-position">${escapeHtml(candidate.position)}</p>

          <div class="profile-facts">
            <div><span>Faculty</span><strong>${escapeHtml(faculty.shortName)}</strong></div>
            <div><span>Campaign</span><strong>${escapeHtml(faculty.campaignName)}</strong></div>
          </div>

          <section class="profile-section profile-statement" aria-label="Candidate statement">
            <p>${escapeHtml(candidate.statement)}</p>
          </section>

          <aside class="information-note">
            <span aria-hidden="true">i</span>
            <p>This website is for campaign information only. Voting does not take place here.</p>
          </aside>
        </div>
      </article>`;

    activateImageFallbacks(content);
  }

  if (page === "faculties") renderFaculties();
  if (page === "candidates") renderCandidates();
  if (page === "candidate") renderCandidate();
})();
