---
description: "Forge slash command reference: every command you can type in a GitHub issue comment to control an epic or story."
---

# Slash command reference

Forge reads commands from GitHub issue comments. Type the command as the **first line** of a comment on the epic or story issue.

!!! info "How commands are read"
    - Only the first line of a comment is parsed. Later lines are notes, except for commands that read the comment body (`/epic-targets`, `/pause`, `/intervene`, `/init`, `/parity waive`, and the `/proceed` parity options).
    - A 👀 reaction means Forge received the comment, not that the command succeeded. Watch for Forge's reply comment.
    - Anyone who can comment on the issue can run commands. Comments on pull requests are never treated as commands; they become PR feedback.
    - Some commands depend on your plan. See [Plans and availability](plans.md).

## Planning & approval

### `/proceed [--force]`

**Where:** Epic issue · single-repo and cross-repo  
**Alias:** `/approve`

Approves the posted plan and starts the build. The epic moves to BUILDING and agents launch; Forge posts a plan and budget summary.

**When it works:** PLAN_POSTED, PLAN_QUESTIONS, PLAN_QUESTIONS_IN_PROGRESS. In PLANNING with a plan already in the thread, the epic recovers to BUILDING. During Parity Proof, the parity /proceed below applies instead.

| Option | What it does |
|---|---|
| `--force` | Builds even if the projected cost exceeds the remaining monthly budget. Forge posts a budget-override note with your name. |

**Example**

```text
/proceed
Approving after reviewing the planner findings
```

!!! note
    In any other state Forge replies “/proceed ignored — state is X”.

### `/epic-targets`

**Where:** Anchor epic issue · cross-repo

Sets which repos a cross-repo epic touches and snapshots each repo's develop head.

**When it works:** DEFINED, TARGETS_PENDING, PLANNING.

| Option | What it does |
|---|---|
| `repo list (next lines)` | Comma- or newline-separated; short names use the anchor's org; must include the anchor repo. |

**Example**

```text
/epic-targets
sql-project, desktop-app, windows-service
```

!!! note
    The list must be on the following lines; “/epic-targets a, b” on one line doesn't work. Frozen once building.

### `/requote`

**Where:** Epic issue · single-repo

Recomputes the cost quote from the current plan or assessment without re-running the analyst.

**When it works:** Any except ABORTED and COMPLETED.

**Example**

```text
/requote
```

!!! note
    Not available on cross-repo epics.

## Epic lifecycle

### `/abort`

**Where:** Epic issue · single-repo and cross-repo

Kill switch: stops running agents, aborts unfinished stories, cleans up branches, and closes the epic.

**When it works:** Any except ABORTED.

**Example**

```text
/abort
```

!!! note
    Permanent. A stuck or failed Parity Proof run never needs it; use /proceed.

### `/pr`

**Where:** Epic issue · single-repo

Opens a pull request from the epic branch into the branch you name, or into the repo's default branch when you name none. Forge posts the link, then watches the PR: review comments and GitHub Code Quality / code-scanning (CodeQL) / Copilot findings are triaged and actionable ones are fixed by the pr-fix agent with a commit on the epic branch.

**When it works:** Any epic that has a branch and isn't aborted (you don't have to wait for READY_FOR_REVIEW).

| Option | What it does |
|---|---|
| `<branch>` | Target branch, e.g. /pr dev. Same as --base <branch>, --into <branch> or --base=<branch>. Must already exist. |
| `--draft` | Open the PR as a draft. |

**Example**

```text
/pr dev --draft
```

!!! note
    Collaborators only. If a PR from the epic branch into that target is already open, Forge returns it instead of opening another. Refuses when the epic branch has nothing that isn't already on the target. The PR says "Closes #<issue>" only when it targets the default branch. Code Quality findings: Error/High are must-fix, Warning required, Note optional; pr-fix applies a suggested autofix only after checking it, never adds suppression comments, and explains false positives in its reply. Bot findings never restart a PR that was escalated to a human, so the fix-round cap still holds. Needs pr_tracking on (Team+); with auto-fix off findings are reported, not fixed. Not on cross-repo epics yet.

### `/upmerge`

**Where:** Epic issue · single-repo

Merges the base branch (configured branch_base, else the repo default, e.g. dev) into the epic branch within about 5 minutes. Forge also does this automatically once a day (08:00–11:00 UTC) on every active epic.

**When it works:** Any active epic; waits while a run is building or testing on the branch (active Parity Proof steps, deploys).

**Example**

```text
/upmerge
```

