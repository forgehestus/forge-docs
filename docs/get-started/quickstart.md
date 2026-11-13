# Quickstart: your first epic

<span class="badge badge-live">Live</span>

This walks you from a connected repository to a reviewed pull request. Plan on a small, well-bounded feature for the first run, so you can see every step.

## Before you start

- A GitHub repository you can install an app on.
- For deploys: an AWS account and a deploy workflow in the repo. Forge builds and opens a pull request without one, but the deploy and post-deploy steps need it. See [Branches, PRs and deploys](../concepts/branches-prs-deploys.md).
- Optional: an API key from your AI vendor. You can add it during setup or later in project settings. See [Bring your own AI key](byok.md).

## 1. Create your workspace and connect GitHub

Sign up in the Forge web portal. It is self-service.

1. **Create an account.** Enter your email and a password of at least 12 characters. The portal emails you a verification code to activate the account.
2. **Name your workspace.** Usually your company or team name. You can change it later.
3. **Describe your codebase.** Answer a few questions about your tech stack, scale and needs. The portal recommends a plan from your answers, and you can change the choice. See [Plans and availability](../reference/plans.md).
4. **Connect GitHub.** Enter your GitHub organization. If the Forgestus GitHub App is not installed there, the portal links you to install it, and re-checks when you return. Then choose the first repository to connect. You can add AI vendor keys here too. See [Install the GitHub App](install-github-app.md).
5. **File your first epic** from the portal, or skip it and use GitHub as described below.

The portal creates your first project automatically. You can add repositories and change settings later. See [Project settings](../reference/project-settings.md).

## 2. Teach Forge your codebase

On any issue in the repository, comment:

```text
/init
```

Forge scans the repository, writes a `solution.md` navigation map (architecture, entry points, modules) and records the detected stack. An analyst agent then asks you a few questions in the issue. Reply in plain text. Every later agent reads this map. Allow roughly 2 to 5 minutes per repository.

More detail: [Project setup](project-setup.md).

## 3. File an epic

If you did not create one in the portal, open a new issue in your repository, describe the work, and add the label `agent:epic`. Use the structure in [Write a good epic](writing-an-epic.md): a short description, acceptance criteria as numbered checkboxes, and non-goals.

## 4. Review the plan

Forge checks your epic against the real entities in your code, asks questions on the issue if something does not line up, then posts one plan comment: the stories, their dependencies and size estimates, plus a cost and risk band. Reply in plain text to ask for changes. The planner reads your reply and updates the plan.

## 5. Approve

When the plan looks right, comment:

```text
/proceed
```

Forge starts the build. To skip the review step on a project, add the label `agent:auto-approve` to the epic. A hard mismatch between your epic and the code always stops and asks, even with auto-approve.

## 6. Follow along

Forge posts progress as comments on the epic issue. The web portal shows the same epic with a live view of running agents, cost so far, and a "Today" inbox of anything waiting on a human.

## 7. Review the pull request

When the work passes its checks and deploys to your dev environment, Forge opens a pull request. Review it like any other. Forge can track the pull request and fix actionable review comments for you. See [Branches, PRs and deploys](../concepts/branches-prs-deploys.md).

## If something stalls

See [Why is my epic stuck?](../help/troubleshooting.md). Most stalls end with a single command such as `/retry` or `/answer`.
