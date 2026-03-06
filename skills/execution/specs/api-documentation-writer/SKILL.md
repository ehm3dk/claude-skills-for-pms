---
name: api-documentation-writer
description: 'Write clear API documentation with authentication, endpoints, and examples. Use when: write api documentation, api documentation, api docs, document api.'
---

# API Documentation Writer

Write clear API documentation with authentication, endpoints, and examples.

## When to Use This Skill
- PMs launching APIs
- Developer experience (DevEx) teams
- Anyone writing technical documentation for developers
- Before API goes public or to partners

## The Problem

Developers are your users. Bad docs mean bad adoption, more support tickets, and frustrated integrators. Good API docs are the difference between developers loving or hating your product.

## What You'll Need

**Critical inputs (ask if not provided):**
- API name and purpose
- List of endpoints to document
- Authentication method (API key, OAuth, JWT, etc.)

**Nice-to-have inputs:**
- Existing OpenAPI/Swagger spec
- Rate limit policies
- SDK availability
- Common use cases

## Process

### Step 1: Check Your Context
First, read the user's context files:
- `context/product.md` — API capabilities, versioning, technical constraints
- `context/personas.md` — Who are the developers using this API? What's their skill level?

**Tell the user what you found.** For example:
> "I found your API documentation mentions a REST API with OAuth2 authentication (product.md). Your target developers are 'agency technical leads' who need 'quick integrations.' I'll optimize for copy-paste examples and fast time-to-hello-world."

### Step 2: Get API Details
If the PM hasn't provided enough context, ask:
1. "What API are we documenting? What does it do?"
2. "What authentication method does it use?"
3. "What are the main endpoints and use cases?"

Do NOT generate docs with placeholder endpoints. Get the real API surface first.

### Step 3: Start with Quick Start
Write the "Hello World" example first:
- Get API key
- Make first request
- Get successful response
- Time to first success: <5 minutes

### Step 4: Document Authentication
Explain:
- How to get credentials
- How to include them in requests (header, query param, body)
- Token refresh flows if applicable
- Common auth errors and fixes

### Step 5: Specify Endpoints
For each endpoint, document:
- HTTP method and path
- Description of what it does
- Request parameters (path, query, body)
- Request body schema with types
- Response schema with all fields
- Status codes and their meanings

### Step 6: Provide Examples
Include:
- cURL examples (copy-pastable)
- Request and response JSON
- Multiple languages if SDKs exist
- Edge cases and error responses

### Step 7: Document Error Handling
Create an error reference:
- All error codes and their meanings
- How to interpret error responses
- Recovery actions for each error
- Contact info for unresolvable errors

### Step 8: Cover Rate Limits and Pagination
Explain:
- Request limits (per minute, per day)
- Rate limit headers
- What happens when exceeded
- Pagination parameters and patterns
- Cursor vs offset pagination

## Output Template

```markdown
# [API Name] API Documentation

**Version:** v1
**Base URL:** `https://api.example.com/v1`
**Last Updated:** [Date]

---

## Overview

[One paragraph describing what this API does and who it's for]

**Use Cases:**
- [Use case 1]
- [Use case 2]
- [Use case 3]

---

## Quick Start

Get up and running in 5 minutes.

### 1. Get Your API Key

1. Log in to your [Product] dashboard
2. Navigate to Settings → API Keys
3. Click "Create API Key"
4. Copy your key (you won't see it again)

### 2. Make Your First Request

```bash
curl -X GET "https://api.example.com/v1/projects" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### 3. Check the Response

```json
{
  "data": [
    {
      "id": "proj_123",
      "name": "Website Redesign",
      "status": "active"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "per_page": 20
  }
}
```

Congratulations! You've made your first API call.

---

## Authentication

All API requests require authentication using an API key.

### Getting an API Key

1. Navigate to **Settings → API Keys** in your dashboard
2. Click **Create API Key**
3. Choose the appropriate scopes
4. Store the key securely — it's shown only once

### Using Your API Key

Include your API key in the `Authorization` header:

```bash
Authorization: Bearer YOUR_API_KEY
```

### Scopes

| Scope | Access |
|-------|--------|
| `read:projects` | Read project data |
| `write:projects` | Create and update projects |
| `read:users` | Read user data |
| `admin` | Full administrative access |

### Authentication Errors

| Status | Error | Fix |
|--------|-------|-----|
| 401 | `invalid_api_key` | Check your API key is correct |
| 401 | `expired_api_key` | Generate a new API key |
| 403 | `insufficient_scope` | Request the required scope |

---

## Endpoints

### Projects

#### List Projects

```
GET /projects
```

Returns a list of projects the authenticated user has access to.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by status: `active`, `archived`, `all` |
| `page` | integer | No | Page number (default: 1) |
| `per_page` | integer | No | Items per page (default: 20, max: 100) |

**Request:**

```bash
curl -X GET "https://api.example.com/v1/projects?status=active&per_page=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": "proj_123",
      "name": "Website Redesign",
      "description": "Q2 website overhaul",
      "status": "active",
      "created_at": "2026-01-15T10:30:00Z",
      "updated_at": "2026-01-20T14:22:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "page": 1,
    "per_page": 10,
    "total_pages": 5
  }
}
```

---

#### Create Project

```
POST /projects
```

Creates a new project.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Project name (max 100 chars) |
| `description` | string | No | Project description |
| `template_id` | string | No | Template to use |

**Request:**

```bash
curl -X POST "https://api.example.com/v1/projects" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Campaign",
    "description": "Spring 2026 marketing campaign"
  }'
