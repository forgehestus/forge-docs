---
description: "Which legacy .NET sources Forge can modernize, which modern targets it migrates to and where migrated code can run."
---

# Sources and targets

<span class="badge badge-live">Live</span> <span class="badge badge-plan">Business and Enterprise</span>

## Sources

- Classic **.NET Framework 4.x**: legacy non-SDK projects, `packages.config`, MSBuild and NuGet, built and tested with vstest on Windows runners.
- **ASP.NET Web API** and class libraries. This is the sweet spot of the current release.
- **WinForms and WPF**, and **Windows services**. See [Recipes](recipes.md).
- **SQL Server database projects (SSDT)**: `.sqlproj` and `.dacpac`.

Projects with hard blockers are classified and paused for a person. See [The Assessment](assessment.md).

## Targets

**.NET 10 (LTS, supported through November 2028) is the default target.**

- **.NET 8 and .NET 9** are accepted but flagged: both reach end of support on **November 10, 2026**.
- **.NET 11** is pre-release and is not offered by default.
- The target is configurable per project.

Forge posts a target-framework support notice in the Assessment report. A scheduled drift probe can also file an issue when a project's target framework approaches end of support.

## Where migrated code can run

- Modern backends target AWS Lambda (.NET 10) or containers.
- Classic Framework applications that stay on Framework can host on AWS Elastic Beanstalk Windows (IIS).
- Forge itself does not deploy migration epics. You deploy the pull request with your own pipeline.

## Windows runners

.NET Framework code builds and tests on Windows containers. The Windows runner image is provisioned by Forgestus. Cold start for a Windows epic is longer than for a Linux epic, and a Windows-based epic counts as two epics against the monthly allowance.

## Scope notes

Migration, the safety net, requote and parity work on a single repository at a time.
