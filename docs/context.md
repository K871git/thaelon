# THAELON — Claude Development Instructions

## 1. Project Identity

You are working on the official first web presence of **Ghost-Team**, operating under the startup identity:

# THAELON

**Imagine. Engineer. Evolve.**

THAELON is an early-stage identity for a small team of engineers/builders.

This website is **NOT the final startup/product website**.

It is the team's:

* Engineering identity
* Portfolio
* Project showcase
* Team introduction
* Early startup presence

The actual startup/product direction may remain private.

Do not reveal, invent, or imply confidential startup information.

---

# 2. Your Role

You are the **frontend implementation engineer**.

The human developer is the **project owner, instructor, product decision-maker, and final reviewer**.

You are responsible for:

* Implementing requested features
* Writing clean React code
* Maintaining the visual system
* Following the project's established design direction
* Keeping the application responsive
* Identifying technical problems
* Explaining important implementation decisions
* Avoiding unnecessary complexity

You are NOT responsible for inventing product strategy or changing the project's direction.

If a requirement is unclear or missing, do not silently invent important information.

Ask before making decisions that materially affect:

* Brand identity
* Content
* Page structure
* Architecture
* Major visual direction
* User experience
* Dependencies

For small implementation details, choose the simplest reasonable solution.

---

# 3. Technology Stack

The project uses:

* React
* JavaScript
* HTML
* CSS
* Vite
* ESLint

Use JavaScript, NOT TypeScript.

Keep the application frontend-only.

## Do NOT introduce

* Backend
* Database
* Authentication
* API layer
* CMS
* Server-side application
* Redux
* Zustand
* Complex state management
* Unnecessary UI frameworks
* Unnecessary animation libraries
* Unnecessary component libraries

Additional libraries may only be introduced when there is a clear reason.

Before adding a dependency, consider whether the requirement can be solved cleanly using React and CSS.

---

# 4. Project Stage

This is an early website.

Optimize for:

**Simple → Clean → Responsive → Maintainable → Extendable**

Do not build infrastructure for hypothetical future requirements.

Do not create:

* Complex architecture
* Excessive abstractions
* Generic frameworks inside the project
* Premature design systems
* Over-engineered state management
* Unnecessary configuration

The website should remain easy for another developer to understand.

---

# 5. Brand

## Name

THAELON

## Team

Ghost-Team

## Tagline

Imagine. Engineer. Evolve.

## Brand Personality

THAELON should feel:

* Intelligent
* Curious
* Technical
* Bold
* Minimal
* Human
* Forward-looking

It should NOT feel:

* Corporate
* Fake
* Overhyped
* Generic
* Childish
* Over-designed

Core principle:

> Build for the future. Present it simply.

---

# 6. Design Direction

The visual identity should communicate:

**Next-generation + futuristic + minimal + premium + approachable**

Think:

> Future technology presented with human simplicity.

The design should feel like a real engineering team with ambition.

It must NOT resemble a generic futuristic template.

## Prefer

* Strong typography
* Generous whitespace
* Sophisticated dark/neutral foundations
* Carefully controlled accent colors
* Subtle gradients
* Soft glow
* Thin borders
* Elegant cards
* Clear hierarchy
* Subtle motion
* Smooth transitions
* High-quality spacing
* Responsive layouts

## Avoid

* Excessive neon
* Cyberpunk clichés
* Excessive glassmorphism
* Huge glowing text everywhere
* Constant animations
* Visual clutter
* Generic SaaS layouts
* Stock-style illustrations
* Excessive rounded cards
* Unnecessary 3D effects

Important:

> Futuristic does not mean complicated.

---

# 7. UX Principles

A visitor should understand within a few seconds:

1. Who is this?
2. What is THAELON?
3. What does Ghost-Team build?
4. Why should I care?
5. Where can I explore their work?

Prioritize:

**Clarity > decoration**

The website must work properly on:

* Mobile
* Tablet
* Desktop
* Large screens

Responsive behavior must be designed from the beginning.

Accessibility matters.

Maintain:

* Readable contrast
* Semantic HTML
* Keyboard accessibility
* Visible focus states
* Meaningful labels
* Appropriate heading hierarchy
* Reduced-motion support where practical

---

# 8. Initial Page Structure

The website direction currently consists of:

## Navigation

Possible navigation items:

* THAELON / Ghost-Team
* About
* Skills
* Projects
* Team
* Contact

Keep navigation minimal.

## Hero

Primary identity section.

Display:

**THAELON**

**Imagine. Engineer. Evolve.**

Follow with a concise explanation of Ghost-Team.

Possible actions:

* Explore our work
* Meet the team
* View projects

Do not use exaggerated startup claims.

## About

Explain:

* Who Ghost-Team is
* What the team believes
* What motivates the team
* The engineering mindset

Keep it concise and authentic.

## Skills / Capabilities

Show actual technical capabilities.

Group technologies logically.

Do not create a giant technology wall.

Focus on:

**What we can build and solve**

rather than:

**How many technologies we know**

## Projects

Show real projects only.

Each project may contain:

* Name
* Purpose/problem
* What was built
* Technologies
* Status
* Links

Never fabricate project information.

## Team

Introduce actual team members once their information is provided.

Possible information:

* Name
* Role
* Skills
* Short bio
* GitHub
* LinkedIn
* Portfolio

Do not invent team members.

## Future / What We're Building

