---
description: "What Forge stores and for how long, what leaves Forge, where processing happens and how masking works."
---

# Data handling and retention

<span class="badge badge-live">Live</span>

## What Forge stores and for how long

| Data | Where | Retention |
|---|---|---|
| Agent run records (model, tokens, cost, outcome) | Forge's state store | 90 days |
| Audit ledger entries | Forge's state store | Permanent on Business and Enterprise; 90 days on Team |
| Working checkpoints | Forge's storage | 90 days |
| Plans, progress comments and pull requests | Your GitHub | Under your GitHub settings |
| AI vendor keys | Forge's secrets manager | Stored until you remove them |

For retention of anything not listed here, contact us.

## What leaves Forge

File contents, tool output, issue text and plan text are sent to the AI vendor you choose, using your key, under your agreement with that vendor.

## Where processing happens

- Team and Business: Forgestus's managed AWS cloud, with each agent in its own short-lived container.
- Enterprise: optionally your own AWS account. <span class="badge badge-early">Early access</span>

## Masking

On Business and Enterprise, a pattern-based [PHI and secret guard](overview.md#phi-and-secret-guard) can mask sensitive values at input and output boundaries. It must be enabled in `enforce` mode.

## Questions this page does not cover

Encryption specifics, data residency, subprocessors and answers for a security questionnaire are handled directly. Email [support@forgestus.ai](mailto:support@forgestus.ai).
