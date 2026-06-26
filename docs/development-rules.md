Development Rules

These rules define how Unique Spirits & Pairings is built. Every new feature should follow these principles.

1. Build for Scale

Never write code that only works today.

Every feature should make adding future drinks, categories, or functionality easier—not harder.

2. Single Source of Truth

Never duplicate information.

Examples:

Drink information belongs in the data layer.
Colors belong in the theme.
Fonts belong in the style guide.

Update information in one place whenever possible.

3. Reusable Components

If a UI element appears more than once, build it as a reusable component.

Examples:

Drink Card
Category Card
Search Bar
Favorite Button
Section Header 4. Consistent Design

Every screen should feel like part of the same application.

Use the project's design system:

Black backgrounds
Gold accents
White primary text
Consistent spacing
Consistent typography 5. Mobile First

Every screen must look excellent on both iPhone and Android.

Always consider:

Small screens
Large screens
Accessibility
Touch-friendly controls 6. Build Features Completely

Avoid leaving half-finished features.

Complete one feature before starting another.

Example:

✔ Drink Details

Before:

✘ AI Bartender

7. Git Workflow

Every completed feature gets its own commit.

Examples:

Create drink database
Add search
Build favorites
Improve navigation

Commit often.

8. Performance Matters

Avoid unnecessary re-renders.

Keep components lightweight.

Optimize images before shipping.

9. Premium Experience

Every interaction should feel intentional.

Ask:

"Does this feel like a premium app?"

If the answer is no, improve it.

10. User Value First

Every feature should answer one question:

"How does this make the app more useful or enjoyable?"

If it doesn't improve the user experience, reconsider adding it.

Team Motto

Build something we're proud to use ourselves.

Small improvements, consistently applied, create exceptional software.