!!! note
    On a conflict nothing is pushed to the epic branch: Forge resolves it on a side branch (upmerge/<epic>-<date>), builds it, and opens a PR into the epic branch for you to review. Frozen Parity Proof tests are never changed. After 2 failed attempts on the same base commit, Forge posts the local merge steps instead. After an up-merge on a Parity Proof epic, re-run the baseline before /parity-after. Not on cross-repo epics yet.

### `/pause [reason]`

**Where:** Epic issue · single-repo and cross-repo

Stops Forge starting new work. Agents already running keep going.

**When it works:** Not already paused.

| Option | What it does |
|---|---|
| `[reason]` | Cross-repo only: text after the command or on the next lines is shown as the pause reason. |

**Example**

```text
/pause
Waiting on DB schema sign-off
```

!!! note
    Doesn't stop running agents; that's /abort.

### `/resume`

**Where:** Epic issue · single-repo and cross-repo

Lifts a /pause.

**When it works:** Paused.

**Example**

```text
/resume
```

## Story & agent control

### `/proceed`

**Where:** Story issue · single-repo and cross-repo  
**Alias:** `/approve`

Approves one story that is waiting for approval, so its agents launch.

**When it works:** Story must be PENDING_APPROVAL; other states are ignored without a reply.

**Example**

```text
/approve
```

!!! note
    Forge does not reply, whether it succeeds or ignores the command.

### `/retry <agent>`

**Where:** Epic issue · single-repo

Re-runs one agent on the matching story without going to the story issue. The portal's retry button posts this.

**When it works:** Any. Picks the story whose agent stopped partway; if none, the single unfinished story where that agent isn't running.

| Option | What it does |
|---|---|
| `<agent>` | solution-architect, qa, backend, web, mobile, solo, secops, devops, devops-fix, qa-validate, backend-review, web-review, mobile-review, devops-review |

**Example**

```text
/retry qa-validate
```

!!! note
    If several stories match, Forge asks you to post on the specific story issue. “/retry qa --story …”, which some Forge messages suggest, does not work.

### `/retry [agent]`

**Where:** Story issue · single-repo and cross-repo

Re-launches one agent on this story and resets every agent after it in the pipeline, so the rest of the workflow re-runs.

**When it works:** Refused on ABORTED or SKIPPED stories, or while that agent is running.

| Option | What it does |
|---|---|
| `[agent]` | Agent to re-run. Omitted: the first agent that stopped partway; if none, Forge lists the agents. Migration stories: migration-backend \| qa-validate. Strangler facade story: migration-facade (or omit). |

**Example**

```text
/retry backend
```

!!! note
    Downstream agents re-run too: architect → qa → implementation → reviews → secops/devops → devops-review → devops-fix → qa-validate. On a migration story, only migration-backend (re-converts the project) and qa-validate (re-runs parity; needs the conversion merged) apply; on the facade story, only migration-facade.

### `/retry [agent] --story <repo>/<idx>`

**Where:** Anchor epic issue · cross-repo only

Resets one cross-repo story to PENDING; its pipeline resumes on the existing branch where it stopped.

**When it works:** Any; the story must exist.

| Option | What it does |
|---|---|
| `[agent]` | Accepted and echoed back as a hint. The story still resumes at its current step; use /restart --story to start from the first agent. |
| `--story <repo>/<idx>` | Short repo name or org/repo/idx. |

**Example**

```text
/retry --story sql-project/0
```

!!! note
    Nothing may follow the story argument.

### `/restart`

**Where:** Story issue · single-repo and cross-repo

Fully resets one story and reruns its pipeline from the architect on a fresh branch (‑g<N>).

**When it works:** Any except ABORTED.

**Example**

```text
/restart
```

!!! note
    Earlier run history is kept.

### `/restart --story <repo>/<idx> [--cascade]`

**Where:** Anchor epic issue · cross-repo only

Resets one cross-repo story as a fresh generation.

**When it works:** Any; the story must exist.

| Option | What it does |
|---|---|
| `--story <repo>/<idx>` | The story to reset. |
| `--cascade` | Also resets every story that depends on it; they rebuild once the root is tested again. |

**Example**

```text
/restart --story acme/api/2 --cascade
```

!!! note
    --cascade must be the last word on the line.

### `/unblock`

**Where:** Story issue · single-repo and cross-repo

Tells Forge you've dealt with the blocker; the story continues with the next agent.

**When it works:** Story must be BLOCKED.

**Example**

```text
/unblock
```

!!! note
    Doesn't clear progress. Use /restart for a clean re-run.

### `/abort`

