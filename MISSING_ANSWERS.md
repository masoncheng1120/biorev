# Missing / suggested answers — teacher verification list

Items below either had **no marking scheme in the source files**, used **partial/inferred keys**, or needed **generated suggested answers** so the site can run. Please verify or adjust.

Legend: `answerSource: suggested` in the live bank = needs your check.

---

## Image / screenshot questions — audit 2026-10-30 (HKT)

Every previously image-backed item was checked against the source paper. Wrong full-page screenshots, corrupted BiologyQuiz overlays, and unlabeled exports were replaced with **tight crops of the matching figure** or **removed**.

### Binding result (this fix)

| ID | Source used | Outcome |
|----|-------------|---------|
| `c2-mc15` | Ch02_MC `image5.jpeg` (starch granules) | **Fixed** — kept correct media |
| `img-c2-mc70` | Ch02_MC `image2.jpeg` (Aristo “chlorosis” Lamium photo) | **Fixed** — kept correct media (matches publisher photo credit) |
| `img-c2-mc73` | Ch02 page crop → `img/figures/c2_starch_setup.png` | **Fixed** — replaced full page |
| `img-c2-mc76` | Ch02 page crop → `c2_reaction_pathways.png` | **Fixed** |
| `img-c2-mc80` | Ch02_MC `image4.png` (nucleotide) | **Fixed** — kept correct media |
| `c5-mc04` | Ch5_Test p-2 crop → `c5_pepsin_graphs.png` | **Fixed** — removed extra Q5 page |
| `c5-mc05` | Ch5_Test p-2 crop → `c5_lipase_tubes.png` | **Fixed** — tubes X/Y/Z only |
| `c5-mc09` / `c5-mc10` | Ch05_MC p-3 crop → `c5_rate_substrate.png` | **Fixed** |
| `quiz-mc12` | Quiz EMF→PNG A/B/C → `quiz_rbc_ABC.png` + labeled crops | **Fixed** — rebuilt from originals; dropped corrupted page |
| `quiz-mc13` | Same lipase tubes figure as Ch5 Q5 | **Fixed** — removed corrupted `quiz/p-02` overlay |
| `quiz-mc15` | Quiz EMF `image12` → `quiz_hotspring_graphs.png` | **Fixed** |
| `img-c4-mc04` | ch4 p-3 crop → `c4_plasmolysis.png` | **Fixed** |
| `cte3-mc05`–`07` | cte ch3 p-02 crop → `cte3_plant_cell.png` | **Fixed** |
| `cte3-mc08`–`09` | cte ch3 p-03 crop → `cte3_cell_table.png` | **Fixed** — dropped extra page |
| `cte4-mc04` | cte ch4 p-02 → `cte4_xy_graph.png` | **Fixed** |
| `cte4-mc05` | cte ch4 p-02 → `cte4_dialysis.png` | **Fixed** |
| `cte4-mc09` | cte ch4 p-04 → `cte4_equilibrium.png` | **Fixed** |
| `cte4-mc10` | cte ch4 p-04 → `cte4_process_xy.png` | **Fixed** — no longer shows Q9 |
| `cte5-mc06` | cte ch5 p-02 → `cte5_catalase_graphs.png` | **Fixed** |
| `cte5-mc10` | cte ch5 p-04 → `cte5_washing.png` | **Fixed** |
| `c1-sq04` | Ch1 pages → Fleming crops | **Fixed** |
| `c2-sq04` | Ch2_Test crops nucleotide + H-bond | **Fixed** — dropped full pages |
| `c3-sq02` | Ch3_Test animal-cell diagram only | **Fixed** — dropped page that showed filled answers |
| `c3-sq03` | Ch3_Test prok/euk crop | **Fixed** |
| `c4-sq01` | cte ch4 fluid-mosaic crop | **Fixed** |
| `c5-sq01` | Ch5_Test protease graphs crop | **Fixed** |
| `quiz-sq19` | Quiz PDF p-05 EM crop → `quiz_em_cell.png` | **Fixed** |
| `quiz-sq21` | Quiz `image19` enlarged → `quiz_potato_graph.png` | **Fixed** — dropped corrupted overlay page |
| `quiz-sq25` | Refreshed `image24`+`image25` → `quiz_enzyme_X.png` | **Fixed** |
| `cte2-sq14` | cte ch2 lemon-tea + labels crops | **Fixed** |
| `cte4-sq13` | cte ch4 osmosis setup+graph crop | **Fixed** |
| `cte4-sq14` | cte ch4 potato-strip crops | **Fixed** |
| `cte5-sq11` | potato table only (`cte5_potato_table.png`) | **Fixed** — removed washing-powder page that was wrongly attached |
| `cte5-sq13` | sucrase data page crops | **Fixed** |
| `quiz-sq18` | BiologyQuiz DNA media | **Removed** — no X/Y/Z/A/guanine labels in export |
| `quiz-sq22` | BiologyQuiz fluid-mosaic JPEG | **Removed** — no A/B/C labels in export |

