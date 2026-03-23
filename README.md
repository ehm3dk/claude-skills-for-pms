# Claude Skills for Product Managers

A collection of Claude Code skills built for product managers — covering strategy, research, delivery, and stakeholder communication.

## What are skills?

Skills are instruction sets that extend Claude Code's behaviour for specific tasks. When a skill is active, Claude follows its workflow automatically when you describe what you need.

## Installation

1. Clone this repo into your Claude skills directory:

```bash
git clone https://github.com/ehm3dk/claude-skills-for-pms.git ~/.claude/skills
```

2. Or if you already have a skills directory, copy the `skills/` folder contents into it.

3. Restart Claude Code — skills are loaded automatically at session start.

---

## Skills

### Strategic

| Skill | What it does |
|-------|-------------|
| `define-product` | Generate a full PRD from a feature description or Jira ticket. Includes user stories, acceptance criteria, NFRs, test cases, and engineering instructions. |
| `discovery` | Run structured market research and competitor analysis. Covers TAM/SAM/SOM, competitor landscape, feature matrix, SWOT, gaps, and positioning. Uses live web search. |
| `challenge-me` | Stress-test an idea, plan, or decision. Surfaces blind spots, challenges weak assumptions, and presents the strongest counter-argument. |
| `log-decision` | Log an architectural or product decision to Confluence. Asks structured questions then creates a decision log page. |

### Communication

| Skill | What it does |
|-------|-------------|
| `meeting-notes` | Turn raw meeting notes or transcripts into structured documents with decisions, action items, and open questions. |
| `release-note` | Generate release notes from Jira tickets, Confluence pages, or a feature description. Supports multi-channel output. |
| `one-pager-creator` | Create a concise one-page brief for quick stakeholder alignment or feature proposals. |

### Specs

| Skill | What it does |
|-------|-------------|
| `jira-story-creator` | Generate well-structured Jira stories with acceptance criteria and edge cases, then create them directly in Jira. |

### Planning

| Skill | What it does |
|-------|-------------|
| `experiment-designer` | Design product experiments beyond A/B tests — pricing, features, operations, and pilot programs. |
| `release-readiness` | Assess whether a feature is ready to release against functional, data, security, NFR, and ops criteria. |

### Changelogs

| Skill | What it does |
|-------|-------------|
| `update-inventory` | Sync DLRINV Done items to the Inventory changelog Confluence page. |
| `update-customer` | Sync DLRUSER Done items to the Customer Team Change Log Confluence page. |

---

## Usage

Just describe what you need in natural language:

```
"Write a PRD for a dealer search feature"
→ uses define-product

"Process these meeting notes"
→ uses meeting-notes

"Do a competitive analysis for our pricing tool"
→ uses discovery

"Create Jira stories for this feature"
→ uses jira-story-creator

"Log this architecture decision"
→ uses log-decision
```

---

## Structure

```
skills/
  challenge-me/
  define-product/
  discovery/
  log-decision/
  communication/     — meeting notes, one-pagers, release notes
  planning/          — experiments, release readiness
  specs/             — Jira story creation
  update-customer/
  update-inventory/
```

---

## Contributing

Skills are plain Markdown files. Each skill lives in `skill-name/SKILL.md`. To add a skill: create the directory, add a `SKILL.md` with frontmatter `name` and `description`, and open a PR. See `CONTRIBUTING.md` for full details.