**Where:** Story issue · single-repo

Kill switch for one story: stops its running agents and marks it aborted. The rest of the epic continues.

**When it works:** Any except already aborted.

**Example**

```text
/abort
```

!!! note
    Stories that depend on it won't launch (aborted doesn't count as done). Use /skip if dependents should proceed.

### `/proceed-anyway`

**Where:** Story issue · single-repo

Overrides reviewer “recommend halt” verdicts for this story: later halt verdicts no longer re-run the implementation agent, so the current code continues.

**Example**

```text
/proceed-anyway
```

!!! note
    A retry that is already running keeps going; /abort the story to stop it.

### `/skip`

**Where:** Story issue · single-repo and cross-repo

Marks the story skipped and closes the issue as not planned.

**When it works:** PENDING_APPROVAL or CREATED; otherwise ignored.

**Example**

```text
/skip
```

!!! note
    Skipped counts as done, so dependent stories go ahead.

### `/skip --story <repo>/<idx>`

**Where:** Anchor epic issue · cross-repo only

Marks one cross-repo story skipped so the epic can finish without it.

| Option | What it does |
|---|---|
| `--story <repo>/<idx>` | The story to skip. |

**Example**

```text
/skip --story desktop-app/3
```

!!! note
    Works even while the story is running, but doesn't stop the running agent.

### `/answer --story <org>/<repo>/<idx> <answer>`

**Where:** Epic issue · single-repo and cross-repo (anchor issue; short repo/idx allowed)

Answers a story that paused for a human decision; the agent re-runs with your answer.

**When it works:** Single-repo: story must be PAUSED_NEEDS_HUMAN.

| Option | What it does |
|---|---|
| `--story …` | The paused story. Single-repo needs the full org/repo/idx. |
| `<answer>` | Rest of the first line. |

**Example**

```text
/answer --story acme/legacy-app/4 Use option B: keep the WCF client, port the server to gRPC
```

!!! note
    Only the first line is read, so put the whole answer on it.

### `/intervene <guidance>`

**Where:** Anchor epic issue · cross-repo only

Adds a note (up to 4,000 characters) that every agent launched later on this epic reads.

**When it works:** Any; meant for use while paused.

| Option | What it does |
|---|---|
| `<guidance>` | Text after the command or on the following lines. |

**Example**

```text
/intervene
Do not touch the legacy auth module; use the new TokenService.
```

!!! note
    Running agents don't see it. Ignored on single-repo epics.

## Recovery

### `/retry`

**Where:** Epic issue · single-repo and cross-repo

Re-fires whatever is stuck on the epic.

**When it works:** Planning or requirements states: re-runs the planner. READY_FOR_DEPLOY with a merge error: retries the develop merge. Escalated VALIDATE_FIXING or IN_PROGRESS: clears the escalation so triage runs again.

**Example**

```text
/retry
```

!!! note
    Other states are ignored without a reply. Use /restart for a full reset.

### `/restart`

**Where:** Epic issue · single-repo and cross-repo

Resets the epic to DEFINED and runs the planner from scratch.

**When it works:** Any except ABORTED and COMPLETED.

**Example**

```text
/restart
```

!!! note
    The whole plan is regenerated.

### `/triage [reason]`

**Where:** Epic issue · single-repo

Runs a triage agent that diagnoses a stuck epic, applies the safe fixes, and posts a verdict in about 30 seconds.

| Option | What it does |
|---|---|
| `[reason]` | Free text passed to the triage agent. |

**Example**

```text
/triage deploy stuck for 2h
```

!!! note
    Manual triage applies safe fixes; automatic triage is more conservative.

### `/smoke-rerun [scenario]`

**Where:** Epic issue · single-repo

Re-runs the browser smoke tests on the failed environment.

**When it works:** A dev or test smoke run must have failed.

| Option | What it does |
|---|---|
| `[scenario]` | Re-runs just that scenario. |

**Example**

```text
/smoke-rerun login-happy-path
```

!!! note
    Needs the smoke image configured.

### `/smoke-baseline-update [scenario]`

**Where:** Epic issue · single-repo

Deletes the stored screenshot baselines so the next smoke run captures new ones after an intended UI change.

| Option | What it does |
|---|---|
| `[scenario]` | Resets only that scenario. |

**Example**

```text
/smoke-baseline-update
```

!!! note
    The deletion can't be undone.

## Parity Proof

### `/proceed [--fresh-tests] [--accept-gaps]`

<span class="badge badge-early">Early access</span>

**Where:** Epic issue · single-repo  
**Alias:** `/approve`

