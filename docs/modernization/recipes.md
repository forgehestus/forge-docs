# Recipes

<span class="badge badge-early">Early access</span> <span class="badge badge-plan">Business and Enterprise</span>

Recipes move specific legacy technologies that a plain project conversion cannot handle. They turn some classes of "human-required" blocker into "assisted" work. Recipes are enabled per project and are newer than the core conversion. Ask us whether a recipe fits your system before planning around it.

## Available recipes

### CoreWCF (WCF server)

Moves portable WCF services to CoreWCF: package swap, host change and configuration translation. Supported bindings: basicHttp, basicHttps, netTcp, wsHttp and netNamedPipe. The MSMQ transport, wsDualHttp, WS-ReliableMessaging and custom bindings stay human-required.

### WebForms to Blazor

Page by page: extract the code-behind, regenerate the view, and pin behavior with Playwright UI-flow tests. This is the newest and least proven recipe.

### WinForms and WPF retarget

Retargets to `<framework>-windows` while keeping UI code and designer files. Vendor control suites (DevExpress, Telerik, Infragistics, ComponentOne, Syncfusion) need a modern licensed package. ActiveX stays human-required.

### Windows service to Worker Service

Topshelf and `ServiceBase` services become `UseWindowsService()` with a `BackgroundService`, keeping the service name.

### Stored procedures to C#

Forge inventories every stored procedure and tiers them A, B and C by complexity. Cursors, dynamic SQL, linked servers and SQLCLR are never selected automatically. Selected procedures are re-implemented in C# and must pass equivalence tests against the real procedure on a throwaway database: return value, outputs, result sets and table writes. A per-procedure switch (Sproc, Shadow, CSharp) means nothing changes in production until you flip it. A single epic is capped at 20 procedures.

Database equivalence testing runs on the Windows runner and is still being verified there.

### SQL Server database projects (SSDT)

<span class="badge badge-live">Live</span> as a build stack. Forge detects `.sqlproj`, classifies it, converts it to an SDK-style project, builds the dacpac with SqlPackage and LocalDB, and tests with tSQLt. Deeper Windows verification is still in progress.

### Namespace seams

For a single-project monolith, Forge proposes seams for slicing and you approve them.

## Detected but not converted

These are recognized and classified in the [Assessment](assessment.md), but Forge does not convert them today:

- WCF to REST or gRPC conversion
- MSMQ modernization
- Authentication and session continuity across a cutover boundary
- ASMX web services
- VB.NET
- IIS pipeline modules

Anything Forge cannot migrate safely is flagged for a human.
