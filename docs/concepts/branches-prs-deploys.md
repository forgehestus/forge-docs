---
description: How Forge uses branches, pull requests and deployments, and which branches it merges into.
---

# Branches, PRs and deploys

<span class="badge badge-live">Live</span>

## Branches

For each story, all agents commit to one shared story branch named `story/<epic>-<story>`, in sequence. When a story is validated, Forge merges it into an epic branch. When every story is done and documented, the epic branch is merged into your `develop` branch.

Before any branch delete or force-push, the branch head is pinned in an archive reference so work cannot be lost.

### Which branches Forge merges into

By default Forge uses a classic three-branch flow:

| Role | Default branch | What Forge does |
|---|---|---|
| Integration | `develop` | Completed epics are merged here. |
| Staging | `test` | `develop` is promoted here after the dev deploy. |
| Production | `main` | The pull request targets this branch. Forge opens the pull request and never merges it. |

With these defaults Forge does not write to `main`. Bug fixes, safety-net epics and migration epics skip the `develop` and `test` merges and open the pull request straight from the epic branch.

The branch names are configurable per project: integration, staging, production, and base (the branch new epic branches are cut from). If you set the integration branch to your default branch, for trunk-based development, Forge merges completed epics directly into it. In that setup, protect the branch with required status checks. See [Project settings](../reference/project-settings.md#branches-and-pull-request-timing).

## Deploys use your pipeline

Forge does not deploy with its own credentials into your cloud. It writes the AWS CDK infrastructure and the deploy workflows (`deploy-dev.yml`, `deploy-test.yml`) in your repository, then:

1. Merges the epic branch into `develop`.
2. Your GitHub Actions workflow runs `cdk deploy` in your AWS account with your credentials.
3. The workflow posts the result back as a comment. On success Forge continues. On failure it includes the log so a fix agent, or you, can act on the real error.
4. If a test environment is configured, `develop` is promoted to `test` and the same cycle runs. A missing `test` branch is created on first promotion.

Migration epics are different: they convert and verify only, and never deploy. You review the pull request and deploy on your own pipeline.

## Pull requests

You choose when Forge opens the pull request, and as a draft or ready. After the test deploy is the default; the other options are after the dev deploy or after completion. The pull request's source branch follows that choice: the staging branch (default), the integration branch, or the epic branch. The target is always the production branch. You can also ask for one at any time:

```text
/pr
/pr release/2026-12 --draft
```

`/pr` opens a pull request from the epic branch into the branch you name, or into the default branch when you name none.

## Pull request tracking and auto-fix

After the pull request opens, Forge watches it. Human review comments and findings from GitHub Code Quality, CodeQL and Copilot are triaged. Actionable ones are fixed by the PR fix agent with a commit on the epic branch, in up to five rounds, critical items first. Items it cannot resolve get a drafted recommendation, reviewed by a stronger model, that you approve or reject. Replying or pushing re-arms tracking.

<span class="badge badge-plan">Team, Business and Enterprise</span>

## Keeping branches fresh

A daily up-merge keeps active epic branches current with the base branch. Conflicts are resolved on a side branch and delivered as a pull request into the epic branch, with at most two attempts before a person is asked. `/upmerge` does the same on demand.

## Post-deploy checks

<span class="badge badge-plan">Business and Enterprise</span>

- Deploy-failure log capture (on by default).
- Smoke-route probes and schema checks against the deployed environment.
- A CloudWatch error scan after deploy on AWS.
- A browser smoke test with screenshot comparison. A visual difference over 10 percent blocks the deploy.