Confirms the scope, approves the understanding, or resumes a stopped Before run. If the tests already exist and the baseline stopped, only the baseline re-runs (no AI cost).

**When it works:** Any PARITY_* state. Scope questions: confirms the scope. Understanding posted: approves it. PARITY_RUN_FAILED or a run with no activity for 20 min: resumes from the last approved step.

| Option | What it does |
|---|---|
| `--fresh-tests` | When the baseline stopped, writes the tests again instead of re-running only the baseline. |
| `--accept-gaps` | When the run stopped because some approved rules have no test, runs the baseline on the tests that exist. The gaps go in the report and the override is recorded with your name. |

**Example**

```text
/proceed --accept-gaps
```

!!! note
    If the run stopped before the scope was confirmed, Forge asks for /parity-before instead.

### `/parity-before [--fresh]`

<span class="badge badge-early">Early access</span>

**Where:** Any issue (creates an epic) or a single-repo epic issue

Starts Parity Proof Before: Forge asks what to cover, describes the system for you to approve, writes tests that pin today's behavior, and runs the baseline on .NET Framework. Only tests/Forge.Parity and .forge are written. With tests already present, the test writer only adds tests for uncovered rules.

**When it works:** Not ABORTED or COMPLETED; no active run.

| Option | What it does |
|---|---|
| `--fresh` | Rescans from scratch instead of reusing the last run's scope answers and approved understanding. |

**Example**

```text
/parity-before
```

!!! note
    Not on cross-repo epics.

### `/parity-after [--branch <branch>]`

<span class="badge badge-early">Early access</span>

**Where:** Single-repo epic issue

Re-runs the frozen Before tests on the migrated code under the target runtime and compares them with the baseline.

**When it works:** No active run; a READY baseline must exist.

| Option | What it does |
|---|---|
| `--branch <branch>` | Branch to verify. Default: the epic branch. |

**Example**

```text
/parity-after --branch epic/42-net10-migration
```

!!! note
    The test project must be byte-identical to the baseline; any edit invalidates the run.

### `/parity accept <rule|test> <reason> [--expires YYYY-MM-DD]`

<span class="badge badge-early">Early access</span>

**Where:** Single-repo epic issue

Records an accepted difference for a rule or a test; it applies from the next /parity-after and appears in the After report.

| Option | What it does |
|---|---|
| `<rule\|test>` | A rule id like BR-QC-11, or a fully qualified test name. |
| `<reason>` | At least 10 characters. |
| `--expires YYYY-MM-DD` | The acceptance ends at the end of that day (UTC). |

**Example**

```text
/parity accept BR-INV-03 Rounding now uses banker's rounding per finance --expires 2026-12-31
```

!!! note
    Stored per repo, not per epic.

### `/parity waive <reason>`

<span class="badge badge-early">Early access</span>

**Where:** Single-repo migration epic issue

Waives the parity gate with an audit record; the epic moves to review and the PR opens.

**When it works:** Migration epic held at PARITY_FAILED, PARITY_GATE_BLOCKED or PARITY_RUN_FAILED.

| Option | What it does |
|---|---|
| `<reason>` | At least 10 characters; can continue on the next lines. Included in the evidence pack. |

**Example**

```text
/parity waive Known float formatting difference accepted by the QA lead
```

!!! note
    Bypasses the proof. The waive is audited permanently.

### `/parity`

<span class="badge badge-early">Early access</span>

**Where:** Epic issue

Lists the Parity Proof commands.

**Example**

```text
/parity
```

## Migration & .NET modernization

### `/migrate`

**Where:** Any issue (creates a migration epic) or a single-repo epic issue

Starts a .NET Framework → modern .NET migration. The analyst classifies each project as mechanical, assisted or human-required; you review, then /proceed. With Parity Proof on and no ready baseline, the Before run goes first and the migration starts after it.

**When it works:** Any except ABORTED and COMPLETED. Business or Enterprise plan.

**Example**

```text
/migrate
```

!!! note
    Not on cross-repo epics. Running it again clears the quote and starts a fresh analysis.

### `/cutover <METHOD> <path> <state>`

<span class="badge badge-early">Early access</span>

**Where:** Any issue in the repo

Moves one route through the strangler stages: monolith → shadow → canary → cut-over → retired. Rolling back is always allowed.

**When it works:** The route must already be in the cutover inventory. Canary and cut-over need shadow parity.

| Option | What it does |
|---|---|
| `<METHOD>` | HTTP method. |
| `<path>` | Route path. |
| `<state>` | monolith \| shadow \| canary \| cut-over \| retired |

