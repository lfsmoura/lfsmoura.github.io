---
title: Algebraic Apps
---

Claude code has changed the game, but our tools haven't changed. We can build better tools now. Those new tools got to support this new paradigm: codebases were an extension of programmer's brains. As programmers get free to do higher level thinking, all the knowledge that once lived inside one's brain should become context on the code.

Our applications have too many implicit assumptions. We assume that validations have worked, that no forgotten code path was executed. What if we could encode our assumptions explicitly on our data model?

Before I tell you how I plan to do that, let's discuss how we got here. Modern applications tend to grow like sedimentary layers: we add features, we change constraints locally, external services appear and disappear. Over time, we end up with systems where validation, synchronization, invariants, execution timing, code structure, and migrations are all scattered across multiple layers and files. -- Even if you systematize migrations, the effects they are probably scattered as well.

## Codifying assumptions

The limits of our language are the limits of my world - paraphrasing Wittgenstein. Could we view states and operations as elements with explicit laws (idempotent, associative, commutative, monotone), and then build tooling and architecture around those laws? that would make validation, sync, migrations and composition safer and more predictable.

There's a lot to unpack here and I am still lapidating those ideas. So let me explore how we build software today through six problems and how I fell we could do better:

### Problem 1: Validation logic scattered across layers

In most systems, validation is duplicated and fragmented:

- Some rules live in the frontend (form validation).
- Some live in HTTP handlers or controllers.
- Others live in service layers or domain services.
- Occasionally there are constraints in the database that encode another slice of the truth.

You see patterns like:

- A password strength check in the UI, a different one on the server.
- Business rules enforced sometimes in the API, sometimes in the database, sometimes only in a particular code path.
- "Local-only" checks (e.g. input format) and "global" checks (e.g. username uniqueness) mixed in arbitrary ways.

Consequences:

- It is hard to answer: "What does it mean for this operation to be valid?" There is no single place to point to.
- Changes are dangerous: adding a new constraint requires hunting for all the layers that also need it.
- Offline or partially-connected clients cannot easily reuse the same rules they rely on when online.

What I would like instead

For each operation on the domain (e.g. UpdateProfile, CreateOrder), there should be a single definition of:

- The input type and output type.
- The set of validations as a pipeline:
  - Some purely local (pure functions).
  - Some that require access to one or more storages (e.g. "canonical user store", "CRM", "cache").
- The domain mutation that runs only if these validations pass.

Algebraically, you can think of a "domain action" as:

```
Action = (Validation_1 ∧ Validation_2 ∧ … ∧ Validation_n) ⇒ Mutation
```

where each validation declares the storages it needs, not whether it is "client-side" or "server-side". The same action can then be executed:

- With a partial set of storages (offline client) – only the validations that can run will run.
- With the full set (canonical server) – the complete rule set is enforced.

The important point: validation and mutation are defined once, as a single object with a clear contract, not replicated in "whatever layer we happen to be in".

### Problem 2: Synchronization logic scattered across the system

Synchronization is often treated as an afterthought:

- A sync job here, a webhook there, some ad-hoc reconciliation in a worker, and some extra code in the request path "just to be safe".
- Each integration (CRM, billing, analytics, local caches, offline devices) ends up with its own sync strategy.

As a result:

- There is no explicit model of where a piece of data is canonical and which storages are caches or replicas.
- Conflict resolution rules are implemented informally and inconsistently.
- Offline-first behaviour is hard to reason about, because everything depends on "how this particular component decided to sync".

What I would like instead

Treat sync as a graph of Storages and Sync strategies:

- Each entity declares a canonical storage (e.g. "clients live canonically in HubSpot").
- Other storages (IndexedDB, Postgres, Redis, another service) are caches or projections.
- Each sync edge has:
  - Direction (one-way or two-way).
  - A merge function, ideally with clear algebraic properties.

At the data level, use structures that admit a well-defined merge: monoids and semilattices. For example:

- Counters: combine = + (monoid).
- Sets: join = union (join-semilattice).
- Flags: join = logical-or (once true, never revert).

Then synchronization between two replicas of a value v becomes:

v_merged = merge(v_canonical, v_replica)

where merge is associative, commutative and idempotent whenever possible. That gives you:

- Convergence regardless of the order in which replicas sync.
- The ability to compact logs.
- Deterministic behaviour for offline-first clients that eventually reconnect.

### Problem 3: Logic, properties, and invariants scattered across the codebase

Most codebases have invariants and properties hidden in comments or implied by the implementation:

- "This operation is safe to retry."
- "These two updates commute."
- "This field is monotonically increasing."
- "This relation is symmetric."

But these properties are rarely encoded in the type system or in metadata. They live in the heads of developers and in scattered documentation.

Consequences:

- The runtime (or infrastructure) cannot use those properties to optimize or to enforce correct behaviour (e.g. automatic retries, deduplication, parallelization).
- It is easy to break invariants accidentally when touching code that was written with implicit assumptions.

What I would like instead

Treat operations and states as algebraic objects with explicit laws:

