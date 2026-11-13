# Glossary

**Epic.** One feature request on a GitHub issue that Forge plans, builds, tests and delivers.

**Story.** One slice of an epic with its own tests and branch.

**Brownfield.** An existing codebase, as opposed to a new project.

**Characterization test (pinning test).** A test that records what the code does today, bugs included, so a change in behavior is caught.

**Parity.** The new code gives the same results as the old code on the same tests. See [Parity Proof](../modernization/parity-proof.md).

**Slice-by-slice (strangler).** Replacing a system in pieces while it keeps working, instead of rewriting it all at once.

**Mechanical, assisted, human-required.** The three classes of migration difficulty. See [The Assessment](../modernization/assessment.md).

**Windows runner.** The Windows container where .NET Framework code is built and tested.

**BYOK.** Bring your own key for the AI vendor. See [Bring your own AI key](../get-started/byok.md).

**Evidence pack.** A bundle of change, review, test, cost and deploy records with an integrity hash. See [Security overview](../security/overview.md).

**Guardrail (Sign).** A project rule every agent reads and every reviewer enforces.

**Repo skill.** A markdown file of team conventions under `.forge/skills/` that is injected into every agent.

**Drift probe.** A scheduled check against an external source of truth, such as a .NET target framework reaching end of support. It files one issue per distinct finding.

**MCP.** Model Context Protocol, a standard way for an agent to call tools such as CloudWatch.

**Early access.** Built and tested, enabled per project, not yet proven at scale.
