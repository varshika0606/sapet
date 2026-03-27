# Secure Academic Policy Enforcement Tool API

Base URL: `/api`

## Authentication

### POST `/auth/register`
Create user.

Request
```json
{
  "name": "Student One",
  "email": "student@sapet.edu",
  "password": "StudentPass123",
  "role": "student"
}
```

### POST `/auth/login`
Login user.

Request
```json
{
  "email": "student@sapet.edu",
  "password": "StudentPass123"
}
```

Response
```json
{
  "token": "jwt...",
  "user": { "_id": "...", "name": "...", "role": "student" }
}
```

### GET `/auth/me`
Get current user. Requires `Authorization: Bearer <token>`.

## Users

### GET `/users?role=student&page=1&limit=10`
List users (admin or faculty).

## Policies

### GET `/policies?page=1&limit=10`
List policies.

### POST `/policies`
Admin only.

### PUT `/policies/:id`
Admin only.

### DELETE `/policies/:id`
Admin only.

## Violations

### GET `/violations?page=1&limit=10&status=pending&q=search`
Role aware (admin sees all, faculty sees own, student sees own).

### GET `/violations/:id`
Get single violation.

### POST `/violations`
Faculty only. Supports multipart form with optional file `evidence`.

Request (multipart)
```
policy=<policyId>
student=<studentId>
description=...
evidenceUrl=https://...
evidence=<file>
```

## Responses

### GET `/responses`
Get responses (role aware).

### POST `/responses`
Student only.

Request
```json
{
  "violation": "<violationId>",
  "responseText": "..."
}
```

## Decisions

### GET `/decisions`
Get decisions (admin or student specific).

### POST `/decisions`
Admin only.

Request
```json
{
  "violation": "<violationId>",
  "decision": "approved",
  "action": "Warning",
  "notes": "First time"
}
```

## Admin

### GET `/admin/analytics`
Summary statistics.

### GET `/admin/audit-logs?page=1&limit=10`
Audit trail.
