---
name: experiment-designer
description: 'Design product experiments beyond web A/B tests — pricing, features, operations, and more. Use when: product experiment, pricing experiment, feature experiment, pilot program.'
---

# Experiment Designer

Design product experiments beyond simple web A/B tests — pricing changes, feature rollouts, operational experiments, and pilots.

## When to Use This Skill
- Testing pricing or packaging changes
- Running feature beta programs
- Piloting operational changes (support processes, onboarding flows)
- Experiments where simple A/B randomization isn't possible

**For web A/B tests:** Use the ab-test-designer skill instead.

## What You'll Need

**Critical inputs (ask if not provided):**
- What question are you trying to answer?
- What type of experiment? (beta, pilot, cohort, fake door)

**Nice-to-have inputs:**
- Current baseline metrics
- Constraints (timeline, risk tolerance, resources)
- Past related experiments

## Process

### Step 1: Check Your Context
First, read the user's context files:
- `context/product.md` — Current metrics, feature status, known issues
- `context/personas.md` — Who's participating? What's their experience level?
- `context/company.md` — Risk tolerance, strategic priorities

**Tell the user what you found.** For example:
> "I found 'AI scheduling' is in beta (product.md). Your Jordan persona is 'tech-forward but time-poor.' Your company values 'learn fast, fail cheap' (company.md). I'll design an experiment that gets Jordan-type feedback quickly with low blast radius."

### Step 2: Gather Experiment Context
If you don't have enough context, ask:
> "Before I design this experiment, I need:
> 1. What question are you trying to answer?
> 2. What type of experiment fits? (beta program, pilot, cohort rollout, fake door)
> 3. What's your risk tolerance?
>
> I can pull baseline metrics from product.md and persona context from personas.md."

**Do NOT design an experiment without a clear learning goal. "Will it work?" is too vague.**

### Step 3: Define Learning Goals
What question are you trying to answer?
- Not "will this work?" but "what will we learn about X?"
- Be specific about success criteria

### Step 2: Choose Experiment Type
| Type | When to Use | Example |
|------|-------------|---------|
| **A/B test** | Web/app changes, high traffic | Button color, copy |
| **Beta program** | New feature, need qualitative feedback | AI feature pilot |
| **Cohort rollout** | Can't randomize, need before/after | Pricing change |
| **Pilot** | Operational change, limited scope first | New support process |
| **Fake door** | Validate demand before building | Feature interest test |

### Step 3: Design the Experiment
- Who participates? (Selection criteria)
- What's the treatment?
- What's the control/comparison?
- How long will it run?

### Step 4: Define Metrics
- **Primary:** What determines success?
- **Secondary:** What else will we learn?
- **Guardrails:** What shouldn't get worse?

### Step 5: Plan for Decisions
Before you start: what will you do with each outcome?

## Output Template

```markdown
# Experiment Plan: [Name]

**Type:** A/B / Beta / Cohort / Pilot / Fake Door
**Owner:** [Name]
**Duration:** [Timeline]
**Data Sources:** [What you'll measure with]

## Context
*What I found in your files:*
- **Feature status:** [From product.md — what stage is this?]
- **Target persona:** [From personas.md — who's participating]
- **Persona insight:** [From personas.md — relevant behavior]
- **Risk tolerance:** [From company.md]
- **Strategic fit:** [From company.md — why this matters now]

## Learning Goal
**Question:** [What are we trying to learn?]
**Why now:** [Why is this the right time?]

## Experiment Design

### Participants
- **Who:** [Selection criteria]
- **Size:** [How many]
- **Selection:** [Random / Opt-in / Cohort]

### Treatment
[What participants experience]

### Control / Comparison
[What we're comparing against]

## Metrics

### Primary Metric
**Metric:** [Name]
**Baseline:** [Current value]
**Target:** [What would make this a success]

### Secondary Metrics
| Metric | Baseline | Watch For |
|--------|----------|-----------|
| [Metric] | [Value] | [Direction] |

### Guardrails
| Metric | Floor | Action if Breached |
|--------|-------|-------------------|
| [Metric] | [Value] | [Action] |

## Timeline
| Phase | Duration | Activities |
|-------|----------|------------|
| Setup | [X days] | [What happens] |
| Run | [X weeks] | [What happens] |
| Analysis | [X days] | [What happens] |

## Decision Framework
| Outcome | Action |
|---------|--------|
| Primary metric hit | [Next step] |
| Primary metric missed, learnings clear | [Next step] |
| Inconclusive | [Next step] |

## Risks & Mitigations
- [Risk] — [Mitigation]

## Success Criteria for Go/No-Go
- [ ] [Criterion 1]
- [ ] [Criterion 2]
```

## Framework Reference
**Experimentation hierarchy:**
- A/B tests = highest confidence, requires traffic/randomization
- Betas/Pilots = medium confidence, requires interpretation
- Fake doors = demand signal only, not feature validation

## Tips for Best Results

1. **Use your context files** — I'll design for your personas and risk tolerance
2. **Learning goal > success metric** — What will you learn even if it "fails"?
3. **Match type to question** — Don't use an A/B test when you need qualitative feedback
4. **Pre-register decisions** — What will you do with each outcome?
5. **Minimize blast radius** — Start small, expand when confident

## Suggested Updates
After the experiment:
- [ ] Update `product.md` with learnings
- [ ] Log experiment results for institutional memory
- [ ] Update baseline metrics if behavior changed
