---
description: Install the Forge GitHub App on your organization or repositories and choose which repos Forge can access.
---

# Install the GitHub App

<span class="badge badge-live">Live</span>

Forge works through a GitHub App. You choose which repositories it can see, and you can remove it at any time from your GitHub organization settings.

## Permissions and why

The authoritative list is on the App's page in GitHub. At the time of writing, Forge requests:

| Permission | Access | What Forge uses it for |
|---|---|---|
| Contents | Read and write | Read your code for context, create story and epic branches, commit the agents' work. |
| Issues | Read and write | Read the epic, post the plan and progress, react to your commands. |
| Pull requests | Read and write | Open pull requests, post reviewer verdicts and track review feedback. |
| Checks | Read and write | Show epic progress as check runs on pull requests. |
| Actions | Read | Read workflow run logs after a deploy so a failed deploy is diagnosed from the real error. |
| Workflows | Read | Read your deploy workflows to learn your deploy targets and confirm the result callback is wired. |
| Metadata | Read | Required by GitHub for any app. |
| Members (organization) | Read | Attribute commands such as `/proceed` to the right person in the audit ledger. |

Forge authenticates to your repositories with short-lived installation tokens issued by GitHub. It does not need your AWS credentials to build and ship code: your own GitHub Actions workflows deploy with your own credentials.

## Who can run commands

Anyone who can comment on an issue can run most [slash commands](../reference/commands.md). On a private repository that is the people you have already given access to. On a public repository, remember that anyone who can comment can issue commands, so consider restricting issue comments.

Comments on pull requests are never treated as commands. They become review feedback.

## Branch protection

By default Forge merges only into `develop` and `test` and opens pull requests into `main`, which you merge. Keep branch protection and required reviews on your default branch as you normally would. If you configure Forge to merge into your default branch, protect it with required checks. See [Branches, PRs and deploys](../concepts/branches-prs-deploys.md#which-branches-forge-merges-into). See [Shared responsibility](../security/overview.md#what-you-control).
