# Claude Skills for Product Managers

A collection of [Claude Code](https://claude.ai/code) skills built for product managers — covering strategy, research, delivery, and communication.

Skills extend Claude's behaviour for specific PM tasks. Describe what you need in plain English and Claude activates the right workflow automatically.

---

## Installation

```bash
git clone https://github.com/ehm3dk/claude-skills-for-pms.git ~/.claude/skills
```

Restart Claude Code. Skills load automatically at session start.

---

## Skills

### Strategy

| Skill | What it does | Say something like... |
|-------|-------------|----------------------|
| `define-product` | Generate a full PRD — user stories, acceptance criteria, NFRs, test cases, and engineering instructions | *"Write a PRD for a dealer search feature"* |
| `discovery` | Run structured market research and competitor analysis with TAM/SAM/SOM, SWOT, feature matrix, and positioning | *"Do a competitive analysis for our pricing tool"* |
| `challenge-me` | Stress-test an idea or plan — surfaces blind spots and presents the strongest counter-argument | *"Challenge my assumption that users want self-serve onboarding"* |
| `log-decision` | Log a product or architectural decision to Confluence with a structured decision table | *"Log this decision about dropping email notifications"* |

### Communication

| Skill | What it does | Say something like... |
|-------|-------------|----------------------|
| `meeting-notes` | Turn raw notes or transcripts into structured docs with decisions, actions, and open questions | *"Process these meeting notes"* |
| `release-note` | Generate release notes from Jira tickets, Confluence pages, or a feature description | *"Write release notes for PROJ-123"* |
| `one-pager-creator` | Create a concise one-page brief for stakeholder alignment or feature proposals | *"Create a one-pager for our new search experience"* |

### Planning

| Skill | What it does | Say something like... |
|-------|-------------|----------------------|
| `experiment-designer` | Design product experiments beyond A/B tests — pricing, features, operations, pilots | *"Design an experiment for our new pricing model"* |
| `release-readiness` | Assess whether a feature is ready to ship against functional, data, security, and ops criteria | *"Run a release readiness check on the onboarding flow"* |

### Specs

| Skill | What it does | Say something like... |
|-------|-------------|----------------------|
| `jira-story-creator` | Generate engineering-ready Jira stories with acceptance criteria and edge cases, then create them directly in Jira | *"Create Jira stories for this feature"* |

### Changelogs

| Skill | What it does | Say something like... |
|-------|-------------|----------------------|
| `update-inventory` | Sync recently shipped Inventory items from Jira to the Confluence changelog | *"Update the inventory changelog"* |
| `update-customer` | Sync recently shipped Customer Team items from Jira to the Confluence changelog | *"Update the customer changelog"* |

---

## Contributing

Skills are plain Markdown files. Each skill lives in `skill-name/SKILL.md` with a `name` and `description` in the frontmatter.

To add a skill:
1. Create a directory under the relevant category in `skills/`
2. Add a `SKILL.md` with frontmatter
3. Run `python3 validate_plugins.py` to validate
4. Open a PR — one skill per PR

See `CONTRIBUTING.md` for full details.