**Example**

```text
/cutover GET /api/orders canary
```

!!! note
    Refused until shadow traffic matches; Forge shows matched/runs.

### `/safety-net`

**Where:** Epic issue · single-repo

Pins legacy behavior with characterization tests: ranks risky modules, proposes the top ones, then creates a test story per module after /proceed.

**When it works:** Any except ABORTED and COMPLETED. Business or Enterprise plan.

**Example**

```text
/safety-net
```

!!! note
    Resets the epic to DEFINED.

### `/testability`

**Where:** Epic issue

Read-only advice on getting untestable code under test, tailored to the repo.

**Example**

```text
/testability
```

!!! note
    Changes nothing.

## Compliance & reporting

### `/evidence-pack [frameworks | YYYY-QN]`

**Where:** Epic issue · single-repo and cross-repo

Builds a compliance evidence bundle (HTML, JSON, CSVs, SHA-256 manifest) and posts a 7-day download link. It's evidence, not an attestation.

| Option | What it does |
|---|---|
| `hipaa,hitrust` | Forces those framework annexes (default: the epic's compliance settings). |
| `YYYY-QN / --range YYYY-QN` | Quarter roll-up: every epic in that quarter (cross-repo: the whole project). |

**Example**

```text
/evidence-pack 2026-Q3
```

## Onboarding

### `/init [description]`

**Where:** Any issue in the repo

Scans the codebase and commits solution.md. For a repo in a project, scans every project repo and adds a multi-repo architecture section.

**When it works:** Skips a repo already being scanned.

| Option | What it does |
|---|---|
| `[description]` | Context about the system (after /init or on the next lines) to seed the overview. |

**Example**

```text
/init Billing platform; WebPortal is the customer UI
```

!!! note
    About 2–5 minutes per repo. Reply to the analyst's questions in plain text.

### `/bootstrap`

**Where:** Issue in a new repo · single-repo

Scaffolds a new project: posts a feature menu; reply with your picks, then /proceed.

**When it works:** No epic on the issue yet.

**Example**

```text
/bootstrap
```

!!! note
    Use /restart or /abort to redo.

## Configuration

### `/refresh-config`

**Where:** Any issue

Clears cached settings so the next agent launch re-reads them.

**Example**

```text
/refresh-config
```

### `/project-set [--repo] <key> <value>`

**Where:** Any issue in a repo that belongs to a project

Changes a project setting (or, with --repo, this repo's setting). Examples: budget_cap_usd, quota_hard_multiplier, auto_approve, limits.qa_test_floor, models.cache_ttl.

| Option | What it does |
|---|---|
| `--repo` | Applies the setting to this repo instead of the whole project. |
| `<key>` | Dotted setting path, e.g. limits.qa_test_floor. |
| `<value>` | JSON value or plain text. |

**Example**

```text
/project-set budget_cap_usd 750
```

!!! note
    Fails if the repo isn't attached to a project.

### `/project-show`

**Where:** Any issue

Posts the effective config for this repo and where it came from.

**Example**

```text
/project-show
```

### `/project-guardrails-add`

**Where:** Any issue in a repo that belongs to a project

Appends a guardrail Sign (the lines after the command) to the project guardrails every agent reads.

| Option | What it does |
|---|---|
| `(body)` | The Sign in markdown: a ## Sign heading with Trigger, Instruction, Reason, Provenance. |

**Example**

```text
/project-guardrails-add

## Sign: never auto-approve breaking changes to /api/v1
Trigger: PR touches src/api/v1/
Instruction: require human review
```

## Comments that are not commands

| What you do | What Forge does |
|---|---|
| Plain reply while a plan is posted | A comment that isn't a command is treated as a question or correction; the planner re-runs with the thread (queued if it's busy). |
| Plain reply to requirements questions | The product-manager agent re-runs with your answer. |
| Plain reply to /init intake questions | Your answers are folded into solution.md. |
| Plain reply to bugfix questions | The bugfix agent re-runs with your clarification. |
| Parity scope answers | Numbered answers such as “3: Billing, Invoicing” or “7: 80%” update the scope and re-price the quote. /proceed accepts the rest as defaults. |
| Parity understanding corrections | Free text starts a revision round (up to 3), then /approve or restart. |
| Reviewer “recommend halt” comment | A review comment recommending a halt re-runs the matching implementation agent, once per verdict. |
| Labels agent:epic, agent:bug, agent:drift | Adding these labels to an issue starts the epic, bugfix or drift flows. |

