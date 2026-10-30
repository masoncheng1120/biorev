(function () {
  const bank = window.BIO_BANK;
  const letters = ["A", "B", "C", "D"];

  const state = {
    view: "home",
    mode: "mcq", // mcq | sq
    chapter: 0, // 0 = all
    index: 0,
    selected: null,
    checked: false,
    score: { right: 0, total: 0 }
  };

  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];

  function highlightKeywords(text, keywords = []) {
    let out = escapeHtml(text);
    (keywords || []).forEach((kw) => {
      if (!kw) return;
      const re = new RegExp(`(${escapeRegExp(kw)})`, "ig");
      out = out.replace(re, '<span class="kw">$1</span>');
    });
    return out;
  }
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeRegExp(s) {
    return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function imgTag(src, cls) {
    if (!src) return "";
    const c = cls || "lg";
    return `<img class="q-figure ${c}" src="${escapeHtml(src)}" alt="Question figure" loading="lazy" data-full="${escapeHtml(src)}">`;
  }
  function bindFigureLightbox(root) {
    const box = document.getElementById("fig-lightbox");
    if (!box || !root) return;
    root.querySelectorAll("img.q-figure").forEach((img) => {
      img.addEventListener("click", () => {
        const full = box.querySelector("img");
        full.src = img.getAttribute("data-full") || img.src;
        box.classList.add("show");
      });
    });
  }
  /** Render stem: prefers stemHtml; else escapes stem and appends images[]. */
  function formatStem(q) {
    if (q.stemHtml) return `<div class="rich">${q.stemHtml}</div>`;
    let html = `<div class="rich"><p>${escapeHtml(q.stem || "")}</p>`;
    if (q.passage) html += `<div class="passage-box">${escapeHtml(q.passage)}</div>`;
    const imgs = q.images || [];
    imgs.forEach((im) => {
      if (typeof im === "string") {
        html += imgTag(im, im.includes("/pages/") ? "page" : "lg");
      } else {
        html += imgTag(im.src, im.className || (String(im.src || "").includes("/pages/") ? "page" : "lg"));
        if (im.caption) html += `<div class="figure-caption">${escapeHtml(im.caption)}</div>`;
      }
    });
    if (imgs.some((im) => (typeof im === "string" ? im : im.src || "").includes("/pages/"))) {
      html += `<div class="figure-caption">Tip: click any figure to enlarge. Full page screenshots are included when the figure sits inside the original paper.</div>`;
    }
    if (q.optionImages && q.optionImages.length) {
      html += `<div class="option-figures">` + q.optionImages.map((im, i) => {
        const src = typeof im === "string" ? im : im.src;
        const lab = (typeof im === "object" && im.label) ? im.label : letters[i];
        return `<div class="fig-opt"><strong>${escapeHtml(lab)}</strong>${imgTag(src, "sm")}</div>`;
      }).join("") + `</div>`;
    }
    html += `</div>`;
    return html;
  }
  function formatOption(opt) {
    if (opt == null) return "";
    if (typeof opt === "string") return escapeHtml(opt);
    // { text?, html?, image? }
    let body = "";
    if (opt.html) body += opt.html;
    else if (opt.text) body += escapeHtml(opt.text);
    if (opt.image) body += imgTag(opt.image, "sm");
    return body;
  }
  function stemPreview(q) {
    const s = q.stem || "";
    const base = s.slice(0, 90) + (s.length > 90 ? "…" : "");
    return (q.images || q.stemHtml || q.optionImages) ? "🖼 " + (base || "(diagram / screenshot question)") : base;
  }


  function filteredMCQ() {
    // state.chapter === 0 means All chapters
    if (!state.chapter) return bank.mcqs.slice();
    return bank.mcqs.filter((q) => q.chapter === state.chapter);
  }
  function filteredSQ() {
    if (!state.chapter) return bank.structured.slice();
    return bank.structured.filter((q) => q.chapter === state.chapter);
  }

  function chapterName(id) {
    const c = bank.chapters.find((x) => x.id === id);
    return c ? `Ch ${c.id}: ${c.title}` : "All chapters";
  }

  function syncChapterSelects() {
    const v = String(state.chapter || 0);
    ["mcq-chapter", "sq-chapter", "browse-chapter"].forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.value !== v) el.value = v;
    });
  }

  function setChapter(ch) {
    const n = Number(ch);
    state.chapter = Number.isFinite(n) && n > 0 ? n : 0;
    syncChapterSelects();
  }

  function setView(view, opts = {}) {
    state.view = view;
    $$(".panel").forEach((p) => p.classList.toggle("active", p.id === `view-${view}`));
    $$(".nav button[data-view]").forEach((b) =>
      b.classList.toggle("active", b.dataset.view === view)
    );
    syncChapterSelects();
    if (view === "mcq") {
      state.mode = "mcq";
      if (!opts.preserveIndex) {
        state.index = 0;
        state.selected = null;
        state.checked = false;
      }
      renderMCQ();
    }
    if (view === "sq") {
      state.mode = "sq";
      if (!opts.preserveIndex) {
        state.index = 0;
      }
      renderSQ();
    }
    if (view === "home") renderHome();
    if (view === "browse") renderBrowse();
  }

  function renderHome() {
    const counts = bank.chapters.map((c) => {
      const mc = bank.mcqs.filter((q) => q.chapter === c.id).length;
      const sq = bank.structured.filter((q) => q.chapter === c.id).length;
      return `<article class="card">
        <h3>${c.short}: ${c.title}</h3>
        <p>${escapeHtml(c.topics)}</p>
        <div class="meta">
          <span class="chip">${mc} MCQs</span>
          <span class="chip">${sq} structured</span>
        </div>
        <div class="hero-actions">
          <button class="btn primary" data-go-mcq="${c.id}">MCQ practice</button>
          <button class="btn" data-go-sq="${c.id}">Structured practice</button>
        </div>
      </article>`;
    }).join("");
    $("#chapter-grid").innerHTML = counts;
    $$("#chapter-grid [data-go-mcq]").forEach((btn) =>
      btn.addEventListener("click", () => {
        setChapter(btn.dataset.goMcq);
        setView("mcq");
      })
    );
    $$("#chapter-grid [data-go-sq]").forEach((btn) =>
      btn.addEventListener("click", () => {
        setChapter(btn.dataset.goSq);
        setView("sq");
      })
    );
    $("#stat-mcq").textContent = String(bank.mcqs.length);
    $("#stat-sq").textContent = String(bank.structured.length);
  }

  function renderMCQ() {
    const list = filteredMCQ();
    if (!list.length) {
      $("#mcq-root").innerHTML = `<div class="q-card"><p>No MCQs for this filter.</p></div>`;
      return;
    }
    if (state.index >= list.length) state.index = 0;
    const q = list[state.index];
    $("#mcq-progress").textContent = `Question ${state.index + 1} / ${list.length} · Score ${state.score.right}/${state.score.total}`;

    const opts = q.options
      .map((opt, i) => {
        let cls = "option";
        if (state.selected === i) cls += " selected";
        if (state.checked) {
          if (i === q.correct) cls += " correct";
          else if (state.selected === i) cls += " wrong";
        }
        return `<button type="button" class="${cls}" data-opt="${i}" ${state.checked ? "disabled" : ""}>
          <span class="letter">${letters[i]}</span>
          <span class="opt-body">${formatOption(opt)}</span>
        </button>`;
      })
      .join("");

    let feedback = "";
    if (state.checked) {
      const ok = state.selected === q.correct;
      feedback = `<div class="feedback show ${ok ? "ok" : "bad"}">
        <strong>${ok ? "Correct" : "Not quite"}.</strong>
        Answer: <strong>${letters[q.correct]}</strong>.
        ${q.explanation ? `<div style="margin-top:0.4rem">${escapeHtml(q.explanation)}</div>` : ""}
        <div style="margin-top:0.4rem;font-size:0.85rem;color:var(--muted)">Source: ${escapeHtml(q.source)} · ${q.answerSource === "suggested" ? "Suggested answer — verify with teacher" : "From provided marking scheme"}</div>
      </div>`;
    }

    $("#mcq-root").innerHTML = `
      <div class="q-card">
        <div class="q-head">
          <div class="q-id">${escapeHtml(chapterName(q.chapter))} · ${escapeHtml(q.id)}</div>
          ${(q.images || q.stemHtml || q.optionImages) ? '<span class="chip img">Has figure</span>' : ''}${q.answerSource === "suggested" ? '<span class="chip warn">Suggested key</span>' : '<span class="chip">Provided key</span>'}
        </div>
        <div class="stem">${formatStem(q)}</div>
        <div class="options">${opts}</div>
        ${feedback}
        <div class="actions">
          <button class="btn primary" id="mcq-check" ${state.selected === null || state.checked ? "disabled" : ""}>Check answer</button>
          <button class="btn" id="mcq-next" ${!state.checked ? "disabled" : ""}>Next</button>
          <button class="btn ghost" id="mcq-reveal" ${state.checked ? "disabled" : ""}>Reveal answer</button>
        </div>
      </div>`;

    bindFigureLightbox($("#mcq-root"));
    $$("#mcq-root .option").forEach((btn) =>
      btn.addEventListener("click", () => {
        state.selected = Number(btn.dataset.opt);
        renderMCQ();
      })
    );
    $("#mcq-check")?.addEventListener("click", () => {
      if (state.selected === null) return;
      state.checked = true;
      state.score.total += 1;
      if (state.selected === q.correct) state.score.right += 1;
      renderMCQ();
    });
    $("#mcq-reveal")?.addEventListener("click", () => {
      state.checked = true;
      if (state.selected === null) state.selected = q.correct;
      renderMCQ();
    });
    $("#mcq-next")?.addEventListener("click", () => {
      state.index = (state.index + 1) % list.length;
      state.selected = null;
      state.checked = false;
      renderMCQ();
    });
  }

  function renderSQ() {
    const list = filteredSQ();
    if (!list.length) {
      $("#sq-root").innerHTML = `<div class="q-card"><p>No structured questions for this filter.</p></div>`;
      return;
    }
    if (state.index >= list.length) state.index = 0;
    const q = list[state.index];
    $("#sq-progress").textContent = `Question ${state.index + 1} / ${list.length}`;

    const partsHtml = q.parts
      .map(
        (p) => `
      <div class="mark-point" style="background:#fff">
        <strong>${escapeHtml(p.label)}</strong> <span class="marks">${p.marks} mark${p.marks > 1 ? "s" : ""}</span>
        <div style="clear:both;margin-top:0.4rem;color:var(--muted);font-size:0.9rem">Write your answer, then reveal the marking scheme.</div>
      </div>`
      )
      .join("");

    const schemeHtml = q.parts
      .map((p) => {
        const points = (p.scheme || [])
          .map(
            (mp) => `<div class="mark-point">
            <span class="marks">${mp.marks}</span>
            <div>${highlightKeywords(mp.text, mp.keywords)}</div>
          </div>`
          )
          .join("");
        return `<h4>${escapeHtml(p.label)}</h4>${points}`;
      })
      .join("");

    $("#sq-root").innerHTML = `
      <div class="q-card">
        <div class="q-head">
          <div>
            <div class="q-id">${escapeHtml(chapterName(q.chapter))} · ${escapeHtml(q.id)} · ${q.marks} marks</div>
            <h2 style="margin:0.2rem 0 0;font-size:1.25rem">${escapeHtml(q.title)}</h2>
          </div>
          ${q.answerSource === "suggested" ? '<span class="chip warn">Suggested MS</span>' : '<span class="chip">Provided MS</span>'}
        </div>
        ${q.note ? `<div class="note">${escapeHtml(q.note)}</div>` : ""}
        <div class="stem">${formatStem(q)}</div>
        ${partsHtml}
        <label class="field" style="margin-top:0.8rem"><span>Your notes / draft answer</span>
          <textarea id="sq-draft" placeholder="Type key points here (saved only in this session)…"></textarea>
        </label>
        <div class="actions">
          <button class="btn primary" id="sq-toggle">Show marking scheme</button>
          <button class="btn" id="sq-next">Next question</button>
          <button class="btn ghost" id="sq-prev">Previous</button>
        </div>
        <div class="scheme" id="sq-scheme">
          <h4>Marking scheme — focus on <span class="kw">KEY WORDS</span> and mark allocation</h4>
          <p style="color:var(--muted);font-size:0.9rem;margin-top:0">Source: ${escapeHtml(q.source)}. Yellow highlights = important wording for marks.</p>
          ${schemeHtml}
        </div>
      </div>`;

    bindFigureLightbox($("#sq-root"));
    $("#sq-toggle").addEventListener("click", () => {
      const el = $("#sq-scheme");
      const open = el.classList.toggle("show");
      $("#sq-toggle").textContent = open ? "Hide marking scheme" : "Show marking scheme";
    });
    $("#sq-next").addEventListener("click", () => {
      state.index = (state.index + 1) % list.length;
      renderSQ();
    });
    $("#sq-prev").addEventListener("click", () => {
      state.index = (state.index - 1 + list.length) % list.length;
      renderSQ();
    });
  }

  function renderBrowse() {
    const mc = filteredMCQ()
      .map(
        (q) => `<button class="list-item" data-open-mcq="${q.id}">
        <span><strong>${escapeHtml(q.id)}</strong> — ${escapeHtml(stemPreview(q))}</span>
        <span class="chip">Ch ${q.chapter}</span>
      </button>`
      )
      .join("");
    const sq = filteredSQ()
      .map(
        (q) => `<button class="list-item" data-open-sq="${q.id}">
        <span><strong>${escapeHtml(q.id)}</strong> — ${escapeHtml(q.title)}</span>
        <span class="chip">${q.marks} m</span>
      </button>`
      )
      .join("");
    $("#browse-mcq").innerHTML = mc || "<p>None</p>";
    $("#browse-sq").innerHTML = sq || "<p>None</p>";
    $$("#browse-mcq [data-open-mcq]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const qid = btn.dataset.openMcq;
        const q = bank.mcqs.find((x) => x.id === qid);
        if (!q) return;
        // Keep current All-chapters filter; if a single chapter is selected and
        // somehow mismatched, switch to the question's chapter.
        if (state.chapter && q.chapter !== state.chapter) {
          setChapter(q.chapter);
        }
        const list = filteredMCQ();
        const idx = list.findIndex((x) => x.id === qid);
        state.index = idx >= 0 ? idx : 0;
        state.selected = null;
        state.checked = false;
        setView("mcq", { preserveIndex: true });
      })
    );
    $$("#browse-sq [data-open-sq]").forEach((btn) =>
      btn.addEventListener("click", () => {
        const qid = btn.dataset.openSq;
        const q = bank.structured.find((x) => x.id === qid);
        if (!q) return;
        if (state.chapter && q.chapter !== state.chapter) {
          setChapter(q.chapter);
        }
        const list = filteredSQ();
        const idx = list.findIndex((x) => x.id === qid);
        state.index = idx >= 0 ? idx : 0;
        setView("sq", { preserveIndex: true });
      })
    );
  }

  function fillChapterSelects() {
    const opts =
      `<option value="0">All chapters</option>` +
      bank.chapters.map((c) => `<option value="${c.id}">Ch ${c.id}: ${c.title}</option>`).join("");
    $("#mcq-chapter").innerHTML = opts;
    $("#sq-chapter").innerHTML = opts;
    $("#browse-chapter").innerHTML = opts;
  }

  function onChapterChange(raw) {
    setChapter(raw);
    state.index = 0;
    state.selected = null;
    state.checked = false;
    if (state.view === "mcq") renderMCQ();
    else if (state.view === "sq") renderSQ();
    else if (state.view === "browse") renderBrowse();
  }

  function bind() {
    $$(".nav button[data-view]").forEach((b) =>
      b.addEventListener("click", () => setView(b.dataset.view))
    );
    $("#mcq-chapter").addEventListener("change", (e) => onChapterChange(e.target.value));
    $("#sq-chapter").addEventListener("change", (e) => onChapterChange(e.target.value));
    $("#browse-chapter").addEventListener("change", (e) => onChapterChange(e.target.value));
    $("#start-mcq").addEventListener("click", () => {
      setChapter(0);
      setView("mcq");
    });
    $("#start-sq").addEventListener("click", () => {
      setChapter(0);
      setView("sq");
    });
  }

  fillChapterSelects();
  const lb = document.getElementById("fig-lightbox");
  if (lb) {
    lb.addEventListener("click", () => lb.classList.remove("show"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lb.classList.remove("show");
    });
  }
  bind();
  setView("home");
})();
