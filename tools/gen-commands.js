// Generates docs/reference/commands.md from the internal command-reference data.
// Usage: node tools/gen-commands.js <path-to-forge-command-reference.html> > docs/reference/commands.md
// Operator-only commands (/engine, /flag) and internal details (source refs, ticket ids, flag names) are omitted.
const fs = require("fs");
const html = fs.readFileSync(process.argv[2], "utf8");
const a = html.indexOf("const C = [");
const b = html.indexOf("const CATS");
const cats = html.slice(b).match(/const CATS = (\[.*?\]);/s)[1];
const { C, TRIG } = new Function(html.slice(a, b) + ";return {C,TRIG}")();
const CATS = JSON.parse(cats);
const OMIT = /^\/(engine|flag)\b/;
const internal = /\bflags?\b|parity_(proof|db)|FORGE-\d+|\bbucket\b/i;
const clean = (s) => (s || "")
  .split(/(?<=[.!?])\s+/)
  .filter((x) => !internal.test(x))
  .join(" ")
  .trim();
const esc = (s) => String(s).replace(/\|/g, "\\|").replace(/\n/g, " ");
let out = `# Slash command reference

Forge reads commands from GitHub issue comments. Type the command as the **first line** of a comment on the epic or story issue.

!!! info "How commands are read"
    - Only the first line of a comment is parsed. Later lines are notes, except for commands that read the comment body (\`/epic-targets\`, \`/pause\`, \`/intervene\`, \`/init\`, \`/parity waive\`, and the \`/proceed\` parity options).
    - A 👀 reaction means Forge received the comment, not that the command succeeded. Watch for Forge's reply comment.
    - Anyone who can comment on the issue can run commands. Comments on pull requests are never treated as commands; they become PR feedback.
    - Some commands depend on your plan. See [Plans and availability](plans.md).

`;
for (const cat of CATS) {
  const title = cat === "Configuration & flags" ? "Configuration" : cat;
  const items = C.filter((x) => x.cat === cat && !OMIT.test(x.c));
  if (!items.length) continue;
  out += `## ${title}\n\n`;
  for (const x of items) {
    out += `### \`${x.c}\`\n\n`;
    if (cat === "Parity Proof" || /^\/cutover/.test(x.c)) out += `<span class="badge badge-early">Early access</span>\n\n`;
    out += `**Where:** ${x.where}`;
    if (x.alias) out += `  \n**Alias:** \`${x.alias}\``;
    out += `\n\n${clean(x.sum)}\n\n`;
    const st = clean(x.states);
    if (st && st !== "Any.") out += `**When it works:** ${st}\n\n`;
    const opts = (x.opts || []).filter((o) => !/^plan\b/i.test(o.f) && !internal.test(o.f));
    if (opts.length) {
      out += `| Option | What it does |\n|---|---|\n`;
      for (const o of opts) out += `| \`${esc(o.f)}\` | ${esc(clean(o.e))} |\n`;
      out += `\n`;
    }
    if (x.ex) x.ex = x.ex.replace(/net8/g, "net10");
    if (x.ex) out += `**Example**\n\n\`\`\`text\n${x.ex}\n\`\`\`\n\n`;
    const g = clean(x.gotcha);
    if (g) out += `!!! note\n    ${g}\n\n`;
  }
}
out += `## Comments that are not commands\n\n| What you do | What Forge does |\n|---|---|\n`;
for (const t of TRIG) {
  if (/agent:validate-result|agent:deploy-result/.test(t.h)) continue;
  out += `| ${esc(t.h)} | ${esc(clean(t.p))} |\n`;
}
out += `\n`;
process.stdout.write(out);
