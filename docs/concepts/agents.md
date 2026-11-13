---
description: "The AI agents Forge uses for planning, building, review and delivery, and the guardrails the runtime enforces."
---

# Agents

<span class="badge badge-live">Live</span>

Forge uses specialized agents, each with a narrow job and limits on what it can touch. The agent that writes code is never the agent that reviews it.

## Planning and design

| Agent | What it does |
|---|---|
| Product manager | Checks the epic against the real entities in your code and asks questions when something does not match. |
| Epic planner | Splits the epic into stories with dependencies and size estimates. |
| Plan reviewer | A stronger model audits the plan before you see it. |
| Solution architect | Defines the types and contracts a story introduces. Cannot write implementation code. |

## Building

| Agent | What it does |
|---|---|
| QA | Writes failing tests from the acceptance criteria before any implementation exists. |
| Backend, web, mobile | Implement until the tests pass, in parallel across tiers. Each is specific to your stack. |
| Solo | A fast path for small single-tier stories: contract, tests and code in one run. |
| Bugfix | Reproduces a reported bug, fixes the root cause, writes a regression test and opens a pull request. |

## Review and verification

| Agent | What it does |
|---|---|
| Security review | Independent review of merged code for injection, authentication, secrets and IAM issues. Can block a story. Cannot edit code. |
| Code reviewers | Separate audits of backend, web, mobile and infrastructure code. A halt can send the work back to the implementer. |
| QA validation | Merges story branches, runs the full test suite and certifies the result. Per-story runs are a deterministic script, not a model. It writes only notes and never fixes anything. |

## Delivery

| Agent | What it does |
|---|---|
| DevOps | Writes AWS CDK infrastructure and deploy workflows, and checks them with synth and diff. |
| DevOps fix | Reads a failed deploy log and fixes the deployment. |
| Docs | Appends a short changelog entry. |
| Merge conflict resolver | Resolves conflicts between story and epic branches within a bounded number of attempts, then hands off to a person. |
| Retry analyst | Diagnoses a failed story before a retry and writes a fix brief. Can stop a retry loop that will not succeed. Business and Enterprise. |
| PR fix | Fixes actionable pull request feedback with a commit on the epic branch. |
| Deploy log review | Reads your CloudWatch logs after a deploy through a read-only role. Early access. See [Ship a feature epic](../guides/feature-epic.md). |

## Guardrails enforced by the runtime

Agents are limited by code, not only by instructions:

- Each agent can only write to the paths its role allows. The architect writes types and notes, QA validation writes notes only.
- An agent that makes no progress for a set number of steps is stopped, and a stop is never treated as success.
- Repeatedly rewriting the same file, or reading without acting, is detected and halted.
- An agent that hits something it should not decide stops and asks you. Reply with `/answer`.
- Before any branch delete or force-push, the branch head is pinned in an archive reference so work is never lost.
