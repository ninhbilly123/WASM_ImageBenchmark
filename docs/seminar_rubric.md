---

# SEMINAR — A measured look at something new

### brief and rubric

**CSC13114 CQ2023/3** | project teams of up to 3 | 7% of the course | 100 points

Pick something new in web development, ask one question about it, and answer the question with a measurement anyone can re-run. Every team hands in a short study and a recorded talk. The class then votes, and the teams with the most votes present live in a lecture session.

The seminar is not part of the final exam. Use your assistant: nothing here asks you to type code yourself. What is scored is your question, your measurement, and how you checked what your assistant produced, including the facts it states about versions and dates.

---

### Dates

| What | When |
| --- | --- |
| Register your topic in the sheet linked in this assignment | Sunday, November 15, 2026, 22:00 |
| Turn in the study, and post it in the Facebook group for the vote | Sunday, November 29, 2026, 22:00 |
| Red-team pairs announced on Classroom | Monday, November 30, 2026 |
| Voting closes | Tuesday, December 1, 2026, 22:00 |
| Red-team issue filed, presenting teams announced | Wednesday, December 2, 2026, 22:00 |
| Live presentations, three teams per session, in the lecture | Thursday, December 3, December 10 and December 17 (sessions 11-13) |

---

### 1. Choose a topic

The list below is a suggestion. You may pick any of these topics or bring your own. Within this class, each topic goes to one team only: claim it by writing your student IDs in its row of the registration sheet. The first team to write in a row has it.

To bring your own topic, use an Own topic row: write a title and the one-line question. It needs the same shape as the topics below: a question, a baseline, and something to measure. The lecturer may ask you, in a comment on the sheet, to narrow it.

A good question names a change, a number, and a cost: *"Does a lock that coalesces requests keep database load flat when a hot cache key expires, and how much latency does it add to the first request?"*

#### A. The web for agents

| Code | Topic | What the demo measures |
| --- | --- | --- |
| **A1** | WebMCP: a page exposes its functions to in-browser agents (W3C community draft, in trial in Chrome) | Against an agent that reads the DOM: steps, tokens, success rate |
| **A2** | MCP Apps: an MCP server returns an interactive UI inside the chat | What the iframe sandbox allows and blocks; when a UI beats a text answer |
| **A3** | Indirect prompt injection through web content (OWASP Top 10 for Agentic Applications, ASI01) | Attack success rate before and after each defence |
| **A4** | Agents that pay: AP2, ACP, x402 | A user mandate flow on a sandbox; where the human gate sits |
| **A5** | Durable execution for long-running agents: Temporal, Inngest, Restate, DBOS | Kill the process mid-run; count the steps and LLM calls that run again |

#### B. LLMs in the product

| Code | Topic | What the demo measures |
| --- | --- | --- |
| **B1** | In-browser models on WebGPU: WebLLM, Transformers.js | Load time, tokens per second, memory on a real laptop |
| **B2** | Chrome's built-in AI (Prompt API) with a fallback for other browsers | Quality against a cloud API; browser coverage |
| **B3** | Generative UI: streaming components from an LLM | How often the UI breaks when the output violates the schema |
| **B4** | LLM observability with the OpenTelemetry GenAI conventions | Trace a multi-step request; find the step that burns the most tokens |
| **B5** | Cutting model cost: routing, prompt caching, batching | Cost per case and eval score, before and after |

#### C. Data and sync

| Code | Topic | What the demo measures |
| --- | --- | --- |
| **C1** | Local-first sync engines: Zero, ElectricSQL, PowerSync | Interaction latency, offline behaviour, conflict handling |
| **C2** | CRDTs for collaboration: Yjs, Automerge, Loro | Document size, correct merges |
| **C3** | pgvector against a dedicated vector database; hybrid search | recall@k, p95 latency |
| **C4** | Chunking and reranking for RAG | recall@k, MRR |
| **C5** | Multi-layer caching and cache stampede | Hit rate, database load when a hot key expires |

#### D. New web platform features

| Code | Topic | What the demo measures |
| --- | --- | --- |
| **D1** | View Transitions and the Navigation API instead of JavaScript animation | JavaScript bytes shipped, INP |
| **D2** | CSS replacing JavaScript: anchor positioning, popover, container style queries | Lines of JavaScript removed, browser coverage |
| **D3** | WebTransport, WebSocket and server-sent events | Latency and data loss on a bad network |
| **D4** | Passkeys: conditional create, the Signal API; the Digital Credentials API | Sign-in steps, sign-in success rate |
| **D5** | Image and PDF processing in WebAssembly on the user's device | Processing time, bytes uploaded |

#### E. Agents as visitors to your web app

