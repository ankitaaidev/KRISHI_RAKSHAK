KrishiRakshak Design Guidelines
Design Approach: Professional Agricultural Dashboard System
Selected Approach: Design System (Material Design principles + Agricultural context) Justification: Information-dense agricultural decision platform requiring clarity, reliability, and mobile-first accessibility for farmers making critical real-time decisions.

Core Principles:

Data clarity over decoration
Trust through professional polish
Immediate actionability of information
Mobile-first farmer accessibility
Typography System
Font Families (Google Fonts):

Primary: Inter (UI, body, data displays)
Accent: Poppins (headings, hero, emphasis)
Hierarchy:

Hero Headline: Poppins 4xl-6xl, font-bold
Section Headers: Poppins 2xl-3xl, font-semibold
Dashboard Cards: Inter xl, font-semibold
Risk Indicators: Inter 2xl-3xl, font-bold
Body Text: Inter base-lg, font-normal
Data Labels: Inter sm, font-medium
Chatbot: Inter base, font-normal
Layout & Spacing System
Spacing Primitives: Tailwind units of 4, 6, 8, 12, 16

Component padding: p-6 to p-8
Section spacing: py-12 to py-16
Card gaps: gap-6 to gap-8
Dashboard grid gaps: gap-4 to gap-6
Container Strategy:

Landing page sections: max-w-7xl
Dashboard content: max-w-6xl
Form elements: max-w-2xl
Chatbot interface: max-w-4xl
Component Library
Landing Page Structure
Hero Section (80vh):

Large hero image: Agricultural field with technology overlay (drone, sensors, farmer with tablet)
Centered content with backdrop blur
Headline + subheadline + dual CTA (Get Started + Watch Demo)
Trust indicators below: "Serving 50,000+ farmers | 15+ states"
Problem/Solution Section:

2-column layout (md:grid-cols-2)
Left: Problem statement with farmer testimonial
Right: Solution overview with feature highlights
Key Features Grid (3-column on desktop):

Icon + title + description cards
Elevated cards with subtle hover lift
Features: Risk Assessment, Irrigation Guidance, Market Timing, Scheme Checker, Regional Maps, AI Chatbot
How It Works (Visual Timeline):

Horizontal process flow (4 steps)
Numbered circles with connecting lines
Icons + brief descriptions
Dashboard Preview Section:

Large dashboard mockup/screenshot
Annotation callouts highlighting key features
Side-by-side mobile + desktop views
Testimonials (2-column grid):

Farmer photos + quotes + location
Star ratings + crop type badge
CTA Section:

Full-width with agricultural background image
Centered headline + button + secondary link
Newsletter signup embedded
Footer (Multi-column):

Logo + tagline
Quick links (Features, Pricing, About, Contact)
Contact info + social links
Language selector (English/Hindi)
Trust badges (Government partnerships, certifications)
Farmer Dashboard Layout
Top Navigation Bar:

Logo left
Farm selector dropdown center
Notifications + profile right
Language toggle (EN/HI)
Dashboard Grid (Responsive): Desktop: 3-column primary layout Tablet: 2-column Mobile: Single column stack

Risk Assessment Card (Hero Card - Full Width First):

Large risk badge (LOW/MEDIUM/HIGH) with icon
Risk score visualization (gauge/progress)
3-4 bullet points explaining risk factors
"View Details" expandable section
Smart Irrigation Module (Featured Card):

Primary action: "Irrigate Now" or "Delay Irrigation X hours"
Weather forecast mini-timeline (next 48 hours)
Soil moisture indicator (visual gauge)
Countdown timer for next action
Market Timing Advisor (Action Card):

Decision badge: "Sell Now" or "Wait"
Price trend chart (7-day simple line graph)
Expected price direction indicator (arrows)
Market comparison (my crop vs. regional average)
Scheme Eligibility (Scrollable List Card):

Scheme cards with benefit amount prominently displayed
Eligibility status badges (Eligible/Applied/Received)
"Apply Now" CTAs
Collapsible details (requirements, documents, deadlines)
Regional Map View (Full-width Section):

Interactive India map with state hover/selection
Side panel showing selected state details
Filters: Soil type, crop season, harvest timing
Visual key/legend
AI Yield Outlook (Compact Info Card):

Large yield prediction badge (Low/Normal/High)
Confidence indicator
Contributing factors list
Historical comparison
AI Chatbot Interface
Placement: Fixed bottom-right widget Collapsed State: Floating action button with message icon + badge Expanded State (Mobile: Full screen, Desktop: 400px card):

Header: "Kisan e-Mitra" + language toggle + minimize
Chat area: Scrollable message thread
Message bubbles: User (right-aligned), Bot (left-aligned, with avatar)
Quick action chips for common questions
Input field with send button + voice input icon
Suggested questions carousel at bottom when empty
Images & Asset Strategy
Hero Image: YES - Large, high-quality photograph

Content: Indian farmer in field using smartphone/tablet with visible crops and modern agricultural technology
Treatment: Subtle gradient overlay for text legibility
Placement: Full-width background, 80vh
Additional Images:

Dashboard Preview: Actual interface screenshot/mockup
How It Works: Simple illustrated icons (not photos)
Testimonials: Real farmer headshots (circular crops)
Feature Cards: Icon-based (no photos)
CTA Section: Agricultural landscape background
Regional Map: Vector India map with data visualization
Icons: Heroicons (via CDN)

Consistent 24px size for feature cards
16px for UI elements
32px for dashboard status indicators
Animation Strategy
Minimal, Purposeful Animations:

Card hover: Subtle lift (translateY -2px, shadow increase)
Risk indicator: Pulse animation on critical alerts only
Irrigation countdown: Smooth number transitions
Map state selection: Fade transitions
Chatbot: Slide-in from bottom-right
Page transitions: Simple fade
NO animations for:

Static content sections
Hero elements
Footer
Navigation
Accessibility & Responsive Behavior
Mobile-First Breakpoints:

Base (mobile): Single column, stacked cards
md (tablet): 2-column grid for features/testimonials
lg (desktop): 3-column dashboard, multi-column footer
Touch Targets: Minimum 44px height for all interactive elements Form Inputs: Consistent styling across dashboard with clear labels and validation states Data Visualization: Ensure charts/gauges remain readable at all sizes

This design creates a professional, trustworthy agricultural platform that prioritizes farmer decision-making while maintaining visual polish and mobile accessibility.