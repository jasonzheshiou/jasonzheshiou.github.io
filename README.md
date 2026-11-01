# Jason Ou

Building open-source life insurance AI ecosystems · Strategic Analytic Actuary (FIAA) · Senior Data Scientist

> Code is being commoditised, the chart was never issued, and what is left is judgement. A Fellow of
> the Institute of Actuaries of Australia, publishing the architecture and governance of AI in life
> insurance as I build it.

---

## Projects

Come in through the door you came for. Each one is a thing someone arrives wanting; what sits behind
it is what was measured, not what was intended.

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

## The research

**1 · Managing an LLM through a stochastic lens**

Three agents above a deterministic rule engine, run again and again on the same case, to measure how
much of an underwriting answer is the model's own run-to-run variance rather than the risk.

[Multi-Agents_Underwriter](https://github.com/jasonzheshiou/Multi-Agents_Underwriter) ·
[Output variance in LLM underwriting](https://jasonzheshiou.github.io/research/underwriting-output-variance.html)

**2 · The coevolution of an LLM and its harness**

Sealed exams against a scorer that counts inventions, run across harnesses, to show how much of a
result belongs to the scaffolding rather than to the model.

[Life_Insurance_Experience_Bench](https://github.com/jasonzheshiou/Life_Insurance_Experience_Bench) ·
[The A/E benchmark study](https://jasonzheshiou.github.io/research/life-insurance-experience-bench.html)

No figure is quoted on this page. Every number sits in the study beside the method that produced it,
the version it was measured on and the date it was measured.

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

## Elsewhere

[The site](https://jasonzheshiou.github.io/) — the same material, with the ecosystem as a drawing you
can move through.

[LinkedIn](https://www.linkedin.com/in/zheshi-jason-ou-8780203a) · ouzheshi@gmail.com

---

This repository also serves the site. Plain HTML, CSS and a little JavaScript at the root; no
framework and no analytics. Pages is published from this branch and this folder: **Settings → Pages →
Source: Deploy from a branch → main, root**.

© 2026 Jason Ou · content MIT-licensed