```

**Response (201 Created):**

```json
{
  "data": {
    "id": "proj_456",
    "name": "New Campaign",
    "description": "Spring 2026 marketing campaign",
    "status": "active",
    "created_at": "2026-02-01T09:00:00Z"
  }
}
```

---

#### Get Project

```
GET /projects/{id}
```

Retrieves a single project by ID.

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Project ID (e.g., `proj_123`) |

**Response (200 OK):**

```json
{
  "data": {
    "id": "proj_123",
    "name": "Website Redesign",
    "description": "Q2 website overhaul",
    "status": "active",
    "budget_hours": 200,
    "hours_logged": 87.5,
    "created_at": "2026-01-15T10:30:00Z",
    "updated_at": "2026-01-20T14:22:00Z"
  }
}
```

---

## Error Handling

All errors return a consistent format:

```json
{
  "error": {
    "code": "validation_error",
    "message": "The request body contains invalid data",
    "details": [
      {
        "field": "name",
        "message": "Name is required"
      }
    ]
  }
}
```

### Error Codes

| HTTP Status | Code | Description | Resolution |
|-------------|------|-------------|------------|
| 400 | `validation_error` | Invalid request data | Check the `details` array for specific field errors |
| 401 | `unauthorized` | Invalid or missing API key | Verify your API key is correct |
| 403 | `forbidden` | Insufficient permissions | Request appropriate scopes |
| 404 | `not_found` | Resource doesn't exist | Verify the resource ID |
| 409 | `conflict` | Resource already exists | Use a unique identifier |
| 429 | `rate_limited` | Too many requests | Wait and retry (see Rate Limits) |
| 500 | `internal_error` | Server error | Retry later; contact support if persistent |

---

## Rate Limits

API requests are rate limited to ensure fair usage.

### Limits

| Plan | Requests/Minute | Requests/Day |
|------|-----------------|--------------|
| Free | 60 | 1,000 |
| Pro | 300 | 50,000 |
| Business | 1,000 | 500,000 |

### Rate Limit Headers

Every response includes these headers:

```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 298
X-RateLimit-Reset: 1706792400
```

### When Rate Limited

If you exceed the limit, you'll receive a `429 Too Many Requests` response:

```json
{
  "error": {
    "code": "rate_limited",
    "message": "Rate limit exceeded. Try again in 45 seconds.",
    "retry_after": 45
  }
}
```

---

## Pagination

List endpoints return paginated results.

### Request Parameters

| Parameter | Default | Max | Description |
|-----------|---------|-----|-------------|
| `page` | 1 | — | Page number |
| `per_page` | 20 | 100 | Items per page |

### Response Format

```json
{
  "data": [...],
  "pagination": {
    "total": 42,
    "page": 1,
    "per_page": 20,
    "total_pages": 3
  }
}
```

---

## SDKs

Official SDKs are available for:

| Language | Package | Docs |
|----------|---------|------|
| JavaScript/TypeScript | `npm install @example/api` | [Link] |
| Python | `pip install example-api` | [Link] |
| Ruby | `gem install example-api` | [Link] |

---

## Changelog

### v1.2.0 (2026-02-01)
- Added `template_id` parameter to Create Project

### v1.1.0 (2026-01-15)
- Added pagination to List Projects
- Increased rate limits for Pro plans

### v1.0.0 (2025-12-01)
- Initial release
```

## Framework Reference

**Developer Documentation Best Practices:**
- Quick Start first (time to hello world)
- Authentication before endpoints
- Every endpoint has copy-paste examples
- Error handling is comprehensive
- Rate limits are clearly stated

## Tips for Best Results

1. **Use your context files** — I'll tailor docs to your developer persona's skill level
2. **Test your examples** — Every cURL command should work
3. **Show the full response** — Don't truncate JSON examples
4. **Document errors** — Developers hit errors more than success
5. **Use real values** — `proj_123` is better than `<id>`
6. **Keep it updated** — Outdated docs are worse than no docs

## Suggested Updates
After writing docs:
- [ ] Add API documentation link to `product.md`
- [ ] Test all examples before publishing
- [ ] Set up documentation update process for API changes
