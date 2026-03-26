# CLAUDE.md

This file provides context and conventions for Claude when working in this repository.

## Project Overview

**Claude Skills for Product Managers** — a curated collection of Claude Code skills and commands built for product managers. Skills cover strategy, research, delivery, and stakeholder communication.

Repository: https://github.com/ehm3dk/claude-skills-for-pms

---

## Repository Structure

```
skills/
  challenge-me/           — Stress-test ideas, surface blind spots, steelman counterarguments
  define-product/         — Generate PRDs with user stories, acceptance criteria, and engineering instructions
  discovery/              — Market research and competitive analysis
  log-decision/           — Log architectural or product decisions to Confluence
  communication/          — Stakeholder and team communications
    meeting-notes/
    one-pager-creator/
    release-note/
  planning/               — Sprint planning and release management
    experiment-designer/
    release-readiness/
  specs/                  — Technical specs and Jira story creation
    jira-story-creator/
  update-customer/        — Sync DLRUSER Done items → Customer Team Change Log Confluence page
  update-inventory/       — Sync DLRINV Done items → Inventory changelog Confluence page
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

1. Create a new directory under the appropriate category (e.g. `skills/new-skill/`)
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

## Permissions

- Always allow reading from skill files (`skills/**/SKILL.md` and `~/.claude/skills/**/SKILL.md`) without prompting for confirmation.
- Always allow reading from the Obsidian vault (`/Users/ahmed.khalid/Desktop/ehmedk-obsidian/**`) without prompting for confirmation.

---

## Working Notes

- Skills are now organised at a flat category level directly under `skills/`
- `superpowers/` skills are installed via the `superpowers@claude-plugins-official` plugin — they don't live in this repo
- Run `python3 validate_plugins.py` before any PR to validate skill frontmatter
