# Hi, I'm Jason 👋

**Senior Data Scientist / Strategic Analytic Actuary (FIAA)**

> 12+ years transforming complex data into actionable insights for the insurance and financial services sectors.

**🌐 Site:** <https://jasonzheshiou.github.io> — who I am, two measured studies, and how these repositories interlock as one open actuarial AI ecosystem.

---

## 🔬 The research, first

**[Life Insurance Experience Bench](https://github.com/jasonzheshiou/Life_Insurance_Experience_Bench)** —
47 sealed synthetic portfolios (250 000 policies each, Death / CI / TPD / IP), two Qwen 27B models crossed with
two harnesses, scored strict on a held-out split with false alarms counted.

| measured | result |
|---|---|
| strict accuracy (best cell) | **71.2 %** — 79 hits / 111 units |
| false alarms when it spoke | **41.9 %** (precision 58.1 %) |
| does a harness transfer between models? | **no** — cross-loading cost 0.9 accuracy, 1.2 precision points |
| tuning split → unseen books | **−32.1 / −28.6 points** for the two models |
| cost of the same exam | 0.89 M tokens / 5.9 h vs **1.95 M / 21.9 h** |

Data comes from [Synthetic_Life_Insurance_Data_Generator](https://github.com/jasonzheshiou/Synthetic_Life_Insurance_Data_Generator)
(deterministic, seed 42, planted controls on actuals only). Findings and provenance:
<https://jasonzheshiou.github.io/research/findings.html>.

## 📐 The second study: output variance

**[Multi-Agents_Underwriter](https://github.com/jasonzheshiou/Multi-Agents_Underwriter)** — the same applicant run
through the LLM decision path ~100 times, with Wilson 95 % intervals on every proportion. Measured on
Qwen3.6-35B-A3B (local, temperature 0.1); synthetic applicants, no ground truth, so this measures **consistency,
not accuracy**.

| measured | result |
|---|---|
| deterministic rule path | **0 %** variance across 600 runs |
| LLM path, clear → borderline cases | **0 % → 26 % → 42 %** (widest evidence path 47 %) |
| temperature 0.1 → 0.0 | changed the **decision** (decline 58 % / loading 42 % → flat loading) |
| debate + most-conservative combine | **100/100** identical, absorbing a ~20 % agent variance |

Findings, method and governance asks:
<https://jasonzheshiou.github.io/research/underwriting-output-variance.html>.

## 🛠 How the work actually gets done

Built in broken time between a full-time job and childcare, which forced a method:

- **Agent-loop execution** — delegate the loop, not the line: a written contract, an execution surface, an artefact
  trail and a stopping rule. The underwriter's application code was written by the local model it studies; the
  benchmark's harness was built by an agent on a third model, so no model tuned the exam it sat.
- **Black-box behavioural verification** — one hypothesis, one edit, re-check the neighbours, keep or revert,
  snapshot the bytes. Held-out results never feed tuning. Steering happens outside the model: prompts, harness,
  rules, combine rules, sampling settings, tool surface.
- **Asynchronous human-in-the-loop** — write the handoff document, launch the unattended run, leave, get pinged when
  the shared server frees up, return as the supervisor and validation checkpoint. Resume is the default
  (`--skip-existing`, `flock`, one status line).

Method write-up with the evidence: <https://jasonzheshiou.github.io/method.html>.

---

## About Me

I'm a **Fellow of the Institute of Actuaries of Australia (FIAA)** with deep experience in regulated environments. My expertise spans machine learning in production, predictive underwriting, data integration, business intelligence, and process automation.

I thrive at the intersection of **technical depth** and **executive communication** - turning complex datasets into clear, strategic insights that drive measurable business outcomes.

Beyond the day job, I'm passionate about **AI cooperation** - building tools where humans and models work together, not in competition. I believe the best systems don't replace people; they amplify them. I'm actively exploring how AI can augment analytical workflows, improve data governance, and help teams make better decisions, faster.

---

## 🔧 Tech Stack

<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
  <img src="https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=postgresql&logoColor=white" alt="SQL"/>
  <img src="https://img.shields.io/badge/VBA-503A77?style=for-the-badge&logo=microsoft-excel&logoColor=white" alt="VBA"/>
  <img src="https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=powerbi&logoColor=black" alt="Power BI"/>
  <img src="https://img.shields.io/badge/Excel-217346?style=for-the-badge&logo=microsoft-excel&logoColor=white" alt="Excel"/>
</p>

<p>
  <img src="https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" alt="pandas"/>
  <img src="https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white" alt="Streamlit"/>
  <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="scikit-learn"/>
  <img src="https://img.shields.io/badge/Generative_AI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="Generative AI"/>
  <img src="https://img.shields.io/badge/Graphviz-2E8B57?style=for-the-badge&logo=graphviz&logoColor=white" alt="Graphviz"/>
</p>

---

## 💼 Experience

### **Pacific Life Re** — Senior Data Scientist / Strategic Analytic Actuary (FIAA)
*Jun 2025 – Present · Sydney, NSW*

- **Predictive Underwriting ML** — Built and productionised a machine learning solution to increase STS outcomes while controlling portfolio risk across a multi-benefit suite with application-level decisioning.
- **End-to-End Modelling Ownership** — Owned the full modelling lifecycle: data processing, time-based validation/OOT testing, feature selection/tuning, threshold optimisation, and sensitivity analysis aligned to business risk tolerances.
- **Production Deployment** — Defined client implementation approach (packaging/container options, environment requirements, JSON I/O conventions) and partnered with engineering/architecture to enable secure deployment and retraining.
- **Governance & Approvals** — Assisted in governance and approvals across underwriting, pricing, technology, risk, model risk, legal/privacy, and information security. Created monitoring plans and internal/external documentation variants.
- **Adviser & Portfolio Analytics** — Developed adviser/portfolio analytics and a ranking methodology to support partner relationship management through **Streamlit**.
- **Programme Management** — Managed competing priorities across simultaneous programmes, balancing delivery timelines and stakeholder needs through clear prioritisation and proactive communication.

### **Resolution Life Australasia** — Data Scientist / Actuary (FIAA)
*Apr 2020 – Jun 2025 · Sydney, NSW*

- **Data Integration & Quality** — Extracted, cleaned, and integrated large complex datasets using SQL and Python across Actuarial, Finance, IT, and Claims teams. Reduced reporting turnaround from **days to hours**.
- **Business Intelligence & Automation** — Designed interactive Power BI dashboards and Excel reports delivering real-time insights. Improved a critical KPI by **20% in 2024**.
- **Executive Reporting** — Authored comprehensive monthly performance reports and business papers for CEO, CFO, and external auditors.
- **Process Improvement** — Automated workflows using VBA and Python, securing Senior Leadership endorsement for newly implemented performance metrics.
- **Emerging Technologies** — Explored generative AI and deep learning to refine data models and support predictive evaluation of workforce and operational impacts.

### **Zurich Financial Services Australia** — Data Analyst / Actuarial Analyst
*May 2013 – Apr 2020 · Sydney, NSW*

- **Financial Modeling** — Designed and maintained complex financial models integrating multiple data sources for robust risk assessment and forecasting.
- **Automation** — Streamlined multimillion-dollar monthly transactions using Excel, VBA, and SQL. Increased process efficiency by **60%**.
- **Cross-Functional Collaboration** — Partnered with actuarial, finance, and legal teams to enhance data integration and ensure regulatory compliance.
- **Self-Taught Development** — Independently mastered Python, SQL, VBA, and Power BI to expand analytical capabilities and deliver actionable insights to senior stakeholders.

---

## 🎓 Credentials

| Credential | Issued By | Date |
|------------|-----------|------|
| **FIAA** — Fellow of the Institute of Actuaries of Australia | Actuaries Institute | Dec 2021 |
| Credential ID: 19258 | | |

---

## 🚀 Featured Projects

<table>
  <tr>
    <td width="50%">
      <h3>🔍 Data Schema Analyser</h3>
      <p>LLM-powered web application that analyzes data dictionaries, generates pandas join strategies, ERD diagrams, and executable code — all through a Streamlit interface.</p>
      <p><i>Python · Streamlit · pandas · OpenAI · Graphviz</i></p>
      <a href="https://github.com/jasonzheshiou/Data_Schema_analyser">View Project →</a>
    </td>
    <td width="50%">
      <h3>📊 EA Dashboard</h3>
      <p>Interactive analytics dashboard for experience analysis and performance monitoring.</p>
      <p><i>Python · Data Visualization · Analytics</i></p>
      <a href="https://github.com/jasonzheshiou/Life_Insurance_Experience_Analysis_Dashboard">View Project →</a>
    </td>
  </tr>
</table>

---

## 📫 Connect

- **LinkedIn:** [linkedin.com/in/zheshi-jason-ou](https://www.linkedin.com/in/zheshi-jason-ou-8780203a)
- **GitHub:** [@jasonzheshiou](https://github.com/jasonzheshiou)

---

<p align="center">
  <em>"Turning data into decisions, one insight at a time."</em>
</p>

---

## 🌐 This repository also serves the site

`jasonzheshiou.github.io` is built from the root of this repository: six hand-authored pages, plain HTML/CSS/JS,
**no build step, no dependencies, no analytics** — charts are hand-drawn SVG plotted from the benchmark's
published CSVs.

```
index.html                              the front door — the motion edition, authored here
research/life-insurance-experience-bench.html   the flagship write-up
research/findings.html                  eight measured findings
ecosystem.html                          how the 13 repos interlock
projects.html · about.html · method.html · pixel.html · writing.html · 404.html
posts/                                  one page per post, built from ../posts/*.md
feed.xml                                RSS for the published posts, built from the same files
assets/site.css · site.js · charts.js   one stylesheet, three small scripts, shared
assets/motion.css · motion.js           the behaviour layer: pointer, scroll timelines, the traverse
assets/sprite.html                      22 inline icons
assets/pixel-sprite.html                the same 22 as pixel art
assets/pixel-sheet.png                  all 22 glyphs on one contact sheet, 3.6 KB
archive/line/ · archive/pixel/          two older drawings of the site, generated and noindexed
```

### One site, two archived drawings

`/` is the site: vector strokes, plus the behaviour in `motion.css` and `motion.js` — a pointer light, eased
parallax, scroll-driven reveals written as CSS scroll timelines, a reading rail, magnetic nav, tilt-and-light
surfaces, figures that count up once and settle back onto the author's own string, and on the method page a
*traverse*: a review plane you move across the decision chain while the ledger marks the station you are standing
at. Every one of those behaviours is switched off by `prefers-reduced-motion: reduce`, or is simply inert where
there is no pointer to follow. `?pointer=force` re-arms the pointer layer on a machine that misreports itself.

Two older drawings are kept under `/archive/`, generated from these pages rather than hand-copied, `noindex` and
disallowed in `robots.txt`: **`/archive/line/`** is the same site with the behaviour stripped back out, and
**`/archive/pixel/`** draws the same 22 glyphs as 32 × 32 pixel art with the Bresenham and midpoint primitives
from [Pixel_Storybook](https://github.com/jasonzheshiou/Pixel_Storybook), a pixel typeface and flat surfaces;
nine glyphs did not survive that conversion automatically and were redrawn by hand as character matrices. A
sentence corrected here is correct in both on the next run of `tools/build_archives.py`.

### Writing

Posts are Markdown in `posts/` with front matter (`title`, `date`, `summary`, `tags`, `status`, `linkedin`), built
by `tools/build_posts.py` into `/posts/*.html`, the `/writing.html` index and `/feed.xml`. Nothing renders at
request time and nothing third-party is involved: publishing is drop a file in, run the script, commit the output.
`status: draft` renders the page with a note on it and keeps it out of the index count and the feed; a `linkedin:`
line adds an "also published on LinkedIn" link, so a post can live here and point at its LinkedIn copy.


Two things worth knowing if you poke at it. A clone behind `<use>` is invisible to document CSS, so sprite shapes
carry presentation attributes driven by custom properties (`stroke="var(--ic-cyan)"`) rather than classes; the
first version painted black blobs while the markup looked perfect. And the pixel sheet is not inlined on the vector
site — it is fetched where it is actually shown, so the default page stays at 33 KB (9 KB gzipped) and the icons
still render with JavaScript switched off.

Preview locally, then push to `main`:

```bash
python3 -m http.server 8080       # then open http://127.0.0.1:8080
```

Settings → Pages → **Source: main branch, root folder**. Everything is MIT-licensed; every figure on the site
names the file and commit it came from.
