---
id: 1
title: "Create frontend plan"
stage: plan
date_iso: 2026-01-19
surface: agent
model: Qwen
feature: frontend-todo-app
branch: 001-frontend-todo-app
user: user
command: /sp.plan
labels:
  - frontend
  - todo-app
  - planning
  - architecture
links:
  spec: ../specs/001-frontend-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files_yaml:
  - specs/001-frontend-todo-app/plan.md
  - specs/001-frontend-todo-app/research.md
  - specs/001-frontend-todo-app/data-model.md
  - specs/001-frontend-todo-app/quickstart.md
  - specs/001-frontend-todo-app/contracts/api-contracts.md
tests_yaml: []
---

# Prompt History Record

## Original Prompt

```
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
handoffs: 
  - label: Create Tasks
    agent: sp.tasks
    prompt: Break the plan into tasks
    send: true
  - label: Create Checklist
    agent: sp.checklist
    prompt: Create a checklist for the following domain...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/powershell/setup-plan.ps1 -Json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType qwen`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.plan /sp.plan

Project: Phase II – Frontend Web Application (Todo App)

Architecture overview:
- Next.js 16+ application using App Router
- Component-driven, responsive UI with clean separation of concerns
- Secure, JWT-authenticated communication with backend API

Application structure:
- App Layer (`/app`)
  - Authentication pages (login, signup)
  - Protected task pages (dashboard)
  - Layouts and route protection
- UI Components (`/components`)
  - Reusable presentational components (buttons, inputs, cards)
  - Task-specific components (task list, task item, task form)
- State & Logic (`/lib`)
  - API client (JWT-aware)
  - Auth utilities and session handling
- Styling (`/styles`)
  - Tailwind CSS configuration and global styles

Data flow:
- User interacts with UI components
- Client components trigger actions
- API client attaches JWT to requests
- Backend responds with user-scoped data
- UI updates reflect current application state

Design principles:
- Server components by default
- Client components only where interactivity is required
- Reusable and composable UI components
- No business logic inside UI components
- Clear handling of loading, empty, and error states

Security considerations:
- All API calls include JWT token
- Unauthorized users redirected to login
- Protected routes enforce authentication

Deliverables:
- Fully responsive, professional UI
- Authenticated frontend flow
- Clean, modular project structure
- Frontend ready for backend integration
```

## Response Summary

Completed the implementation planning for the Frontend Web Application (Todo App). The planning process included:

1. Setup and initialization of the planning environment
2. Creation of the implementation plan (plan.md) with technical context and project structure
3. Phase 0 research completed (research.md) with technology decisions and rationale
4. Phase 1 design completed with:
   - Data model definition (data-model.md)
   - API contracts specification (contracts/api-contracts.md)
   - Quickstart guide (quickstart.md)
5. Agent context updated with the new technology stack
6. Constitution check performed to ensure all requirements are met

All required artifacts have been created and the plan is ready for the next phase: task breakdown using /sp.tasks.

## Outcome

The implementation plan is complete with all required documentation and design artifacts. The plan follows the constitution requirements and is ready for task breakdown and implementation. The frontend application structure is clearly defined with proper separation of concerns, authentication mechanisms, and API contracts established.