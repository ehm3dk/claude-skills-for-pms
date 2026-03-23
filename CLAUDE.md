# CLAUDE.md

This file provides context and conventions for Claude when working in this repository.

## Project Overview

**Claude Skills for Product Managers** — a curated collection of Claude Code skills and commands built for product managers. Skills cover strategy, research, delivery, and stakeholder communication.

Repository: https://github.com/ehm3dk/claude-skills-for-pms

---

## Repository Structure

```
skills/
  strategic/              — High-level PM thinking (PRDs, discovery, stress-testing)
    define-product/
    discovery/
    challenge-me/
    log-decision/
  execution/
    communication/        — Meeting notes, agendas, stakeholder updates, release notes
      meeting-notes/
      one-pager-creator/
      release-note/
    specs/                — User stories, PRDs, technical specs, API docs, Jira story creation
      jira-story-creator/
    planning/             — Sprint planning, experiments, release readiness
      experiment-designer/
      release-readiness/
    update-customer/      — Stakeholder update communications
    update-inventory/     — Sync DLRINV Done items → Inventory changelog Confluence page
  superpowers/            — Advanced Claude Code workflow skills
    brainstorming/
    dispatching-parallel-agents/
    executing-plans/
    finishing-a-development-branch/
    receiving-code-review/
    requesting-code-review/
    subagent-driven-development/
    systematic-debugging/
    test-driven-development/
    using-git-worktrees/
    using-superpowers/
    verification-before-completion/
    writing-plans/
    writing-skills/
  obsidian/               — Obsidian vault and note-taking skills
    defuddle/
    json-canvas/
    obsidian-bases/
    obsidian-cli/
    obsidian-markdown/
```

Each skill lives in its own directory and contains a `SKILL.md` file.

---

## Skill File Conventions

Every `SKILL.md` must have YAML frontmatter at the top:

```yaml
---
name: "skill-name"            # Must match the directory name exactly
description: "..."            # Include trigger phrases so Claude activates the skill correctly
argument-hint: "[...]"        # Short hint shown to the user about what to pass in
---
```

- Skill names are **nouns** (domain knowledge)
- Command names are **verbs** (workflows)
- No cross-plugin references in commands — suggest follow-ups in natural language only
- Skill `name` must match its directory name

---

## Adding a New Skill

1. Create a new directory under the appropriate category (e.g. `skills/execution/communication/new-skill/`)
2. Add a `SKILL.md` with correct frontmatter
3. Before submitting, run the validator:
   ```bash
   python3 validate_plugins.py
   ```
4. Open an issue first for new skills or larger changes; small fixes can go straight to a PR

---

## Contribution Guidelines

- Keep PRs focused — one change per PR
- Follow existing patterns for structure and tone
- Every contributor is listed publicly
- By contributing, you agree your work is licensed under MIT

See `CONTRIBUTING.md` for full details.

---

## Working Notes

- `skills/superpowers/` contains advanced workflow skills for Claude Code power users
- `skills/obsidian/` contains Obsidian-specific note-taking and vault management skills
- Run `python3 validate_plugins.py` before any PR to validate skill frontmatter
