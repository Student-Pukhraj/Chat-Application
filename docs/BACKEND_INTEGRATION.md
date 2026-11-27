# Java Backend Integration Guide

## Scope

This guide describes what the Java backend must provide for the frontend. Exact endpoints and DTO field names are intentionally not assumed until frontend and backend teams agree on a contract.

The frontend should continue to communicate through one API Gateway. Browser-side service discovery is not required or recommended.

## Proposed Java Microservices

These are domain boundaries, not proof that every service must be a separate deployable:

- Authentication: login, registration, session, logout, token refresh.
- User/Profile: current user, public profiles, presence state.
- Conversation: direct chats and rooms, memberships, search.
- Messaging: message history, send, edit, delete, attachments.
- Notification: notification list and read state.
- File/Media: upload metadata and media download URLs.

A monolithic Java deployment can initially implement these behind the same API gateway if service isolation is not ready.

## Environment Configuration

Frontend variables are documented in `.env.example`:

```dotenv
VITE_API_MODE=mock
VITE_API_GATEWAY_URL=http://localhost:8080
VITE_AUTH_SERVICE_URL=
VITE_USER_SERVICE_URL=
VITE_CONVERSATION_SERVICE_URL=
VITE_MESSAGE_SERVICE_URL=
VITE_NOTIFICATION_SERVICE_URL=
```

`VITE_API_MODE=mock` must remain the default until mock-free API implementations are complete. Service-specific URL variables are reserved for configuration and migration flexibility; preferred browser communication is through `VITE_API_GATEWAY_URL`.

The frontend must not receive direct internal Kubernetes or Java service discovery information.

## Centralized HTTP Layer

The frontend already has:

- `src/services/api/api-client.ts`: shared Axios client and timeout.
- `src/services/api/api-config.ts`: gateway and optional service configuration.
- `src/services/api/api-error.ts`: normalized error shape.

Backend teams should keep API DTOs separate from React/UI models. Suggested frontend service locations:

```text
src/features/auth/services/
src/features/conversations/services/
src/features/chat/services/
src/features/contacts/services/
src/features/profile/services/
src/features/notifications/services/
```

Each implementation should expose a typed interface and may start as a mock implementation.

## Authentication Expectations

The backend contract must define:

- Login and registration payloads.
- Success response and session representation.
- Token storage strategy.
- Refresh behavior and expiry handling.
- 401 and 403 handling.
- Logout invalidation.
- Protected route behavior.

Do not send passwords or authentication fields through mock UI state in browser logs.

The frontend can be prepared to attach bearer credentials to Axios centrally, but no real credential mechanism should be hardcoded now.

## Recommended Data Contracts

These examples describe frontend needs and are not final REST schemas.

### User

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "initials": "string",
  "avatarUrl": "string|null",
  "online": true
}
```

### Conversation

```json
{
  "id": "string",
  "name": "string",
  "initials": "string",
  "avatarUrl": "string|null",
  "lastMessage": "string",
  "timestamp": "ISO-8601 string",
  "unreadCount": 0,
  "isRoom": false,
  "online": true
}
```

### Message

```json
{
  "id": "string",
  "conversationId": "string",
  "senderId": "string",
  "senderName": "string",
  "text": "string",
  "sentAt": "ISO-8601 string",
  "status": "sent|delivered|read"
}
```

### Problem Details

A consistent RFC 7807-style response is recommended:

```json
{
  "type": "string|null",
  "title": "Validation failed",
  "status": 400,
  "detail": "Human-readable explanation",
  "errors": {}
}
```

The frontend should map this shape to a normalized `ApiError` and display loading, error, and retry states.

## Required Frontend Data Operations

### Authentication

- Register account.
- Login.
- Restore current session.
- Logout.
- Refresh session if supported.

### Users and Contacts

- Search users.
- Load current profile.
- Update profile if approved.
- Load user presence.

### Conversations

- List conversations.
- Search conversations.
- Create direct or room conversations.
- Load conversation details and memberships.

### Messages

- Load paginated message history.
- Send a message.
- Edit/delete only when permissions allow.
- Upload attachments as a separate file-flow if used.

### Notifications

- List notifications.
- Mark notification or all notifications as read.
- Receive future real-time notification events.

## Pagination Convention

Cursor pagination is recommended for chat history because it supports older-message loading and concurrent updates.

A representative response:

```json
{
  "items": [],
  "nextCursor": "string|null",
  "previousCursor": "string|null"
}
```

Offset pagination is acceptable only if backend and frontend agree on stable ordering and message deletion behavior.

## Real-Time Abstraction

`src/services/realtime/realtime-client.ts` currently defines an interface only. No connection technology is selected.

Backend and frontend teams must agree on:

- WebSocket or broker technology.
- One authenticated connection entry point.
- Message delivery events.
- Typing event semantics and debounce behavior.
- Presence online/offline event semantics.
- Read receipt events.
- Notification events.
- Reconnect and missed-event strategy.

The UI must not establish a socket connection directly. Realtime events belong behind the realtime abstraction and query/store synchronization layer.

## CORS and Security

Before browser integration, Java should:

- Allow the frontend origin explicitly.
- Allow required headers and methods.
- Configure cookies/SameSite/CORS correctly if cookie sessions are used.
- Validate every permission server-side.
- Never trust user identifiers supplied only by the frontend.
- Use gateway-side rate limiting and request validation.
- Keep internal service URLs off the browser.

## Mock Replacement Plan

1. Add a typed Java API implementation to the relevant feature service folder.
2. Implement TanStack Query hooks against that service.
3. Set `VITE_API_MODE=real` only after the contract is stable.
4. Keep the mock implementation available for UI development and isolated tests.
5. Replace mock data without moving HTTP logic into React components.

## Open Decisions for Java Team

- API Gateway base URL and routing conventions.
- REST, GraphQL, or gateway-mediated REST choice.
- Authentication mechanism and token format.
- Java framework and package structure.
- Database technologies are intentionally unspecified.
- WebSocket broker and event protocol.
- File/media storage contract.
- Local and deployment environment configuration.
