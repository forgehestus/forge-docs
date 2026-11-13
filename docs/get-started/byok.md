---
description: "Bring your own AI key to Forge: supported providers, how to add your key, what goes to your AI vendor and spending limits."
---

# Bring your own AI key

<span class="badge badge-live">Live</span>

Forge runs its agents on models from the AI vendor you choose, using your own key. Token charges are billed by your vendor at your contract rate. Forgestus does not add a markup to them.

## Supported providers

| Provider | Plans | Notes |
|---|---|---|
| Anthropic | All plans | Paste an API key. |
| AWS Bedrock | Business and Enterprise | Uses a cross-account IAM role in your AWS account. |
| OpenAI | Enterprise | Paste an API key. |
| Google Vertex | Enterprise | Paste service-account JSON. |

Claude models are the ones Forge's agents are tuned and tested against. Use other models only after talking with us, because tool use quality varies by model.

## Add your key

1. Open the web portal and go to your project's settings.
2. Open the model and key settings and choose a provider.
3. Paste the key. It is stored in Forge's secrets store and injected into each agent task when it launches.

For Bedrock, you create an IAM role in your account that Forge's agent role can assume, and enter the role ARN. For Vertex, upload the service-account JSON.

## What goes to your AI vendor

File contents, tool output, issue text and plan text are sent to the vendor you choose, under your agreement with that vendor. Any retention or training terms come from that agreement. See [Data handling and retention](../security/data-handling.md).

## Choosing models

By default Forge routes by role: a strong, cost-efficient model for planning, building and infrastructure; a small fast model for architecture and QA; the strongest available model for reviewers, the product manager and the migration, parity and solution analysts. You can override the model per agent in project settings.

Cost shown in the portal is agent compute cost, estimated from published token rates. It is a guardrail, not your invoice. Your vendor's bill is the source of truth.

## Spending limits

Set a monthly budget cap in project settings, or from an issue:

```text
/project-set budget_cap_usd 750
```

As the budget is consumed Forge slows new work, warns at 80 percent, and blocks a build projected to exceed what is left unless an approver overrides with `/proceed --force`. See [Slash commands](../reference/commands.md).
