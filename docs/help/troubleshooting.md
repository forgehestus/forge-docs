# Why is my epic stuck?

<span class="badge badge-live">Live</span>

Most stalls end with one command. Start with the epic's latest comment from Forge: when something needs you, it says what and which command to run. The web portal's **Today** inbox and the "Why is this stuck?" card show the same thing with the exact command.

Commands are read from the first line of a comment. A 👀 reaction means Forge received the comment. It does not mean the command worked, so wait for Forge's reply.

## Nothing happened after I filed the epic

| Check | Fix |
|---|---|
| The issue has the label `agent:epic` (or `epic` together with `agent-ready`). | Add the label. |
| The GitHub App is installed on this repository. | Install or extend it. See [Install the GitHub App](../get-started/install-github-app.md). |
| No 👀 reaction on your comments. | Forge did not receive the event. Check that the App is installed on the repository and that webhooks are delivering. |

## By symptom

| Symptom | What it usually means | What to do |
|---|---|---|
| Plan not posted, epic sits at planning | The planner is stuck or was interrupted | `/retry` restarts the planner. |
| Plan posted, nothing builds | Waiting for your approval | Reply `/proceed`. |
| `/proceed ignored — state is X` | The epic is not in an approvable state | Check the epic's current state in the portal. |
| Build blocked, mentions budget | The projected cost is above your remaining monthly budget | Raise `budget_cap_usd` with `/project-set`, or `/proceed --force` as an approver. |
| Forge asked a question | An agent hit something it should not decide | Answer with `/answer`. On an epic that spans repositories, use `/answer --story <repo>/<number> <answer>`. |
| A story is blocked | A dependency or decision is outstanding | Resolve it, then `/unblock` on the story issue. |
| An agent failed | A crash, a timeout, or a retry cap was hit | `/retry` re-runs the failed step. `/retry <agent>` re-runs one agent. `/restart` on the story issue re-runs the whole story chain. |
| Same failure keeps repeating | Retries will not help | `/triage` asks Forge to diagnose and recommend. Consider `/abort` on the story and splitting it. |
| Deploy failed | Forge reads the log and either fixes it or escalates | If the log shows a credentials or permissions problem, fix it in your AWS account or workflow, then `/retry`. |
| Browser smoke failed after an intentional UI change | The stored screenshots are out of date | `/smoke-baseline-update` then `/smoke-rerun`. |
| Smoke failed for another reason | A real regression or a flaky check | `/smoke-rerun` to repeat, or fix the code. |
| Pull request feedback was not picked up | Tracking is waiting | Reply on the pull request or push a commit to re-arm tracking, or use the portal's "check for feedback now". |
| Epic is paused | Someone ran `/pause` | `/resume`. |
| A settings change did not apply | Settings are cached | `/refresh-config`. |
| Parity run stopped | A run ended without finishing | `/proceed` resumes from the last approved step. See [Parity Proof](../modernization/parity-proof.md). |

## Stopping cleanly

- One story: `/abort` on the story issue. The rest of the epic continues.
- Whole epic: `/abort` on the epic issue. It stops running agents, marks unfinished stories aborted, posts a cost summary and cleans up branches.
- Redo from planning: `/restart` on the epic issue.

## Still stuck

Collect the epic issue link, the state shown in the portal and the last Forge comment, and see [Support](support.md).
