---
description: "Where people approve and review in Forge: plan approval, pull request review and the commands that control an epic."
---

# Humans in the loop

<span class="badge badge-live">Live</span>

Forge is autonomous between your decisions, not instead of them. This page lists where a person decides and what Forge does when it should not.

## What you approve

- **The plan.** Nothing is built until you reply `/proceed` (or the project uses auto-approve). The plan includes a cost and risk band.
- **Spending over budget.** If a build is projected to exceed the remaining monthly budget, it is blocked until an approver overrides with `/proceed --force`. The approver's name is recorded.
- **Pull requests.** Forge opens pull requests and never merges them. You merge them. By default Forge writes only to your `develop` and `test` branches and opens the pull request into `main`. See [Branches, PRs and deploys](branches-prs-deploys.md#which-branches-forge-merges-into).
- **Anything it cannot safely decide.** See below.

## When Forge stops and asks

- The epic and the code disagree about what exists (a hard domain mismatch).
- An agent hits a decision it should not make alone. It posts a question on the issue and waits for `/answer`.
- A migration slice contains a hard blocker, such as WebForms or AppDomain use. The slice is paused with numbered options and the exact reply to resume. See [Modernization](../modernization/index.md).
- Automatic retries are used up. The epic escalates with a diagnosis rather than looping.
- A deploy failure shows a credentials or permissions problem. Forge escalates immediately instead of retrying.

## Controls you have at any time

| Command | Effect |
|---|---|
| `/pause` and `/resume` | Stop Forge from starting new work, then continue. Running agents finish. |
| `/abort` | Stop everything on the epic, or on one story when run on the story issue. |
| `/intervene <guidance>` | Give an agent guidance on a cross-repo epic. |
| `/skip` | Skip a story. |
| `/answer` | Answer an agent's question. |

Full list: [Slash commands](../reference/commands.md).

## Your own rules

Project guardrails and [repo skills](../get-started/project-setup.md) apply to every agent, and reviewers flag violations. Only people write guardrails.

## What a human always reviews

Security review and code review by agents do not replace a person reading the pull request. They reduce what the person has to catch.