- Operations can declare: Idempotent, Pure, Commutative, Associative, Monotone, Compensable.
- States/properties can declare:
  - Monoid structure (has empty and combine).
  - JoinSemilattice structure (join that is associative, commutative, idempotent).
  - An Equal for observational equality.

This allows the runtime to:

- Retry idempotent actions safely.
- Deduplicate repeated actions.
- Parallelize folds over associative/commutative reducers.
- Merge replicas using the declared join when available.

And it gives humans a place to look when asking "what are the invariants of this piece of state?".

### Problem 4: Execution timing scattered and implicit

In a typical system, "when does something happen?" is often implicit:

- Some code runs directly in response to user actions.
- Some code runs in HTTP handlers.
- Some code runs in cron jobs.
- Some runs in event handlers, queues, webhooks, or background workers.

Understanding the lifecycle of a business operation can require chasing through multiple layers and systems:

- The user clicks a button.
- The UI calls an API.
- The API writes to a database and emits an event.
- A consumer picks up the event and schedules a job.
- A job runs hours later and touches another service.

There is no single object you can inspect and say: "this is the action, and these are all the allowed execution contexts and timing policies."

What I would like instead

Separate:

- What an operation does (its domain logic, validations, invariants).
- Where and when it is executed (timer, user-triggered, reaction to an event, batch, etc.).

In other words:

- Domain actions are pure descriptions: validation + mutation Effect + algebraic laws.
- Execution policies and schedulers decide when to apply them:
  - immediate, in response to user;
  - scheduled (daily job);
  - reactive to a stream of domain events.

This is similar to the separation between a function and the context in which it is called, but elevated to the level of domain operations. The same action definition can be used:

- in a synchronous API;
- in a background job;
- in a replay of a log;
- in an offline client that queues operations.

The time dimension is no longer hard-coded into the business logic; it is an orthogonal concern.

### Problem 5: Code structure scattered and tangled

Over time, code tends to become intertwined:

- Auth logic leaks into controllers and views.
- Sync logic leaks into business services.
- Validation is duplicated between front and back.
- Infrastructure details (queue, scheduler, HTTP framework) surface in domain code.

It is the familiar "headphone cable" problem: everything works, but untangling or reusing one piece is painful.

What I would like instead

Think of code in layers and blocks:

1. **Capabilities** - Small, focused Effects with stable input and output types, representing "what the system can do" (e.g. getUserByEmail, createSession, sendEmail). They do not know about HTTP, UI, or timing.
2. **Features / flows** - "Glue files" that compose capabilities into higher-level operations: login flows, registration flows, billing flows. They orchestrate capabilities, but do not embed infrastructure details.
3. **App composition** - A set of descriptors that say:
   - which features are included;
   - which routes or commands they expose;
   - how they are wired into the app framework.

In this model:

- Features are composable units: they can be added, removed, or reused across apps, as long as the required capabilities are present.
- App composition is a union of feature descriptions, which is naturally associative, commutative, and idempotent: order does not matter, union is conflict-free at the semantic level.
- Code evolution becomes more about adding or replacing features than editing arbitrary files.

The idea is to move from "patching files" to "composing transformations" on a well-typed capability graph.

### Problem 6: Migrations scattered and fragile

Migrations are often implemented in multiple layers:

- Database migrations to change schema.
- One-off scripts to fix data.
- Manual changes in external systems (CRMs, billing, analytics).
- Implicit migrations embedded in application startup logic.

This creates several problems:

- It is hard to reproduce the exact evolution of the system.
- Rolling back is dangerous or impossible.
- Offline clients may have divergent or stale views that are not upgraded consistently.

What I would like instead

Use event sourcing as a base:

- Treat the event log as the primary source of truth.
- Treat current state as a projection over that log:
  - often defined by a reducer with algebraic properties (monoid, semilattice, etc.).
- Encapsulate schema and interpretation changes as:
  - upcasters (that adapt old events to the new shape),
  - new projections (new read models) that can be built from the same log.

Migration then becomes:

- Adding or updating projections, not mutating history.
- Replaying events through new projections (in parallel, with compaction) using the algebraic structure to ensure correctness and performance.
- Swapping read models once new projections are ready.

In an offline-first setting:

- Clients may send old versions of events.
- The server upcasts them and applies them to the latest projections.
- Because merges and reducers are designed with associativity and idempotence in mind, the system can tolerate replays, out-of-order delivery and partial connectivity.

Migrations become more about evolving how we interpret the log than about permanently mutating state in place.

## My dream

All those problems stem from the same underlying issue: we lack a coherent, explicit model of what our operations and states are, and what laws they obey.

An algebraic view does not require heavy formalism. It means:

- Declaring properties of operations and states explicitly (idempotent, associative, commutative, monotone).
- Giving data types merge operations with clear laws (monoids, semilattices) where possible.
- Centralizing validation and invariants per operation.
- Treating execution timing and infrastructure as separate concerns.
- Using event sourcing as a stable backbone for evolution and migration.

From there, you can start building tooling:

- A runtime that uses these properties to schedule, retry, sync and merge.
- A code structure where features are composable blocks, not tangled edits.
- A migration strategy that is repeatable and safer by construction.

That's my dream: a system where composition, synchronization and evolution are guided by explicit laws.
