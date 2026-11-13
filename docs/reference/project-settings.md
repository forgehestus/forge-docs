---
description: "Forge project settings reference: branches, workflow options and pull request timing, with presets."
---

# Project settings

<span class="badge badge-live">Live</span>

Forge does not read a configuration file from your repository. Settings are stored by Forge per project (and optionally per repository) and are edited in the web portal. A few can also be changed from an issue.

## From an issue

```text
/project-show
/project-set budget_cap_usd 750
/project-set --repo limits.qa_test_floor 10
/refresh-config
```

- `/project-show` posts the effective configuration for the repository and where each value came from.
- `/project-set <key> <value>` changes a project setting. With `--repo` it changes only this repository. The key is a dotted path and the value is JSON or plain text.
- `/refresh-config` clears cached settings so the next agent launch re-reads them.
- `/project-guardrails-add` appends a [guardrail](../get-started/project-setup.md#project-guardrails).

Settings that change billing plan or affect every customer are not editable by you.

## What you can configure

| Area | What it controls |
|---|---|
| Stacks | Backend, web and mobile stacks for each repository, and per-app-root stacks in a monorepo. |
| Workflow | How epics run: pull request timing and draft or ready, dev and test deploy steps. See [Branches and pull request timing](#branches-and-pull-request-timing). |
| Branches | Which branches Forge merges into: integration, staging, production and base. |
| Plan approval | Whether the plan is auto-approved (`auto_approve`). |
| Models | Which provider and model each agent uses. See [Bring your own AI key](../get-started/byok.md). |
| Keys | Your AI vendor credentials. |
| Budget | A monthly budget cap, with an 80 percent warning, adaptive slowdown and a block on over-budget builds. |
| Limits | Iteration and test-count ceilings. |
| Skills and guardrails | Team conventions and rules injected into every agent. |
| MCP servers | Tools agents can call, such as read-only log access. |
| Schedules | Recurring tasks and drift probes. <span class="badge badge-plan">Business and Enterprise</span> |
| Observability | Which post-deploy checks run. <span class="badge badge-plan">Business and Enterprise</span> |
| Compliance | Which compliance rule sets are applied to agents. <span class="badge badge-plan">Business and Enterprise</span> |
| GitHub access | How Forge accesses your repositories. |
| Team | Who in your workspace can use the portal. Roles are owner and member. |

Examples of keys you can set with `/project-set`: `budget_cap_usd`, `auto_approve`, `limits.qa_test_floor`, `models.cache_ttl`.

## Where settings apply

A project setting applies to every repository in the project. A repository setting, set with `--repo`, overrides it for one repository. Changes take effect at the next agent launch, with no redeploy.

## Branches and pull request timing

| Setting | Values | Default |
|---|---|---|
| `branches.integration` | Branch completed epics merge into | `develop` |
| `branches.staging` | Branch `develop` is promoted to after the dev deploy | `test` |
| `branches.production` | Pull request target | `main` |
| `branches.base` | Branch new epic branches are cut from | `main` |
| `workflow.deploy_dev` | Merge into integration and deploy to dev | on |
| `workflow.deploy_test` | Promote to staging and deploy to test | on |
| `workflow.pr_on` | When the pull request opens: `after_complete`, `after_dev` or `after_test` | `after_test` |
| `workflow.pr_draft` | Open the pull request as a draft | off |

```text
/project-set workflow.pr_on after_dev
/project-set branches.integration main
```

Presets:

- **Pull request only, no deploys:** `deploy_dev` off, `deploy_test` off, `pr_on` = `after_complete`. The pull request opens from the epic branch.
- **Dev deploy, then pull request:** `deploy_test` off, `pr_on` = `after_dev`.
- **Trunk-based:** set `branches.integration`, `branches.staging` and `branches.production` to your default branch. Forge then merges completed epics directly into it. Protect it with required checks.

Forge never merges the pull request itself. With the defaults it writes only to the integration and staging branches.
