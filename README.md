# Google Chat — Frontend Foundation

A responsive, mock-first chat application frontend built with React, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, and Axios.

## Features

- Mock login and registration screens
- Responsive chat dashboard with conversation search
- Desktop, tablet, and mobile navigation
- Message history and local mock message sending
- Contacts, profile, notifications, and settings foundations
- Light and dark theme support
- Loading, error, and empty states
- Feature-oriented architecture with replaceable mock/API service boundaries

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test:run
```

## Environment

Copy `.env.example` to `.env.local` and adjust values as backend services become available. The application defaults to mock mode and does not make real backend calls.

## Architecture

- `src/app/` contains routing, providers, and application layout infrastructure.
- `src/components/` contains reusable UI and cross-feature components.
- `src/features/` contains independent feature modules for auth, chat, conversations, contacts, profile, notifications, and settings.
- `src/services/api/` contains the centralized Axios client, API configuration, and typed error handling.
- `src/services/realtime/` contains only a future real-time interface; no connection is implemented.

UI components consume feature hooks and typed mock services rather than direct HTTP or WebSocket implementation details.