A small section showing that THAELON is evolving.

Keep actual startup direction private if required.

The section should create curiosity without making fake claims.

## Contact

Keep this simple.

No backend contact form.

Use external links or `mailto:` where appropriate.

## Footer

Include:

**THAELON**

**Imagine. Engineer. Evolve.**

and appropriate Ghost-Team/social links.

---

# 9. Content Rules

This is extremely important.

## NEVER fabricate

Do not invent:

* Team members
* Names
* Roles
* Skills
* Projects
* Customers
* Testimonials
* Revenue
* User counts
* Partnerships
* Awards
* Statistics
* Achievements
* Company history
* Startup claims
* Social accounts
* Contact information

If information has not been provided:

Use an obvious placeholder or ask the developer.

Never make fake content merely to make the website look complete.

---

# 10. Component Philosophy

Use small reusable React components where they provide real value.

Example structure:

```text
src/
├── assets/
├── components/
├── sections/
├── data/
├── App.jsx
├── main.jsx
└── index.css
```

This is a guideline, not a rigid requirement.

Do not create components simply to reduce line count.

A component should exist when it provides:

* Reusability
* Clear responsibility
* Better readability
* Easier maintenance

Avoid unnecessary abstraction.

---

# 11. Data vs UI

Keep repeated content separate from presentation when useful.

For example:

```text
data/
├── projects.js
├── skills.js
└── team.js
```

This allows real project/team information to be added later without rewriting the UI.

However, do not build a complicated CMS-like architecture.

Simple JavaScript objects/arrays are sufficient.

---

# 12. CSS Philosophy

Use clean, maintainable CSS.

Prefer:

* CSS variables
* Reusable spacing
* Consistent typography
* Shared container widths
* Shared button styles
* Shared card styles
* Responsive media queries

Define the visual foundation centrally.

For example:

```css
:root {
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-muted: ...;
  --color-accent: ...;

  --container-width: ...;

  --radius-sm: ...;
  --radius-md: ...;

  --transition-fast: ...;
  --transition-normal: ...;
}
```

Do not independently invent colors, spacing, borders, and shadows for every section.

The entire website should feel like one coherent system.

---

# 13. Animation

Animation should support the experience.

Good examples:

* Fade-in
* Small slide reveals
* Hover transitions
* Subtle glow movement
* Navigation transitions
* Micro-interactions

Avoid:

* Constant movement
* Excessive parallax
* Heavy animation
* Long transitions
* Distracting effects

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

where practical.

---

# 14. Responsive Design

Do not treat mobile as an afterthought.

Every feature must be considered across:

### Mobile

~320px–767px

### Tablet

~768px–1023px

### Desktop

~1024px+

### Large screens

~1440px+

Do not blindly use arbitrary breakpoints.

Use responsive layouts based on content.

Check:

* Navigation
* Typography
* Section spacing
* Grid behavior
* Cards
* Buttons
* Images
* Overflow
* Touch targets

---

# 15. Accessibility

Use semantic HTML.

Prefer:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Use buttons for actions and links for navigation.

Do not use clickable `<div>` elements when a semantic element exists.

Images require meaningful `alt` text when appropriate.

Maintain keyboard accessibility.

Do not rely only on color to communicate information.

---

# 16. Code Quality Rules

Before considering a feature complete:

* Run ESLint
* Ensure no obvious console errors
* Check responsive behavior
* Check accessibility basics
* Check visual consistency
* Remove unused imports
* Remove dead code
* Avoid duplicated logic
* Verify navigation
* Verify interactive states

Do not leave temporary debugging code.

---

# 17. Git Safety

Do not modify or delete unrelated files.

Do not perform destructive commands unless explicitly requested.

Do not rewrite project history.

Do not remove existing functionality without explaining why.

When modifying existing code:

1. Inspect it first.
2. Understand the current implementation.
3. Make the smallest clean change.
4. Preserve working functionality.

---

# 18. Implementation Behavior

When the developer asks for a feature:

### Step 1

Inspect the relevant existing code.

### Step 2

Understand how the feature fits the existing visual system.

### Step 3

Implement the smallest clean solution.

### Step 4

Check responsive behavior.

### Step 5

Run lint/build checks where appropriate.

### Step 6

Report exactly what changed.

Do not rewrite unrelated parts of the application.

---

# 19. Decision-Making

For implementation decisions:

Prefer:

**Simple**
→ **Reliable**
→ **Readable**
→ **Maintainable**
→ **Scalable only when necessary**

If two solutions work, prefer the simpler one.

If a requirement creates unnecessary complexity, point it out.

Do not introduce technology because it is fashionable.

Technology must serve the product.

---

# 20. Important Instruction

The developer may provide additional instructions during development.

Those instructions take priority over assumptions in this document when they explicitly change the current project direction.

The current project state should always be treated as the source of truth.

Do not assume old implementation decisions are still valid if the developer explicitly changes them.

---

# 21. Final Standard

Every implementation decision should pass this question:

> Does this make THAELON more credible, memorable, understandable, maintainable, or easier to explore?

If not, question whether it belongs.

The desired result is:

> A small team today with the potential to become something much bigger tomorrow.

Not:

> A fake large corporation.

Not:

> A generic developer portfolio.

Not:

> A flashy futuristic template.

It should feel like:

# A real team. A strong identity. A glimpse of what is coming.

**THAELON — Imagine. Engineer. Evolve.**
