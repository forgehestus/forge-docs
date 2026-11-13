# Write a good epic

<span class="badge badge-live">Live</span>

An epic is one feature request on a GitHub issue. The quality of the plan and the tests depends on how clearly the epic states what "done" means. QA writes failing tests directly from your acceptance criteria before any code exists.

## Structure

Use these sections in the issue body:

- **Description:** what the feature is and who it is for, in plain language.
- **Acceptance Criteria:** numbered checkboxes (`FR-1`, `FR-2`, ...). Each one should be testable: a person could say yes or no.
- **Non-Goals:** what this epic must not touch.
- **Implementation notes:** constraints, existing code to reuse, tradeoffs you care about. Optional.

Add the label `agent:epic` to start the flow.

## Example

```markdown
## Description
Let billing admins export a month of invoices as CSV from the Invoices page.

## Acceptance Criteria
- [ ] FR-1: An "Export CSV" button appears on the Invoices page for users with the BillingAdmin role.
- [ ] FR-2: The export contains one row per invoice for the selected month, with the same columns as the on-screen table.
- [ ] FR-3: Exports of more than 10,000 invoices are generated in the background and emailed as a link.
- [ ] FR-4: Users without BillingAdmin get a 403 from the export endpoint.

## Non-Goals
- Changing how invoices are calculated.
- PDF export.

## Implementation notes
Reuse the existing InvoiceQuery service. Do not add a new reporting table.
```

## Tips that change the outcome

- **Name things as your code names them.** Forge checks the nouns in your epic against the real entities in the code and the code graph. If you write "User" and the system only has "Account" and "Patient", Forge stops and asks instead of inventing a type.
- **One behavior per criterion.** "Admins can export and the export is fast" is two criteria, and the second is not testable.
- **State non-goals.** They are the cheapest way to keep scope and cost down.
- **Keep an epic to one outcome.** Forge splits an epic into stories itself. If the epic is really three features, file three epics.
- **Point at existing code** in the implementation notes when there is a right way to do it.

## Bugs

For a bug, label the issue `agent:bug` instead. The bugfix agent needs four things in the issue: acceptance criteria, repro steps, current behavior and expected behavior. If one is missing it asks. It reproduces the bug, fixes the root cause, writes a regression test plus one test per acceptance criterion, and opens a pull request. There is no planner and no deploy step.

## Approval options

- Reply `/proceed` to approve the plan.
- Add the label `agent:auto-approve` to skip the plan review for that epic. A hard mismatch between the epic and the code still stops and asks.