### Remaining risks (honest)

| Risk | Detail |
|------|--------|
| BiologyQuiz Word/EMF | LibreOffice page renders are **corrupt overlays**; do not re-attach `img/pages/quiz/p-*.png` as question figures. |
| `quiz-sq18`, `quiz-sq22` | Letter labels lived in Word textboxes and did not land in exported media. Need teacher re-export or screenshots of the labeled diagrams. |
| `quiz-sq21` graph | Tiny source PNG; enlarged with axis caption added manually — values match source trend but axis titles are not from the original Word art. |
| `img-c2-mc70` photo | Publisher file is Wikimedia *Lamium* labeled “chlorosis” in Aristo — looks variegated; kept because it is the **source** figure. |
| Some “tight crops” still include a little surrounding question text | Intentional so axes/labels stay readable; no longer show a *different* question’s graph. |
| Aristo TE packs | CTE pages are teacher-edition PDFs; crops avoid answer keys where possible, but nearby answer lines may still appear on structured pages. |

---

## Chapter 1 — suggested / incomplete

| ID | Stem cue | Status |
|----|----------|--------|
| `c1-mc11` | Nature of science — “based on evidence” | **Suggested** MCQ (NOS.docx list used as guide). |
| `c1-mc12` | Venus flytrap → sensitivity | **Suggested** (Quiz1 style). |
| `c1-sq04` | Fleming NOS structured | MS **provided**; passage + page screenshots now embedded — please still spot-check wording. |

Ex1 fill-in for “seven characteristics of life” blanks (nutrition/respiration/…) were not fully captured as a separate SQ; Quiz1 covers the seven characteristics with a full key.

---

## Chapter 2 — notes

Most Ch2 MCQs/SQs use **provided** keys (`Ch2_Test`, `Ch02_MC/SQ/LQ`, `Ex2`).

| ID / item | Note |
|-----------|------|
| `Ch2_Retest_MS` vs `Ch2_Test` | Retest MS answers differ for some matching / carbohydrate ID items (different paper). Site uses **Ch2_Test** keys for that paper’s MCQs. |
| `Ex2` Q1 diagram (classification of chemicals) | Diagram not extracted; SQ not added. |
| `Ex3` phospholipid Y / triglyceride compare | Answers present in file; condensed into bank via other lipid items. |

---

## Chapter 3 — many suggested (no MCQ paper; thin MS)

`Ch3_Test.doc` has **no MCQ section** and only **partial** answers typed into the paper. `Ex4`, `Ex5`, `Quiz3` lack complete standalone MS files.

| ID | Stem cue | Status |
|----|----------|--------|
| `c3-mc01`–`c3-mc10` | Cell theory, ribosomes, RER, mitochondria, prokaryote, plant features, organisation levels, chloroplast, cellulose wall, nucleus | **All suggested** MCQs for practice coverage. |
| `c3-sq01` | Cell theory + organisation blanks | **Suggested** |
| `c3-sq02` | Animal cell A–E | Names/functions partly in paper; comparison answers **inferred/suggested** where incomplete. Confirm label letters match your diagram. |
| `c3-sq04` | Four animal vs plant differences (`Ex4`) | **Suggested** (no MS file). |
| `c3-sq05` | Organelle fill-ins (`Quiz3`) | **Suggested** (Quiz3 extract had questions without full key). |

`c3-sq03` prokaryote/eukaryote differences: key points appear in `Ch3_Test` itself — treated as provided.

---

## Chapter 4 — mostly provided

`HKDSE_Marking_Scheme.docx` is the **Ch4 test MS** (full). `Ex6_answer` covers Exercise 6.

| ID | Note |
|----|------|
| `c4-mc05`–`c4-mc10` | Extra worded MCQs on osmosis / fluid mosaic / active transport / dialysis / channels | **Suggested** (to reach ~10 MCQs; Ch4 test only had 5 MCQs). |
| `c4-mc01`–`c4-mc04` | From Ch4 test | **Provided** |

Fill-in membrane-protein table from Ch4 is in the MS but not duplicated as its own SQ (osmosis table is `c4-sq05`).

---

## Chapter 5 — mostly provided

Strong coverage from `Ch5_Test`, `Ch05_MC`, `Ch05_SQ`, `Enzyme_Parallel_MS`, `Ex7`.

