---
description: "The Forge Assessment: a one-week, fixed-price, read-only analysis of your legacy .NET codebase before modernization starts."
---

# The Assessment

<span class="badge badge-live">Live</span> <span class="badge badge-plan">Business and Enterprise</span>

The Assessment is the standard first step for a modernization. It is a one-week, fixed-price, read-only analysis. Forge never writes to your code during it. Analysis output goes to a separate notes branch. See the [Forge pricing and plans page](https://forgestus.ai/pricing.html) for current terms.

## What you get

- **System map:** architecture, data flows and business rules.
- **Risk register:** modules ranked by change frequency, complexity and test-coverage gap.
- **Modernization plan:** dependency-ordered, with a difficulty score per slice.
- **Executive readout:** a written summary and a fixed-price quote for the first slices.

The written report is delivered as branded HTML and PDF: an executive summary, project classifications by tier, a dependency graph, the recommended migration order, recipe options that would widen scope, action items for you, and a notice about target-framework support dates. A person at Forgestus reviews it before it reaches you.

## How projects are classified

A read-only analyst inventories every project in the solution. A deterministic engine, not a model's guess, then classifies each project:

| Class | Meaning |
|---|---|
| **Mechanical** | Safe to convert automatically. |
| **Assisted** | Convertible with a known recipe. |
| **Human-required** | Never auto-attempted. A person decides. |

Each project gets a difficulty score from blocker severity, package risk and test-coverage gap. Forge reads project dependency edges so the migration order is truly leaf-first.

**Hard blockers** (human-required): WebForms, WCF server, AppDomain, Remoting, MSMQ, SQLCLR, the VB Compatibility library, WinForms and WPF desktop UI, ActiveX and COM controls, and packages with no modern equivalent. Some of these have an early-access path through a [recipe](recipes.md).

**Soft blockers** (assisted): System.Web, WCF client, P/Invoke, ConfigurationManager and Entity Framework 6.

The classification is explainable and repeatable, which matters to risk and audit teams.

## Cost and risk quote

At the plan stage Forge posts a dollar band built from your repository's own history (after three completed epics) or the median for that stack, with risk flags. `/requote` recomputes it without re-running the analyst. Actual cost is recorded at the end. The band is informational, not a binding price.

## What the Assessment does not include

It is analysis, not a security scan, and it does not change code. A pilot or plan is what turns the ordered plan into migrated slices.
