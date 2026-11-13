# Ship a feature epic

<span class="badge badge-live">Live</span>

An end-to-end walk through one feature epic, with what you will see at each step and the commands you can use.

## 1. File the epic

Create an issue using the structure in [Write a good epic](../get-started/writing-an-epic.md) and add the label `agent:epic`. Forge reacts to your comments with a 👀 reaction within about a second. The reaction means the comment was received, not that the command succeeded. Watch for Forge's reply.

## 2. Answer questions, review the plan

If the epic uses names that do not exist in your code, or leaves something open, Forge asks on the issue. Reply in plain text. Then it posts the plan: stories, dependencies, size estimates (Fibonacci points) and a cost and risk band.

To change the plan, reply in plain text. The planner re-runs with the thread. To see the band recomputed from the current plan, use `/requote`.

## 3. Approve

```text
/proceed
```

If the projected cost exceeds your remaining monthly budget, Forge blocks the build. An approver can override with `/proceed --force`.

## 4. Watch the build

Independent stories run in parallel. Each story goes through architecture, failing tests, implementation, security review, infrastructure code, code review and validation. The portal's live view shows each running agent and its cost. The "Today" inbox lists everything waiting on you.

## 5. Deploy and check

Forge merges into `develop`. Your workflow deploys to dev and reports back. On plans with post-deploy validation, smoke routes, schema checks, a CloudWatch error scan and a browser smoke test run against the deployed environment. See [Branches, PRs and deploys](../concepts/branches-prs-deploys.md).

## 6. Review the pull request

Forge opens the pull request when your timing setting says to, or when you run `/pr`. Review it as usual. If you leave comments, Forge can fix the actionable ones on the epic branch.

## Controlling an epic in flight

| Want to | Use |
|---|---|
| Stop starting new work | `/pause`, then `/resume` |
| Stop one story, keep the rest | `/abort` on the story issue |
| Re-run a failed agent | `/retry` or `/retry <agent>` |
| Re-run a whole story | `/restart` on the story issue |
| Skip a story | `/skip` |
| Answer an agent's question | `/answer` |

## Cross-repo epics

<span class="badge badge-live">Live</span>

A project with two or more repositories can run one epic across them. Each story names its target repository, dependencies are repository-qualified, the primary repository is writable and the others are read-only at known commits. Merges and deploys run per repository in parallel, with coordinated rollback.

Start with `/epic-targets` on the anchor epic issue, listing the repositories on the following lines:

```text
/epic-targets
sql-project, desktop-app, windows-service
```

Some features are single-repo only: risk-weighted planning, the safety net, `/migrate`, `/pr`, `/upmerge` and `/requote`.

## Safety net on feature work

<span class="badge badge-plan">Business and Enterprise</span>

When a feature epic touches modules that have no tests, Forge can front-load characterization tests that pin their current behavior before the feature changes them. This is on by default on those plans for single-repo epics. You can also run it as its own epic with `/safety-net`: Forge ranks modules by change frequency, complexity and test-coverage gap, proposes the top ones, and after your approval writes tests that pin what the code does today. Bugs it finds in old code become a pinned test plus a note, never a silent change.

## CloudWatch log review

<span class="badge badge-early">Early access</span>

After a deploy on AWS, an agent can read your CloudWatch logs through an MCP server, using a read-only IAM role in your account. The role trusts only Forge's agent role, requires an ExternalId, and is limited to the log-group prefix you choose. The agent checks logs tagged with the run, the post-deploy window and a 30-minute baseline, then records a verdict:

- **Clean:** the epic advances.
- **Findings:** a fix agent runs, capped at 2 rounds by default, and escalates early when the same finding repeats.
- **Inconclusive:** a person looks.

A clean verdict is downgraded to inconclusive unless real log queries back it. The feature is opt-in per project and single-repo today. A role template is available from Forgestus.
