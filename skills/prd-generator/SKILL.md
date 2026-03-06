---
name: prd-generator
description: "Use this skill whenever the user asks to create a PRD (Product Requirements Document), product spec, product specification document, or requirements document in .docx format. Trigger on phrases like 'create a PRD', 'write a PRD', 'generate a product requirements document', 'I need a PRD for...', 'help me write a product spec', or any mention of PRD combined with document creation. Also trigger when the user says things like 'document the requirements for this feature/product' or 'I need a spec doc'. This skill handles the full interactive workflow: gathering context, letting the user choose sections, generating the PRD as a professional .docx file, and summarizing what was covered vs. left as placeholder. Do NOT use for general requirements lists, user story writing, or non-document deliverables."
---

# PRD Generator Skill

## Overview

This skill creates professional Product Requirements Documents (PRDs) in .docx format through an interactive workflow. It gathers context from the user, lets them select which sections to include, generates a clean Word document, and provides a summary of covered vs. placeholder sections.

## Workflow

### Step 1: Gather Context

When the user asks for a PRD, first assess what context has been provided. You need enough information to write a meaningful PRD. The key pieces of context are:

**Must-have context (ask if missing):**
- Product/feature name
- Problem statement or opportunity (what problem does this solve?)
- Target users/audience
- High-level description of what the product/feature should do

**Nice-to-have context (ask if missing, but can proceed without):**
- Business goals and success metrics / KPIs
- Known constraints (technical, timeline, budget, regulatory)
- Dependencies on other teams/systems
- Competitive context or prior art
- Any existing research, user feedback, or data

**How to ask:**
- Do NOT dump all questions at once. Assess what's already been shared.
- Ask only for what's clearly missing from the must-have list.
- Be conversational — frame questions naturally, not as an interrogation.
- If the user has shared a lot of context already, confirm your understanding and move to section selection.
- If the user says "just use what I've given you" or similar, proceed with available context and mark gaps as placeholders.

### Step 2: Section Selection

Once you have enough context, present the user with section options using the `ask_user_input_v0` tool. Use a multi-select question so the user can pick which sections to include.

**Available PRD sections:**

1. **Executive Summary** — Brief overview of the product/feature and why it matters
2. **Problem Statement** — The problem being solved, supported by data/evidence if available
3. **Goals & Success Metrics** — Business objectives and measurable KPIs
4. **Target Users & Personas** — Who this is for, their needs and behaviors
5. **User Stories / Use Cases** — Key user flows described as stories or scenarios
6. **Scope — In & Out** — What's included in this release and what's explicitly excluded
7. **Functional Requirements** — Detailed feature requirements and expected behaviors
8. **Non-Functional Requirements** — Performance, security, scalability, accessibility, etc.
9. **UX/Design Considerations** — Wireframe references, design principles, interaction patterns
10. **Technical Considerations** — Architecture notes, API needs, data models, tech constraints
11. **Dependencies** — Cross-team, third-party, or system dependencies
12. **Risks & Mitigations** — Known risks and proposed mitigation strategies
13. **Release Criteria** — What must be true before shipping
14. **Timeline & Milestones** — High-level phases or delivery milestones
15. **Open Questions** — Unresolved items that need further discussion

Present these as a multi-select list with an "All of the above" option. Example:

```
Which sections should I include in the PRD?

Options:
- All sections
- Executive Summary
- Problem Statement
- Goals & Success Metrics
- Target Users & Personas
- User Stories / Use Cases
- Scope — In & Out
- Functional Requirements
- Non-Functional Requirements
- UX/Design Considerations
- Technical Considerations
- Dependencies
- Risks & Mitigations
- Release Criteria
- Timeline & Milestones
- Open Questions
```

Note: Because the ask_user_input_v0 tool supports max 4 options per question, break this into multiple questions grouped logically:

**Question 1 — Core sections:**
- All sections (selects everything)
- Executive Summary + Problem Statement + Goals & Success Metrics
- Target Users & Personas + User Stories / Use Cases
- Scope + Functional Requirements + Non-Functional Requirements

**Question 2 — Additional sections (only ask if "All sections" was NOT selected):**
- UX/Design + Technical Considerations
- Dependencies + Risks & Mitigations
- Release Criteria + Timeline & Milestones
- Open Questions

If the user selects "All sections", include all 15 sections.

### Step 3: Generate the PRD Document

Use the docx skill's approach (read `/mnt/skills/public/docx/SKILL.md` for docx creation best practices) to generate the PRD as a .docx file.

**Document formatting guidelines:**
- Use US Letter page size (12240 x 15840 DXA)
- 1-inch margins all around
- Font: Arial, 12pt body text
- Heading 1: 16pt bold (section titles)
- Heading 2: 14pt bold (subsections)
- Minimal styling — clean and professional, easy for the user to customize
- Include a simple title page with: Document Title, Product/Feature Name, Author (use "Author" as placeholder), Date, Version (1.0)
- Add page numbers in footer
- Use proper bullet lists (LevelFormat.BULLET, never unicode bullets)
- Use tables where structured data makes sense (e.g., success metrics, risks)

**Content generation rules:**
- NEVER make up information. Only use what the user has provided.
- For sections where you have sufficient context: write detailed, actionable content based on the user's input.
- For sections where context is partial: write what you can and clearly mark incomplete areas with `[PLACEHOLDER: <description of what's needed>]`.
- For sections where you have no context at all: include the section header and a placeholder note like `[PLACEHOLDER: This section requires input on <specific missing info>. Please update with relevant details.]`
- Write in a professional but accessible tone suitable for both engineering teams and business stakeholders.
- Be specific and concrete. Avoid generic filler text.

### Step 4: Summary

After generating the document, provide the user with a clear summary:

**Format:**
```
✅ Sections with full content:
- [List sections where you had enough context to write substantive content]

⚠️ Sections with placeholders:
- [Section name]: Missing [specific info needed]
- [Section name]: Missing [specific info needed]

The PRD is ready for download. You can fill in the placeholder sections and customize the formatting as needed.
```

Keep this summary concise. Don't over-explain.

## Important Notes

- Always read `/mnt/skills/public/docx/SKILL.md` before generating the document to follow docx best practices.
- The filename should be descriptive: `PRD_<ProductName>_v1.docx` (sanitize the product name for filesystem safety).
- Save the final file to `/mnt/user-data/outputs/` and use `present_files` to share it.
- If the user provides follow-up context after the initial PRD is generated, offer to regenerate or update the document.
- Do not include a Table of Contents unless the user specifically asks for one.
