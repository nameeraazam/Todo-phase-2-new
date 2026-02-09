# Tasks: Frontend Web Application (Todo App)

**Input**: Design documents from `/specs/001-frontend-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification does not explicitly request test implementation, so tests will not be included in this task list.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `frontend/src/`, `frontend/tests/`
- Paths shown below assume web app structure - adjust based on plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan in frontend/
- [X] T002 Initialize Next.js 16+ project with TypeScript dependencies
- [X] T003 [P] Configure Tailwind CSS with proper Next.js integration
- [X] T004 [P] Configure TypeScript with recommended Next.js settings
- [X] T005 [P] Set up basic ESLint and Prettier configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [X] T006 Setup Better Auth configuration for JWT-based authentication
- [X] T007 [P] Create API client module with JWT token attachment in frontend/lib/api/client.ts
- [X] T008 [P] Implement authentication context/provider in frontend/app/providers/auth-provider.tsx
- [X] T009 Create base TypeScript types based on data model in frontend/types/index.ts
- [X] T010 [P] Setup protected route component in frontend/components/auth/protected-route.tsx
- [X] T011 Configure global error handling and loading states
- [X] T012 Setup basic layout structure with header/navigation in frontend/app/layout.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable users to securely sign up and sign in to the todo application so they can access their personal tasks

**Independent Test**: Can be fully tested by completing the signup and signin flows with valid credentials and gaining access to the application dashboard

### Implementation for User Story 1

- [X] T013 [P] [US1] Create signup page component in frontend/app/(auth)/signup/page.tsx
- [X] T014 [P] [US1] Create signin page component in frontend/app/(auth)/signin/page.tsx
- [X] T015 [US1] Implement signup form with validation in frontend/components/auth/signup-form.tsx
- [X] T016 [US1] Implement signin form with validation in frontend/components/auth/signin-form.tsx
- [X] T017 [US1] Connect signup form to API endpoint in frontend/lib/api/auth.ts
- [X] T018 [US1] Connect signin form to API endpoint in frontend/lib/api/auth.ts
- [X] T019 [US1] Implement session management after authentication
- [X] T020 [US1] Redirect authenticated users away from auth pages
- [X] T021 [US1] Add loading and error states to auth forms

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Personal Tasks (Priority: P1)

**Goal**: Allow authenticated users to view their list of personal tasks so they can manage their responsibilities effectively

**Independent Test**: Can be fully tested by authenticating as a user and viewing their personal task list, ensuring only their tasks are displayed

### Implementation for User Story 2

- [X] T022 [P] [US2] Create task list component in frontend/components/tasks/task-list.tsx
- [X] T023 [P] [US2] Create task item component in frontend/components/tasks/task-item.tsx
- [X] T024 [US2] Create dashboard page in frontend/app/dashboard/page.tsx
- [X] T025 [US2] Implement API call to fetch user's tasks in frontend/lib/api/tasks.ts
- [X] T026 [US2] Connect task list to API using SWR for data fetching
- [X] T027 [US2] Implement empty state for when user has no tasks
- [X] T028 [US2] Add loading state for task list
- [X] T029 [US2] Ensure only authenticated user's tasks are displayed

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Create, Edit, and Delete Tasks (Priority: P2)

**Goal**: Allow authenticated users to create, edit, and delete tasks so they can keep their todo list up to date with their current responsibilities

**Independent Test**: Can be fully tested by performing all CRUD operations on tasks and verifying they persist correctly

### Implementation for User Story 3

- [X] T030 [P] [US3] Create task form component in frontend/components/tasks/task-form.tsx
- [ ] T031 [P] [US3] Create modal/dialog component for task operations in frontend/components/tasks/task-modal.tsx
- [X] T032 [US3] Implement API call to create tasks in frontend/lib/api/tasks.ts
- [X] T033 [US3] Implement API call to update tasks in frontend/lib/api/tasks.ts
- [X] T034 [US3] Implement API call to delete tasks in frontend/lib/api/tasks.ts
- [ ] T035 [US3] Add create task functionality to dashboard
- [ ] T036 [US3] Add edit task functionality to task items
- [ ] T037 [US3] Add delete task functionality to task items
- [ ] T038 [US3] Update UI to reflect task operations (optimistic updates)

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Mark Tasks Complete/Incomplete (Priority: P2)

**Goal**: Allow authenticated users to mark tasks as complete or incomplete so they can track their progress and organize their workload

**Independent Test**: Can be fully tested by toggling the completion status of tasks and verifying the changes persist

### Implementation for User Story 4

- [X] T039 [P] [US4] Add completion toggle to task item component in frontend/components/tasks/task-item.tsx
- [X] T040 [US4] Implement API call to update task completion status in frontend/lib/api/tasks.ts
- [X] T041 [US4] Update task item UI to reflect completion status (visual indicators)
- [X] T042 [US4] Add optimistic update for completion status toggle
- [ ] T043 [US4] Implement bulk completion status updates (optional enhancement)

**Checkpoint**: All user stories should now be independently functional

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T044 [P] Add responsive design to all components using Tailwind CSS
- [ ] T045 Add comprehensive error handling and user feedback
- [X] T046 [P] Add proper loading states throughout the application
- [X] T047 Add input validation and user feedback
- [ ] T048 [P] Add unit tests for utility functions
- [ ] T049 [P] Add integration tests for API client
- [ ] T050 [P] Documentation updates in README.md
- [ ] T051 Code cleanup and refactoring
- [ ] T052 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Depends on User Story 1 (authentication required)
- **User Story 3 (P2)**: Depends on User Story 2 (task list required)
- **User Story 4 (P2)**: Depends on User Story 2 (task list required)

### Within Each User Story

- Models before services
- Services before components
- Components before pages
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, user stories must proceed in sequence due to dependencies
- All components within a story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create signup page component in frontend/app/(auth)/signup/page.tsx"
Task: "Create signin page component in frontend/app/(auth)/signin/page.tsx"
Task: "Create signup form with validation in frontend/components/auth/signup-form.tsx"
Task: "Create signin form with validation in frontend/components/auth/signin-form.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1 & 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (Authentication)
4. Complete Phase 4: User Story 2 (View Tasks)
5. **STOP and VALIDATE**: Test authentication and task viewing independently
6. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (Authentication!)
3. Add User Story 2 → Test independently → Deploy/Demo (Task viewing!)
4. Add User Story 3 → Test independently → Deploy/Demo (CRUD operations)
5. Add User Story 4 → Test independently → Deploy/Demo (Completion toggling)
6. Each story adds value without breaking previous stories

### Sequential Team Strategy

With a single developer or when stories have dependencies:

1. Team completes Setup + Foundational together
2. Complete User Story 1 (Authentication) → Validate
3. Complete User Story 2 (View Tasks) → Validate
4. Complete User Story 3 (CRUD) → Validate
5. Complete User Story 4 (Completion) → Validate

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence