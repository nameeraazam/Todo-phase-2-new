<!-- SYNC IMPACT REPORT
Version change: 1.0.0 → 2.0.0
Modified principles: None (completely new constitution for Phase II)
Added sections: Core Principles (6), Additional Constraints, Development Workflow
Removed sections: None (replaced entire template)
Templates requiring updates: ✅ .specify/templates/plan-template.md / ✅ .specify/templates/spec-template.md / ✅ .specify/templates/tasks-template.md
Follow-up TODOs: None
-->
# Todo Web Application Constitution

## Core Principles

### I. Spec-Driven Development (NON-NEGOTIABLE)
All features must be defined in specs before implementation begins. Every change to the codebase must have a corresponding update to the specification documents in `/specs`. This ensures clear requirements, reduces miscommunication, and creates a single source of truth for the project's intended behavior.

### II. User Isolation and Security by Default
Every feature must implement proper user isolation and security measures from the ground up. No feature should be developed without considering its security implications. All user data must be properly isolated, and access controls must be enforced consistently across the application.

### III. Clear Separation of Concerns
Maintain strict separation between frontend, backend, and database layers. The frontend (Next.js) should only handle presentation logic, the backend (FastAPI) should manage business logic and API contracts, and the database (Neon PostgreSQL) should focus on data persistence. No layer should directly access another without proper abstraction.

### IV. Incremental Evolution from Phase I
All new features must maintain backward compatibility with Phase I functionality where possible. The transformation from in-memory console app to full-stack web application should be approached incrementally, with each phase building upon the previous work without breaking existing functionality.

### V. JWT-Based Authentication Enforcement
Every API endpoint must require a valid JWT token for access. Authentication must be implemented using Better Auth with JWT, and no anonymous access to protected resources is permitted. This applies to all endpoints that handle user data or perform authenticated actions.

### VI. Task Scoping to Authenticated User
All task-related operations must be scoped to the authenticated user. Users can only view, create, update, or delete their own tasks. The system must enforce this at both the API and database levels to prevent unauthorized access to other users' data.

## Additional Constraints

### Technology Stack Requirements
- Frontend: Next.js 16+ with App Router
- Backend: FastAPI (Python)
- ORM: SQLModel
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT
- Repository: Monorepo with Spec-Kit structure

### Security Requirements
- All API endpoints require a valid JWT token
- No anonymous access to tasks
- No business logic in frontend components
- No direct database access from frontend
- Shared authentication secret across frontend and backend

### Architecture Standards
- Clean, maintainable, and extensible architecture
- Proper separation of frontend, backend, and database concerns
- Consistent RESTful API design with clear contracts
- Centralized authentication management

## Development Workflow

### Feature Implementation Process
1. Define feature requirements in `/specs/[feature-name]/spec.md`
2. Create implementation plan in `/specs/[feature-name]/plan.md`
3. Break down implementation into testable tasks in `/specs/[feature-name]/tasks.md`
4. Implement features following the defined tasks
5. Test each user story independently before integration

### Code Review Requirements
- All pull requests must verify compliance with this constitution
- Changes must align with the defined specifications
- Security implications must be reviewed for all user-facing features
- Architecture decisions must follow the separation of concerns principle

### Quality Gates
- All user stories must be independently testable
- Features must work for multiple users with proper data isolation
- JWT authentication must be verified on every relevant request
- Code must follow clean architecture principles

## Governance

This constitution supersedes all other development practices for the Todo Web Application project. All amendments must be documented with proper justification and approval. The constitution must be referenced during all code reviews and architectural decisions. Compliance reviews should occur regularly to ensure adherence to these principles.

**Version**: 2.0.0 | **Ratified**: 2026-01-19 | **Last Amended**: 2026-01-19
