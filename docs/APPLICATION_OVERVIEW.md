# Chat Application — Frontend Overview

## Purpose

This repository contains the React frontend for a Google Chat-style chat application. It is currently in frontend-only mock mode. No authentication, database, Java backend, REST implementation, or real-time connection is implemented.

The frontend is structured so a Java microservices backend can be added behind an API gateway without redesigning the pages or feature modules.

## Current Status

- Implemented: responsive application shell, login and registration UI, chat dashboard, conversation search, mock messages, contacts, profile, notifications, settings, themes, and loading/empty states.
- Mock only: login, registration, conversations, users, messages, notifications, and profile data.
- Not implemented: real authentication, authorization, database access, REST calls to production services, WebSocket/Socket.IO connections, file uploads, or push notifications.

## Technology Stack

| Area | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 in strict-capable Vite mode |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 7 |
| Server state | TanStack Query 5 |
| API client | Axios |
| Forms | React Hook Form |
| Validation | Zod |
| Icons | Lucide React |
| Testing | Vitest and React Testing Library |

## Application Routes

| Route | Purpose |
|---|---|
| `/login` | Mock login screen |
| `/register` | Mock registration screen |
| `/chat` | Main chat dashboard |
| `/chat/:conversationId` | Selected conversation |
| `/contacts` | Contacts/users screen |
| `/profile` | Current user profile |
| `/notifications` | Notifications screen |
| `/settings` | Theme and application settings |

The routes are currently public-style routes for frontend development. Authentication guards and session restoration should be implemented during backend integration.

## Feature Architecture

```text
src/
├── app/                    # Providers, router, and application shell
├── components/             # Reusable UI and shared states
├── features/               # Independent application domains
│   ├── auth/
│   ├── chat/
│   ├── conversations/
│   ├── contacts/
│   ├── profile/
│   ├── notifications/
│   └── settings/
├── services/api/           # Centralized HTTP client and API configuration
├── services/realtime/      # Future real-time interface only
├── store/                  # Small client/UI state such as themes
├── styles/                 # Future shared style resources
└── test/                   # Vitest setup and tests
```

Each feature should own its UI, hooks, types, and service implementation. Pages should not import Axios or know service URLs directly.

## Data Flow

```text
Reusable UI/Page
      │
Feature hook (TanStack Query)
      │
Typed feature service interface
      │
Mock implementation today / Java API implementation later
      │
Centralized API client
      │
API Gateway
      │
Java microservices
```

## Responsive Behavior

- Desktop: compact navigation rail plus conversation sidebar plus chat panel.
- Tablet: responsive navigation and reduced conversation width.
- Mobile: conversation drawer and full-width chat panel.
- Theme: light, dark, system, preset accent, and custom accent selection.

## Theme System

Theme state is persisted in `localStorage` under `google-chat-theme`.

The application exposes semantic CSS/Tailwind tokens:

- `canvas`
- `surface`
- `elevated`
- `border`
- `ink`
- `muted`
- `brand`
- `brand-strong`
- `brand-foreground`

A Java backend does not need to manage these presentation preferences.

## Frontend Quality Checks

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test:run
```

## Backend Handoff Checklist

Before REST integration, the frontend and Java team should agree on:

1. API Gateway URL and CORS policy.
2. Authentication and authorization mechanism.
3. Request and response DTO schemas.
4. Pagination and sorting conventions.
5. Error response format and HTTP status strategy.
6. Conversation and message identifiers.
7. File upload and signed media delivery strategy.
8. WebSocket protocol, event names, and delivery guarantees.
9. Presence, typing, read receipt, and notification semantics.
10. Mock-to-real environment switching behavior.