| Code | Topic | What the demo measures |
| --- | --- | --- |
| **E1** | Web Bot Auth: verifying signed bot requests at your own server (HTTP Message Signatures) | Spoofed User-Agent requests rejected against signed requests accepted |
| **E2** | AI crawlers and content policy: robots.txt, llms.txt, pay-per-crawl with HTTP 402 | Crawler share of traffic and its cost in a server log; what a 402 gate stops |
| **E3** | MCP authorization: an MCP server as an OAuth 2.1 resource server | A token issued for one server is refused by another; missing checks found |
| **E4** | The A2A protocol: agents from different frameworks working together | Task completion rate; what happens when one agent fails or lies |
| **E5** | Monorepos: build cache, CI that runs only what changed | CI time; seeded bugs that slip through |

#### F. Working with coding agents

| Code | Topic | What the demo measures |
| --- | --- | --- |
| **F1** | Spec-driven development: Spec Kit, Kiro, OpenSpec | Same feature: rounds of fixes, tests passing |
| **F2** | AGENTS.md and documentation written for agents | Success rate with and without it |
| **F3** | Agent code review in CI | Seeded bugs caught, false alarms |
| **F4** | Running agents safely: sandbox, least privilege, blocked outbound network | Which dangerous actions are blocked and which get through |
| **F5** | Several agents in parallel with git worktrees | Time to finish, merge conflicts |

The status of these tools changes month by month. Check it in the official documentation before you rely on it (criterion 5).

---

### 2. Build the study

* **A baseline and a change.** Same machine, same data, same load; only the one thing your question is about differs. Say in `REPORT.md` what you held fixed.
* **One command re-runs the measurement**, for example `npm run measure`. It prints the numbers and writes the raw output under `results/`. The `README.md` says how to get from a fresh clone to that command.
* **Run it at least five times** and report the median and the spread, not your best run. If five runs are impossible (a long build, a paid call), say why and how many you did.
* **Paid model APIs:** cap what you spend. Record the raw responses and include a replay mode that recomputes your numbers from them, so the red team can re-run your study without a key and without paying.
* **Only your own systems.** Load tests, crawls, injection attempts and bot traffic run against services you own, on your machine or your deployment, never against someone else's site.
* **Facts come from the source.** Versions, release dates and words like stable or experimental come from official documentation or release notes, cited in `REPORT.md` with the date you read them. Assistants state versions and APIs that do not exist; check every one.

---

### 3. What you hand in

A public GitHub repository: the red team clones it. One zip of that repository, including `.git`, containing:

| File | What it is |
| --- | --- |
| `README.md` | From a fresh clone to the measure command, step by step |
| the measure command, `results/` | The command and the raw output of every run you report |
| `REPORT.md` | At most three pages: the question; the setup (versions, machine, data, load); the baseline and the change; the numbers with units and spread; your recommendation, including when not to use the thing; the limits of your measurement; sources. The repository link is on its first line. |
| `slides.pdf` | The slides of your talk |
| `TALK.md` | The link to your recorded talk, at most 8 minutes, viewable by anyone with the link (an unlisted YouTube video or a shared Drive file) |
| `AI-LOG.md` | As for every assignment |
| `SELF_ASSESSMENT_REPORT.md` | See How to submit |

Write and speak in English or Vietnamese, as your team prefers.

---

### 4. The vote

