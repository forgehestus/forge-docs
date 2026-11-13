---
description: "Frequently asked questions about Forge: modernization, pricing, merging, security and how epics work."
---

# FAQ

## Does Forge rewrite everything with AI?

No. Forge works one slice at a time, writes tests that pin current behavior first, and a slice only ships if the same tests pass on the old and the new code. See [Modernization](../modernization/index.md).

## Will it handle WebForms, WCF or VB.NET?

Forge classifies them first. WCF has a known path for common bindings and WebForms has a Blazor path, both in early access. VB.NET is detected and classified but not converted. Anything it cannot migrate safely is flagged for a human. See [Recipes](../modernization/recipes.md).

## Where does my code go?

Code is cloned to ephemeral containers in Forgestus's managed AWS cloud, or, on Enterprise in early access, to your own AWS account. File contents, tool output, issue text and plan text are sent to the AI vendor you choose, using your key. See [Security overview](../security/overview.md).

## Do you train on my code?

Forgestus makes no zero-retention or no-training commitment of its own for traffic to your AI vendor. What your vendor retains or trains on is set by your agreement with that vendor.

## Are you SOC 2 or HIPAA compliant?

Forgestus holds no certifications today. SOC 2 and FedRAMP are on the roadmap. HIPAA and HITRUST coding rules can be applied to the agents and Forge produces an evidence pack for your team, but that is evidence for your program, not a certification. See [Certifications and roadmap](../security/certifications.md).

## Who pays for AI usage?

You do. You bring your own AI vendor key, so token charges go to your vendor at your contract rate. See [Bring your own AI key](../get-started/byok.md).

## Does Forge deploy to my cloud?

Forge writes your deploy workflows and your own GitHub Actions run them in your AWS account with your credentials. Migration epics never deploy. See [Branches, PRs and deploys](../concepts/branches-prs-deploys.md).

## Does Forge merge to my main branch?

Not with the default configuration. Forge merges epics into `develop`, promotes to `test`, and opens a pull request into `main` that you review and merge. Forge never merges the pull request itself. Branch names and pull request timing are configurable, and if you point the integration branch at `main`, Forge merges there directly. See [Branches, PRs and deploys](../concepts/branches-prs-deploys.md#which-branches-forge-merges-into).

## What can I run on?

See [Supported stacks](../reference/stacks.md). GitHub and AWS only today.

## What if Forge cannot do part of the work?

It stops and says so, with a diagnosis and the command to continue, rather than guessing. See [Humans in the loop](../concepts/human-in-the-loop.md).

## How much does it cost?

See the [Forge pricing and plans page](https://forgestus.ai/pricing.html). Every epic also gets a cost band with its plan before any building starts. See [Epic lifecycle](../concepts/epic-lifecycle.md).

## Can I try it on my code?

For modernization, the one-week read-only [Assessment](../modernization/assessment.md) is the low-risk first step. Forge never writes to your code during it.

## Is there an uptime commitment?

There is no published uptime commitment or SLA. Support is founder-led. See [Support](support.md).
