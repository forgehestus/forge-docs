# Project setup

<span class="badge badge-live">Live</span>

## Settings live in the portal, not in your repo

Forge does not read a configuration file from your repository. Project settings (stacks, workflow, models, keys, schedules and more) are stored by Forge and edited in the web portal, or from an issue with `/project-set`. See [Project settings](../reference/project-settings.md).

Two things you can still keep in your repository: [repo skills](#repo-skills) and project guardrails.

## Onboarding a repository with /init

Comment `/init` on any issue in the repository. You can add a sentence of context after the command:

```text
/init Billing platform; the WebPortal repo is the customer UI
```

What happens:

1. **Scan.** A deterministic scan of the repository finds the architecture, entry points and modules, and records the stack it detects. Nothing is guessed by an AI at this step.
2. **Map.** Forge commits `solution.md`, a navigation map every later agent reads.
3. **Questions.** An analyst agent asks you a few questions in the issue to fill in what the code cannot say, such as intent and fragile areas. Reply in plain text. Your answers are folded into `solution.md`.
4. **Graph.** Forge builds a code graph of the default branch for impact analysis and refreshes it incrementally.

For a repository that belongs to a project with several repositories, `/init` scans each one and adds a multi-repo architecture section.

If `/init` is already running for a repository, Forge skips it.

## Stacks Forge detects

Forge detects the stack at `/init` and picks matching agent instructions and toolchains. See [Supported stacks](../reference/stacks.md) for exactly what is supported. Languages that are detected but have no implementation agents (Go, Rust, Ruby, PHP) can be scanned but not built.

## Repo skills

Put team conventions in `.forge/skills/*.md` in your repository. Each file is injected verbatim into every agent's instructions, so agents follow your conventions. Repo skills are available on every plan.

## Project guardrails

Guardrails are rules every agent reads and every reviewer enforces. Add one from an issue:

```text
/project-guardrails-add

## Sign: never auto-approve breaking changes to /api/v1
Trigger: PR touches src/api/v1/
Instruction: require human review
Reason: external clients depend on v1
```

Only people add guardrails. Agents never write them.

## Greenfield projects

For a brand-new repository, comment `/bootstrap` on an issue. Forge posts a feature menu, you reply with your picks, and `/proceed` generates the plan.