* By the study deadline, one member posts in the Facebook group [AWAD FIT HCMUS](https://www.facebook.com/groups/awad.fit.hcmus). The post starts with `#AWADSeminar23_3` and gives your title, your question, one headline number and the link to your talk.
* Vote with reactions until Tuesday, December 1, 22:00. Only reactions from students of this class count, one per person.
* The nine posts with the most counted reactions present live, three per session. The lecturer announces them, with the date for each, on Wednesday, December 2. Ties go to the study turned in first.
* A team that does not post is not in the vote; that costs no marks. A selected team that cannot present tells the lecturer at once, and the next team moves up.

---

### 5. The red team

Each team red-teams one other team's study. The pairs are on Classroom on Monday, November 30. By Wednesday, December 2, 22:00, open one issue on their repository, titled `[red-team] <your student IDs>`, with:

* the command you ran and the numbers you got, next to theirs;
* at least one finding with evidence: a baseline that differs in more than one thing, a warm cache, too few runs, a number on a slide that no log contains, a claim the cited source does not support.

A team that files no issue by the deadline loses 10 points from its seminar mark. The issue is not otherwise scored, and the finding does not by itself lower the other team's mark: the lecturer checks it against their repository.

---

### 6. Presenting live

Selected teams get 10 minutes to present and 5 minutes of questions in the lecture. Use the slides you turned in. You may correct a mistake the red team found; say so on the slide. The lecturer puts at least one question to a member chosen at random. The live talk is scored on criterion 4 in place of your recording if it scores higher, so presenting never costs you marks.

---

### What is scored

| # | Criterion | Points |
| --- | --- | --- |
| 1 | The question and the baseline | 15 |
| 2 | The measurement re-runs | 30 |
| 3 | Findings and recommendation | 20 |
| 4 | The talk | 15 |
| 5 | Sources and facts | 10 |
| 6 | AI-LOG.md | 10 |

We clone your repository, follow `README.md` and run your measure command. If our run and your logs disagree beyond the spread you report, we score our run and say so in the feedback.

#### 1. The question and the baseline (15 points)

| Points | What it looks like |
| --- | --- |
| **13-15** | One question that names the change and the metric, with its unit. The baseline differs from the change in that one thing only, and `REPORT.md` says what was held fixed. |
| **8-12** | The question is clear, but the baseline differs in more than one thing, or what was held fixed is not stated. |
| **3-7** | A survey of a tool with a measurement attached; no clear baseline. |
| **0-2** | No question, or nothing to compare against. |

#### 2. The measurement re-runs (30 points)

| Points | What it looks like |
| --- | --- |
| **26-30** | From a fresh clone, the steps in `README.md` and one command give numbers within the spread you report. Raw output of every reported run is in `results/`. At least five runs, with median and spread. Every number in `REPORT.md` and on the slides appears in a log. |
| **18-25** | It re-runs, but with fewer runs or no spread, or one reported number cannot be traced to a log. |
| **8-17** | It re-runs only after steps that are not in `README.md`, or our numbers differ clearly from yours with no explanation. |
| **0-7** | It does not run, or the numbers have no logs behind them. |

#### 3. Findings and recommendation (20 points)

| Points | What it looks like |
| --- | --- |
| **17-20** | What changed and by how much; what it costs (latency, memory, complexity, money, browser coverage); when not to use it; and the limits of your measurement: what would change the result. A result that shows no improvement is a valid finding and can earn full marks. |
| **10-16** | Numbers and a recommendation, but no case against, or no limits. |
| **4-9** | The numbers restated, with no recommendation. |
| **0-3** | A conclusion your numbers do not support. |

#### 4. The talk (15 points)

*Scored on the recording, or on the live talk if you present and it scores higher.*

| Points | What it looks like |
| --- | --- |
| **13-15** | Within time (8 minutes recorded, 10 live). It opens with the question, shows the measurement running or its log, gives the headline number with unit and spread, and ends with the recommendation. Numbers on the slides are readable. Every member presents a part. |
| **8-12** | All of that is there, but the talk runs over time, or the numbers are buried. |
| **3-7** | Mostly a description of the tool; the measurement is barely shown. |
| **0-2** | No talk, or the link cannot be opened. |

#### 5. Sources and facts (10 points)

| Points | What it looks like |
| --- | --- |
| **9-10** | Every fact about a tool (version, date, status, API) cites official documentation or release notes, with the date you read it. None of the facts we check is wrong. |
| **5-8** | Sources are given, but some facts are uncited or rest only on secondary blogs. |
| **0-4** | A fact we check is wrong (a version, an API or a status that does not exist), or there are no sources. |

#### 6. AI-LOG.md (10 points)

| Points | What it looks like |
| --- | --- |
| **9-10** | Which tool, for which part, and real *Changed / Rejected* entries, including at least one thing your assistant got wrong and how you caught it: a fact, or a benchmark that measured the wrong thing. |
| **4-8** | Tools listed; *Changed / Rejected* are empty or generic. |
| **0-3** | Missing. |

`Tool: none` is a valid entry if your team chose not to use one.

---

### How to submit

One zip file of the repository including `.git`, named after your student IDs in ascending order, joined by `-`, and the total you give yourself: `<StudentID1>-<StudentID2>-<StudentID3>_<total>.zip`, for example `23120001-23120002-23120003_84.zip`. One member turns it in, from their `<StudentID>@student.hcmus.edu.vn` Google account.

The zip must contain `SELF_ASSESSMENT_REPORT.md`: one row per criterion in this rubric, the marks you claim, and evidence pointing at a file, a section of `REPORT.md`, a log in `results/` or a time in the recording. Add a short *what we did not manage*. The total in that table is the number in the file name. Score criterion 4 on your recording. Template on Classroom.

A wrong file name costs no marks but delays your result: the grading script matches submissions to the class list by that name.

### Honesty adjustment

Your self-assessment is compared with the mark you actually earn. The gap is `your total - the mark`, on the same 100-point scale.

| Gap | Adjustment |
| --- | --- |
| within ±10 | none — this is normal calibration |
| +11 to +20 | -3 |
| +21 to +30 | -6 |
| more than +30 | -10 |
| -21 or worse | -3 — read the rubric before you score yourself down |
| no `SELF_ASSESSMENT_REPORT.md` | -10, and the file-name total is ignored |

A criterion you claim with no evidence line counts as claimed-and-not-done for this comparison. The comparison uses your mark before the red-team rule in section 5. No adjustment takes a mark below 0.

### How the 100 becomes your course mark

The seminar is 7% of the course: 100 points here are worth 7% of your course mark, and 80 points are worth 5.6% (0.56 on the 10-point scale).
