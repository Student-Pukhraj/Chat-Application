# Developer and Java Backend Handoff

## Repository

- Repository: `https://github.com/Student-Pukhraj/Chat-Application`
- Stable branch: `master`
- Integration branch: `devel`
- Feature branches: `feat/<feature-name>`

## Clone for Review

```bash
# Stable application
git clone https://github.com/Student-Pukhraj/Chat-Application.git
cd Chat-Application
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

To review the integration branch:

```bash
git clone --branch devel https://github.com/Student-Pukhraj/Chat-Application.git
cd Chat-Application
npm install
npm run dev
```

## Feature Development

```bash
git switch devel
git pull origin devel
git switch -c feat/<feature-name>
```

Examples:

```text
feat/auth-ui
feat/conversation-api
feat/java-gateway-integration
feat/file-sharing
```

After implementation:

```bash
npm run lint
npm run build
npm run test:run
git add -A
git commit -m "feat: describe the change"
git push -u origin feat/<feature-name>
```

Open a pull request targeting `devel`. Merge to `master` only after integration and review.

## Required Information for Backend Planning

Provide these items before implementation contracts are finalized:

- Java project and module names.
- API Gateway hostname and route prefixes.
- Authentication technology and token strategy.
- REST/OpenAPI conventions.
- PostgreSQL, MongoDB, or other persistence choice.
- Service boundaries and deployment topology.
- WebSocket or broker choice.
- File storage provider or internal media service.
- Development, staging, and production domains.

Do not expose database credentials or internal secrets in this repository.

## Suggested Backend Delivery Sequence

1. Define API Gateway routes and OpenAPI schemas.
2. Implement authentication and current-user APIs.
3. Implement users/profile and contacts APIs.
4. Implement conversation and membership APIs.
5. Implement paginated message history and send-message APIs.
6. Implement notifications and read state.
7. Replace mocks behind typed frontend service interfaces.
8. Add WebSocket events after REST contracts are stable.
9. Add media upload/download after core messaging works.
10. Add integration and end-to-end tests.

## Frontend API Contract Deliverables

The backend team should return:

- OpenAPI/Swagger document.
- Example request and response bodies.
- Authentication headers or cookie requirements.
- Error response examples.
- Pagination conventions.
- WebSocket event catalog, if applicable.
- CORS configuration notes.

## Known Frontend Limitations

- Mock authentication allows navigation without a real identity.
- Mock message sending exists only in React state.
- Conversation selection does not persist outside browser state.
- Notification, contact, and profile pages use static foundations.
- No real authorization guard is active.
- No backend file upload or realtime transport exists.

These items must not be interpreted as implemented backend behavior.

## Definition of Ready for REST Integration

The backend contract is ready when:

- Every endpoint has an HTTP method and gateway route.
- Request DTO validation is documented.
- Response DTOs are documented.
- Authentication requirements are explicit.
- Error responses are consistent.
- Test and mock data match identifiers and types.
- CORS and environment configuration are confirmed.

## Definition of Done for a Backend Feature

- Java API implementation is tested.
- Frontend typed service implementation is added.
- TanStack Query loading/error behavior works.
- Unauthorized and forbidden cases are handled.
- Empty states and retry behavior are verified.
- Desktop and mobile UI remain usable.
- Mock mode remains available for isolated frontend development.