| ID / item | Note |
|-----------|------|
| `Ch5_Test` Q1(a) reaction figure | Figure missing in text; MS says **catabolic** protein→amino acids — used in `c5-sq05`. |
| `Ch5_Test` Q2(b)/(c)/(d) graph MS | Some lines in extract look garbled (mentions pH 6 / enzyme X while question is protease P pH 8). Site uses **Enzyme_Parallel_MS** (cleaner 10-mark scheme) for `c5-sq01`. Please confirm graphs: optimum **40 °C, pH 8**. |
| Lipase milk tubes diagram (`Ch5_Test` Q5) | Options interpreted from MS key **D**; confirm tube contents (boiled enzyme = Z). |

---

## What you should do next

1. Open `/workspace/biology-site/index.html` in a browser and spot-check each chapter.
2. For every chip **“Suggested key / Suggested MS”**, edit the item in `data/questions.js` or tell the agent your corrections.
3. Spot-check image questions (chip **Has figure**) on a local browser — screenshots live under `img/`.
4. Tell me any wrong keys or cropped figures to fix.

---

*Generated for Cheng Man Hei · HKDSE S4 Biology · Chapters 1–5 practice site.*

---

## Aristo ChTest TE pack (added 2026-10-30)

Zips contained Teacher Edition chapter tests (PDF+DOC) for Ch1–Ch5 (*HKDSE BIOLOGY: Connecting Concepts*, Aristo).

### Per-zip contents
| Zip | Files |
|-----|--------|
| `01M63EW5XZAXV2EKNR491BM41E` | `ChTest_01_e_TE` (Intro to biology) |
| `01M63EW5W4ST1AAHQTWYJPFQ8J` | `ChTest_02_e_TE` (Molecules of life) |
| `01M63F8HF8A1TZ7RD83CN554SX` | `ChTest_03_e_TE` (Cellular organization) |
| `01M63F3N0ZF6Z9VTD7GBG4XA71` | `ChTest_04_e_TE` (Membrane transport) |
| `01M63EW5W2BDXXHSEREF8MJD64` | `ChTest_05_e_TE` (Metabolism and enzymes) |

### Overlaps skipped (already in bank)
- **Ch1** MCQs 1–10 (= `c1-mc01`–`10`); Fleming SQ (= `c1-sq04`)
- **Ch2** MCQs 1–10 (= `c2-mc01`–`10`); DNA nucleotide SQ (= `c2-sq04`)
- **Ch3** Animal-cell labelling TE Q11 ≈ `c3-sq02`; prokaryote TE Q12 ≈ `c3-sq03` (skipped; existing kept)
- **Ch4** MCQs 1–3 (= `c4-mc01`–`03`); plasmolysis Q6 (= `img-c4-mc04`); living-cells Q8 (= `c4-mc04`); fluid-mosaic / egg SQs ≈ `c4-sq01`/`02`
- **Ch5** lock-and-key Q4 (= `c5-mc02`); pepsin graphs Q7 (= `c5-mc04`); lipase tubes Q8 (= `c5-mc05`/`quiz-mc13`); inhibitors Q9 (= `c5-mc03`)

### Added (all `answerSource: provided` from TE MS)
MCQs: `cte3-mc01`, `cte3-mc04`–`10` (microscope-use `cte3-mc02`/`cte3-mc03` removed), `cte4-mc04/05/07/09/10`, `cte5-mc01/02/03/05/06/10`  
SQs: `cte1-sq11`, `cte2-sq11/13/14`, `cte3-sq13` (`cte3-sq14` microscope practical removed), `cte4-sq13/14`, `cte5-sq11/12/13/14`


### Removed (not examined — microscope use)
| ID | Reason |
|----|--------|
| `cte3-mc02` | Light-microscope technique (field of view / objective / iris) |
| `cte3-mc03` | What is visible under LM at 400× (microscope resolution) |
| `cte3-sq14` | Aristo ChTest_03 light-microscope practical (magnification, stain, iris, LM vs EM use) |

Kept: `cte3-mc01` (Hooke → cell theory, microscope in passing); `quiz-sq19` (EM organelle ID / scale-bar cell biology, not practical microscope use).

### Notes for teacher check
| ID | Note |
|----|------|
| `cte2-sq11` | TE MS pairs Mg→C,D and Fe→B,C — unusual vs typical textbook (Mg–chlorophyll only; Fe–haemoglobin only). Left as **provided** TE key; confirm if you want school key instead. |
| `cte3-mc05`–`07` | Share plant-cell diagram screenshot `img/pages/cte/ch3/p-02.png`. |
| `cte4-mc09` | Equilibrium diagram options are figure-only — screenshot page required. |
| Diagram-heavy items | Page screenshots under `img/pages/cte/ch{1–5}/`. |

No new **suggested** answers this round (TE includes full marking schemes).
