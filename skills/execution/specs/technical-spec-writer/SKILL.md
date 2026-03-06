---
name: technical-spec-writer
description: 'Write technical specifications with architecture, data models, and API designs. Use when: write technical spec, technical spec, tech spec, engineering spec.'
---

# Technical Spec Writer

Write technical specifications with architecture, data models, and API designs.

## When to Use This Skill
- After PRD approval, before engineering starts
- PMs working closely with engineering
- Technical product managers
- Teams shipping backend features or APIs

## The Problem

PRDs describe **what** to build. Engineers need specs that describe **how** to build it. Without a tech spec, engineering makes assumptions that may not align with product intent.

## What You'll Need

**Critical inputs (ask if not provided):**
- Feature name and PRD link/summary
- High-level requirements (what should the system do?)
- User actions that trigger the system

**Nice-to-have inputs:**
- Existing architecture context
- Performance requirements
- Integration constraints

## Process

### Step 1: Check Your Context
First, read the user's context files:
- `context/product.md` — Is this feature on the roadmap? What's the product context?
- `context/personas.md` — Who uses this feature? What's their workflow?
- `context/company.md` — Team structure, tech stack if documented

**Tell the user what you found.** For example:
> "I found 'Resource Planning v2' in your product.md roadmap. Your Jordan persona (PM) needs to see team workload at a glance. I'll design the API and data model around Jordan's workflow."

### Step 2: Gather Feature Details
If the PM hasn't provided enough context, ask:
> "I need to understand the feature before writing the spec:
> 1. What feature is this spec for? (I found [X] in product.md — is that it?)
> 2. What user actions should trigger this functionality?
> 3. Are there any existing systems this needs to integrate with?
>
> Or share the PRD if you have one."

**Do NOT generate a spec with placeholder architecture. Get the requirements first.**

### Step 3: Define Scope and Components
Identify all system components involved:
- Frontend changes
- Backend services
- Database changes
- Third-party integrations
- Background jobs/workers

### Step 4: Design Data Model
Create database schema with:
- Table definitions
- Field types and constraints
- Indexes for performance
- Relationships (foreign keys)
- Migration strategy

### Step 5: Specify API Endpoints
For each endpoint, define:
- HTTP method and path
- Request parameters and body
- Response shape with status codes
- Authentication requirements
- Rate limiting considerations

### Step 6: Document Authorization
Create permission matrix — connect to personas:
- Who can access what (reference personas.md roles)
- Role-based access control
- Resource-level permissions
- Edge cases (owner vs admin, etc.)

### Step 7: Handle Edge Cases and Errors
Document:
- Error states and messages
- Validation rules
- Concurrency considerations
- Rollback scenarios

### Step 8: Performance and Migration
Address:
- Expected load and scale
- Caching strategy
- Database migration plan
- Feature flag strategy
- Rollback plan

## Output Template

```markdown
# Technical Spec: [Feature Name]

**Status:** Draft | In Review | Approved
**Author:** [Name]
**Reviewers:** [Engineering Leads]
**PRD:** [Link]
**Last Updated:** [Date]

## Context
*What I found in your files:*
- **Roadmap status:** [From product.md]
- **Target persona:** [From personas.md]
- **Persona workflow:** [How they'll use this]

---

## Overview

**Problem:** [One sentence — from PRD or personas.md]
**Solution:** [One sentence]
**Scope:** [In scope vs out of scope]

---

## Architecture

### System Components

```
[ASCII diagram or description of components]

Example:
Client → API Gateway → Feature Service → Database
                    ↓
              Notification Worker → Email Service
```

### Component Responsibilities

| Component | Responsibility | Owner |
|-----------|---------------|-------|
| [Service] | [What it does] | [Team] |

---

## Data Model

### New Tables

```sql
CREATE TABLE resource_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id),
    user_id UUID NOT NULL REFERENCES users(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    hours_per_day DECIMAL(4,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT valid_date_range CHECK (end_date >= start_date),
    CONSTRAINT valid_hours CHECK (hours_per_day > 0 AND hours_per_day <= 24)
);

CREATE INDEX idx_allocations_project ON resource_allocations(project_id);
CREATE INDEX idx_allocations_user ON resource_allocations(user_id);
CREATE INDEX idx_allocations_dates ON resource_allocations(start_date, end_date);
```

### Schema Changes to Existing Tables

| Table | Change | Reason |
|-------|--------|--------|
| [table] | [change] | [why] |

### Migration Plan

1. Create new tables (non-breaking)
2. Backfill data from [source]
3. Add new columns to existing tables
4. Deploy new code
5. Clean up old columns (future PR)

---

## API Design

### Endpoints

#### Create Allocation

```
POST /api/v1/projects/{project_id}/allocations

Request:
{
    "user_id": "uuid",
    "start_date": "2026-04-01",
    "end_date": "2026-04-30",
    "hours_per_day": 6.0
}

Response (201 Created):
{
    "id": "uuid",
    "project_id": "uuid",
    "user_id": "uuid",
    "start_date": "2026-04-01",
    "end_date": "2026-04-30",
    "hours_per_day": 6.0,
    "created_at": "2026-03-15T10:30:00Z"
}

Errors:
- 400 Bad Request: Invalid dates or hours
- 404 Not Found: Project or user not found
- 409 Conflict: Overlapping allocation exists
```

---

## Authorization

### Permission Matrix

*Based on personas.md roles:*

| Action | Admin (Alex) | Manager (Jordan) | Member (Sam) | Client |
|--------|--------------|------------------|--------------|--------|
| View allocations | Yes | Own projects | Own | No |
| Create allocation | Yes | Own projects | No | No |
| Update allocation | Yes | Own projects | No | No |
| Delete allocation | Yes | Own projects | No | No |

### Edge Cases

- **Project archived:** No new allocations, existing remain read-only
- **User deactivated:** Allocations preserved for historical data

---

## Error Handling

| Error | HTTP Status | Message | Recovery |
|-------|-------------|---------|----------|
| Invalid date range | 400 | "End date must be after start date" | Fix input |
| User not found | 404 | "User does not exist" | Verify user ID |
| Allocation conflict | 409 | "Overlapping allocation exists" | Modify dates |

---

## Performance Considerations

**Expected Load:**
- [X] API calls per minute at peak
- [Y] records in database at 12 months

**Caching Strategy:**
- Cache allocation lookups by project (5 min TTL)
- Invalidate on create/update/delete

---

## Rollout Plan

### Phase 1: Internal Beta
- Feature flag: `resource_planning_v2`
- Enable for internal team only

### Phase 2: Limited Rollout
- Enable for 10% of customers

### Phase 3: General Availability
- Enable for all customers

### Rollback Plan

**Trigger:** Error rate > 1% or P50 latency > 500ms
**Process:** Disable feature flag

---

## Open Questions

- [ ] [Question] — Owner: [Name], Due: [Date]

---

## Related Context
- **PRD:** [Link]
- **Persona workflow:** [From personas.md]
- **Roadmap:** [From product.md]
```

## Framework Reference

**Engineering Spec Best Practices:**
- Architecture before implementation
- API contracts before code
- Migration plan before deployment
- Rollback plan before launch

## Tips for Best Results

1. **Use your context files** — I'll connect the spec to personas and roadmap
2. **Have the PRD ready** — Specs follow requirements, not the other way around
3. **Include engineers early** — They should review the spec before it's "final"
4. **Think about edge cases** — What happens when things go wrong?
