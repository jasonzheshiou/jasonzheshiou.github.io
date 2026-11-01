# Jason Ou

Building open-source life insurance AI ecosystems · Strategic Analytic Actuary (FIAA) · Senior Data Scientist

> Code is being commoditised, the chart was never issued, and what is left is judgement. A Fellow of
> the Institute of Actuaries of Australia, publishing the architecture and governance of AI in life
> insurance as I build it.

---

## Projects

#### Test whether a model can read actuarial experience

`THE BENCHMARK`

Sealed exams and a scorer that counts inventions, so a claim about a model is a measured thing.

[Life_Insurance_Experience_Bench](https://github.com/jasonzheshiou/Life_Insurance_Experience_Bench)

#### Run an experiment without touching policyholder data

`THE DATA`

A life-insurance portfolio with the answer key sealed, generated on your own machine.

[Synthetic_Life_Insurance_Data_Generator](https://github.com/jasonzheshiou/Synthetic_Life_Insurance_Data_Generator)

#### Apply and audit a real experience-analysis method

`THE METHOD`

Credibility weighting, trend tests and model selection, with every step on the record.

[Life_Insurance_Experience_Analysis_Dashboard](https://github.com/jasonzheshiou/Life_Insurance_Experience_Analysis_Dashboard)

#### See where a human has to stay in an underwriting decision

`THE VARIANCE STUDY`

Three agents above a deterministic rule engine, and the same case landing differently each run.

[Multi-Agents_Underwriter](https://github.com/jasonzheshiou/Multi-Agents_Underwriter)

#### Check a process against APRA standards, with citations

`COMPLIANCE`

Questionnaires generated from your own knowledge base and cited to the standard, not paraphrased.

[Standard_Inquirer](https://github.com/jasonzheshiou/Standard_Inquirer)

#### Get the boring parts off your desk

`THE TOOLS`

Schema inspection, join planning, spreadsheet automation, and a watch that says when the shared model
server is free.

[LLM_Status_Watch](https://github.com/jasonzheshiou/LLM_Status_Watch)

---

## AI governance

**1 · Managing an LLM through a stochastic lens**

An LLM does not give the same answer twice to the same case. Running the same applicant through it
again and again, over a rule engine that never varies, measures that spread — which is the thing you
can set a risk appetite against and decide where a human has to stay.

[Multi-Agents_Underwriter](https://github.com/jasonzheshiou/Multi-Agents_Underwriter) ·
[Output variance in LLM underwriting](https://jasonzheshiou.github.io/research/underwriting-output-variance.html)

**2 · The coevolution of an LLM and its harness**

Sealed exams against a scorer that counts inventions, run across harnesses, to show how much of a
result belongs to the scaffolding rather than to the model.

[Life_Insurance_Experience_Bench](https://github.com/jasonzheshiou/Life_Insurance_Experience_Bench) ·
[The A/E benchmark study](https://jasonzheshiou.github.io/research/life-insurance-experience-bench.html)

---

## How the work gets done

Built in broken time between a full-time job and childcare, which forced a method.

- **Agent-loop execution** — delegate the loop, not the line: a written contract, an execution
  surface, an artefact trail and a stopping rule. The underwriter's application code was written by
  the local model it studies; the benchmark's harness was built by an agent on a third model, so no
  model tuned the exam it sat.
- **Behavioural verification** — one hypothesis, one edit, re-check the neighbours, keep or revert,
  snapshot the bytes. Held-out results never feed tuning. Steering happens outside the model:
  prompts, harness, rules, sampling settings, tool surface.
- **Asynchronous human-in-the-loop** — write the handoff document, launch the unattended run, leave,
  get pinged when the shared server frees up, return as the supervisor and validation checkpoint.
  Resume is the default.

The method, with its evidence: [method.html](https://jasonzheshiou.github.io/method.html).

---

## Working experience

**Pacific Life Re** — Senior Data Scientist / Strategic Analytic Actuary (FIAA)
*Jun 2025 – present · Sydney*

- Predictive underwriting that had to survive production — a machine learning solution to increase STS
  outcomes while controlling portfolio risk across a multi-benefit suite, with decisioning at
  application level.
- The modelling lifecycle owned end to end: data processing, time-based validation and out-of-time
  testing, feature selection and tuning, threshold optimisation, sensitivity analysis against stated
  risk tolerances.
- Governance and approvals across underwriting, pricing, technology, risk, model risk, legal and
  privacy, and information security — with the monitoring plan and the different documentation each of
  them asked for.

**Resolution Life Australasia** — Data Scientist / Actuary (FIAA)
*Apr 2020 – Jun 2025 · Sydney*

- Data integration and quality across Actuarial, Finance, IT and Claims in SQL and Python, which took
  standing reporting from days to hours.
- Interactive Power BI dashboards and Excel reporting for live performance, and monthly performance
  papers written for the CEO, the CFO and external auditors.
- Automation of the work underneath the reporting, with the new measures endorsed by senior
  leadership.

**Zurich Financial Services Australia** — Data Analyst / Actuarial Analyst
*May 2013 – Apr 2020 · Sydney*

- Financial models integrating several data sources for risk assessment and forecasting.
- Automation of multimillion-dollar monthly transactions in Excel, VBA and SQL, working alongside
  actuarial, finance and legal teams on data integration and regulatory compliance.
- Python, SQL, VBA and Power BI learned against the work that needed them, not before it.

Fellow of the Institute of Actuaries of Australia, Actuaries Institute, Dec 2021.

---

## Elsewhere

[The site](https://jasonzheshiou.github.io/) — the same material, with the ecosystem as a drawing you
can move through.

[LinkedIn](https://www.linkedin.com/in/zheshi-jason-ou-8780203a) · ouzheshi@gmail.com

© 2026 Jason Ou · content MIT-licensed
