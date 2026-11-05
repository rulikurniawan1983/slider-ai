# Slider AI - UI Design Specification

## Design Principles
- Professional, Modern, Minimalist, Fast, Enterprise Ready
- Dark Mode & Light Mode support
- Responsive Design, Mobile First

## Color Palette

### Light Mode
- Background: #ffffff
- Foreground: #0f172a
- Primary: #3b82f6 (Blue-500)
- Border: #e2e8f0
- Muted: #f1f5f9

### Dark Mode
- Background: #0f172a
- Foreground: #f8fafc
- Primary: #3b82f6 (Blue-500)
- Border: #1e293b
- Muted: #1e293b

## Typography
- Font Family: Inter (sans-serif)
- Headings: 600-700 weight, tracking-tight
- Body: 400 weight, leading-relaxed
- Code: JetBrains Mono or Geist Mono

## Layout

### Sidebar (Desktop)
- Width: 256px
- Fixed position, left side
- Logo at top
- Navigation links
- User profile at bottom
- Collapsible on mobile

### Navbar
- Height: 64px
- Sticky top
- Theme toggle, notifications, user profile

### Main Content
- Flex-1, overflow-y-auto
- Padding: 24px

## Components

### Chat Interface
- Message bubbles: User (right, primary), Assistant (left, border)
- Markdown rendering with code highlighting
- Copy button on code blocks
- Streaming text animation
- Input at bottom with send button

### Cards
- Rounded-xl, border, shadow-sm
- Hover effects for interactive cards

### Buttons
- Primary: bg-primary, text-white, hover:bg-primary/90
- Secondary: bg-secondary, text-secondary-foreground
- Ghost: transparent, hover:bg-accent
- Destructive: bg-destructive, text-white

### Forms
- Input: rounded-md, border, focus:ring-2 focus:ring-primary
- Labels: text-sm, font-medium
- Error text: text-destructive, text-sm

## Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Animations
- Page transitions: fade-in
- Stream typing: pulse animation
- Hover states: 200ms transition
- Modal: scale + fade
