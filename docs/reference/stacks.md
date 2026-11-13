---
description: "Stacks Forge supports for building and for modernization sources, including .NET, Java and Python."
---

# Supported stacks

<span class="badge badge-live">Live</span>

Node, .NET and .NET Framework, React, Next.js, Angular, Blazor, Flutter, Windows desktop and services, and SQL Server projects, on GitHub and AWS. Java and Python are also available.

Stacks beyond Node, React and Flutter are on Business and Enterprise. See [Plans and availability](plans.md).

| Layer | Supported | Notes |
|---|---|---|
| Backend | Node (Express); .NET (modern, SDK-style, built on Linux, Lambda .NET 10); .NET Framework 4.x (MSBuild, NuGet and vstest on Windows runners); Java (Spring Boot, Maven or Gradle, JUnit 5); Python (FastAPI, Django or Flask, pytest) | Java and Python are available on Business and Enterprise. We confirm fit with you before you rely on them for a project. |
| Web | React, React with Vite, Next.js, Angular, Blazor | |
| Mobile | Flutter; Unity on Enterprise | |
| Windows | WPF, WinForms, WinUI 3, MAUI (C#), Windows services (C#) | Needs a Windows runner. |
| Database | SQL Server database projects (SSDT): `.sqlproj`, `.dacpac`, SqlPackage, LocalDB, tSQLt | |
| Infrastructure as code | AWS CDK | Terraform, Pulumi and Bicep are not supported. |
| Source control | GitHub, through a GitHub App | Azure DevOps is not supported. |
| Cloud | AWS: Fargate, Lambda, DynamoDB, S3, CloudWatch, Secrets Manager; Elastic Beanstalk Windows for hosting .NET Framework apps | |

## Detected but not built

Go, Rust, Ruby and PHP are detected at `/init` but have no implementation agents, so Forge can scan them but not build in them. Custom stack onboarding is available as a service on Enterprise.

## Migration sources

For which .NET Framework technologies Forge can migrate, and which it flags for a person, see [Sources and targets](../modernization/sources-and-targets.md).
