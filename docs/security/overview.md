# Security overview

<span class="badge badge-live">Live</span>

This page describes what Forge does and does not do to protect your code and your environment. It is written for security reviewers. For questions this page does not answer, such as encryption details or data residency, contact us.

## Where code runs

- **Team and Business** run in Forgestus's managed AWS cloud. Each agent runs in its own ephemeral container (AWS Fargate). Code is cloned from your GitHub repository with a short-lived installation token. Business and Enterprise use a persistent per-client repository mirror to speed up large repositories.
- **Enterprise** can run the orchestrator, state store, runners and storage in your own AWS account. <span class="badge badge-early">Early access</span> This is scoped with you.

## What goes to your AI vendor

File contents, tool output, issue text and plan text are sent to the AI vendor you choose, using your own key. Forgestus makes no zero-retention or no-training commitment of its own for that traffic; that depends on your agreement with your vendor. See [Data handling and retention](data-handling.md) and [Bring your own AI key](../get-started/byok.md).

## Isolation

Isolation between customers is logical, not physical. Project data is kept under per-project keys in a shared state table, and each agent runs in its own ephemeral container with only that project's credentials injected. Forge is not single-tenant infrastructure unless you run the Enterprise in-your-account option.

## Controls on what agents can do

- **Security review on every story.** An independent agent reviews merged code for injection, authentication, secrets and IAM issues. It can block a story and cannot edit code.
- **Independent code reviewers.** The agent that writes code is never the agent that reviews it.
- **Write-path limits.** Each agent can only write to the paths its role allows, enforced by the runtime.
- **Human review.** Forge opens pull requests and never merges them. By default it writes only to `develop` and `test`. See [Branches, PRs and deploys](../concepts/branches-prs-deploys.md#which-branches-forge-merges-into).
- **Never lose work.** Branch heads are pinned in archive references before any delete or force-push.
- **Command and webhook security.** GitHub webhooks are verified with an HMAC signature. Commands check that the commenter is a collaborator. Commands that affect every customer are limited to Forgestus operators. Credentials live in a secrets manager.
- **Protected comments.** Comments on pull requests are never treated as commands.

## PHI and secret guard

<span class="badge badge-plan">Business and Enterprise</span>

A pattern-based scanner masks sensitive values at every input and output boundary: file reads, tool output, GitHub comments, notes and audit text. It covers values such as SSNs, medical record numbers, phone numbers, addresses, tokens, private keys, connection strings and high-entropy strings. Modes are off, warn and enforce. Custom patterns are available on Enterprise.

The guard is regex-based and must be turned on in `enforce` mode to mask values. It is not a substitute for a Business Associate Agreement or for your own data-handling controls.

## Compliance coding rules and the evidence pack

<span class="badge badge-plan">Business and Enterprise</span>

HIPAA and HITRUST rule sets can be applied to every agent. They are coding constraints that the reviewers check. They are not a certification of Forge or of your system. Forge supports your compliance program; it does not replace it. See [Certifications and roadmap](certifications.md).

`/evidence-pack` builds a bundle for one epic, or for a quarter: change record, reviews, tests, deploys, cost ledger, redaction evidence, parity report IDs and hashes, with an integrity manifest (SHA-256), HTML and CSVs. The HIPAA and HITRUST annexes map that evidence to the frameworks. The pack is evidence for your reviewers. It is not an attestation.

## Audit ledger

Every agent run records model, provider, tokens, cost and outcome. The ledger is append-only and exportable as CSV, with an integrity hash on the export. Retention is permanent on Business and Enterprise and 90 days on Team.

## What you control

- **Repository access.** You choose which repositories the GitHub App can see.
- **Your AI key** and your vendor agreement.
- **Your deploy credentials.** Forge deploys through your own workflows with your own AWS credentials and does not need credentials into your AWS account to build and ship code.
- **Optional read-only log access.** If you enable CloudWatch log review, you create and scope the IAM role.
- **Branch protection and required reviews** on your default branch.
- **Who can comment on your issues.** Anyone who can comment can run most slash commands.
