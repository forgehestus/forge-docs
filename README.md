# Forge documentation

Public documentation for **Forge**, the autonomous software delivery system from [Forgestus.ai](https://forgestus.ai).

Published with GitHub Pages at <https://forgehestus.github.io/forge-docs/>.

## Working on the docs

```bash
pip install -r requirements.txt
mkdocs serve          # live preview at http://127.0.0.1:8000
mkdocs build --strict # must pass before you open a pull request
```

The site deploys automatically from `main` through `.github/workflows/pages.yml`. In the repository settings, set **Pages > Source** to **GitHub Actions** (one time).

`docs/reference/commands.md` is generated from the internal command reference. Do not edit it by hand; see `CONTRIBUTING.md`.

## Contributing

Read `CONTRIBUTING.md` first. Every page is checked against a claims policy before it is published.
