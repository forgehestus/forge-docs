---
description: Known limitations of Forge today, so you can judge fit before you start.
---

# Known limitations

We would rather you hear these from us.

## Platform

- **GitHub and AWS only.** Azure DevOps and other clouds are not supported. Terraform, Pulumi and Bicep are not supported infrastructure targets. Infrastructure is AWS CDK.
- **Languages.** Go, Rust, Ruby and PHP are detected at `/init` but have no implementation agents.
- **Commands run by anyone who can comment.** On a public repository, anyone who can comment on an issue can run most commands.
- **No published uptime commitment or SLA.**
- **No published time-to-deliver or cost-per-epic figures.** Each epic gets its own cost band.

## Modernization

- Migration, safety net, requote and parity work on a single repository at a time.
- The current release is strongest on class libraries and ASP.NET Web API. WebForms and WCF depend on [recipes](../modernization/recipes.md), which are early access.
- The Windows runner image is provisioned by Forgestus.
- Migrated code is delivered as a pull request. Deployment is yours.
- WCF to REST or gRPC, MSMQ, ASMX, VB.NET and authentication continuity across a cutover are not converted today.
- No public parity benchmark exists yet.

## Early access

[Parity Proof](../modernization/parity-proof.md), the [recipes](../modernization/recipes.md), CloudWatch log review and running in your own AWS account are early access: built and tested, enabled per project, and not yet proven at scale.
