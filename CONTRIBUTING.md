# Contributing to the Forge docs

## Status labels

Every page that describes a feature starts with a status badge:

- `<span class="badge badge-live">Live</span>`: shipped and used in real runs.
- `<span class="badge badge-early">Early access</span>`: built and tested, but enabled per project or not yet proven at scale. Say "available in pilots", never imply a track record.
- `<span class="badge badge-plan">Business and Enterprise</span>`: plan chips, where a feature is plan-limited.

Features that are planned but not built are **not documented**.

## Claims checklist (run before every pull request)

A page fails review if it does any of these:

1. Claims a certification or attestation (SOC 2, FedRAMP, PCI, HIPAA, HITRUST). Forgestus holds none. Compliance support means coding rules applied to the agents plus an evidence pack. SOC 2 and FedRAMP are roadmap only.
2. Calls the audit ledger "immutable" or "tamper-proof". It is an append-only ledger with an integrity hash on exports.
3. Presents a feature as available when it is not shipped. Check the internal claims register before documenting anything new.
4. Promises "guaranteed" or "100% identical" behavior parity. Describe the mechanism: tests that pin today's behavior run before and after, and a slice that does not match does not ship.
5. Quotes speed, savings, uptime or per-epic cost numbers. None are verified or published.
6. Names or implies a customer, case study or completed migration.
7. States prices. Link to the pricing page on forgestus.ai instead.
8. Describes Enterprise self-hosting in a customer AWS account as shipped. It is early access.
9. Documents internal operations: feature-flag stages and kill switches, database internals, account or role identifiers, runbooks.
10. Uses hype words ("revolutionary", "10x", "game changer") or exclamation marks.

Targets: .NET 10 LTS is the default migration target. .NET 8 and 9 reach end of support on November 10, 2026.

## Style

Plain words. Engineer to engineer. Lead with what the reader can do, then why. Prefer a short example over a paragraph of description. Never criticize legacy code; criticize big-bang rewrites.

## The commands page is generated

`docs/reference/commands.md` is produced by `tools/gen-commands.js` from the internal command reference. To change a command's documentation, change the source and regenerate:

```bash
node tools/gen-commands.js path/to/forge-command-reference.html > docs/reference/commands.md
```

## Local checks

```bash
pip install -r requirements.txt
mkdocs build --strict
```
