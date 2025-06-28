# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Kousai Yamamoto (山本公才), built as a single-page Next.js application with heavy emphasis on animations and visual effects.

## Technology Stack

- **Framework**: Next.js 15.2.4 with App Router
- **UI Library**: React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom animations
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Animation**: Framer Motion, react-parallax-tilt
- **Theme Management**: next-themes (dark/light mode)
- **Icons**: Lucide React

## Common Commands

```bash
# Development
npm run dev          # Start development server (http://localhost:3000)

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

**Note**: Build configuration has ESLint and TypeScript errors disabled. Be cautious when making changes.

## Architecture & Structure

### Directory Layout
```
/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Single page that renders Portfolio
│   └── globals.css        # Global styles and animations
├── components/            
│   ├── Portfolio.tsx      # Main component (1269 lines) - contains all sections
│   ├── theme-provider.tsx # Theme context wrapper
│   └── ui/               # shadcn/ui components (45+ reusable components)
├── hooks/                # Custom hooks (use-mobile, use-toast)
├── lib/                  # Utilities (cn function for className merging)
└── public/               # Static assets (images, videos)
```

### Key Architectural Decisions

1. **Single Component Architecture**: The entire portfolio is in one large Portfolio.tsx component. While this simplifies routing, it makes the component difficult to maintain.

2. **State Management**: Uses local React state extensively. No global state management system.

3. **Animation-First Design**: Heavy use of Framer Motion for:
   - Scroll-triggered animations
   - Mouse follower effects
   - Parallax scrolling
   - Page transitions

4. **Styling Pattern**: 
   - Tailwind utility classes for styling
   - CSS variables for theming
   - Custom animations in globals.css
   - Glass morphism effects throughout

## Development Patterns

### Working with Animations
- All major sections use Framer Motion's `motion` components
- Animations are viewport-triggered using `whileInView`
- Mouse position tracking for interactive effects
- Scroll progress tracking for parallax effects

### Adding New Sections
When adding new sections to the portfolio:
1. Add the section within Portfolio.tsx
2. Use motion components for animations
3. Follow the existing pattern of viewport-triggered animations
4. Ensure dark mode compatibility using Tailwind's dark: prefix

### Component Usage
- UI components from `/components/ui/` are pre-styled and follow shadcn patterns
- Use the `cn()` utility from `/lib/utils` for conditional className merging
- Components use TypeScript interfaces for props

### Responsive Design
- Mobile-first approach using Tailwind breakpoints
- Custom `use-mobile` hook available for programmatic responsive behavior
- Test on mobile viewports as the site has specific mobile optimizations

## Important Notes

1. **No Testing Framework**: Currently no tests exist. Consider adding tests when implementing new features.

2. **Build Warnings Disabled**: TypeScript and ESLint errors don't fail builds. Always check the console for warnings.

3. **Large Component Warning**: Portfolio.tsx is very large. When making significant changes, consider extracting sections into separate components.

4. **Performance Considerations**: 
   - Heavy animation usage may impact performance on lower-end devices
   - Image optimization is disabled in next.config.mjs
   - Consider lazy loading for new heavy components

5. **Font System**: Three custom fonts are loaded (Montserrat, Noto Sans JP, Playfair Display). Use these consistently for new content.

## Common Tasks

### Adding a New Animation Effect
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>
  {/* Your content */}
</motion.div>
```

### Using UI Components
```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Components follow shadcn/ui patterns
<Button variant="outline" size="lg">
  Click me
</Button>
```

### Dark Mode Support
```tsx
// Use Tailwind's dark: prefix
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

### Responsive Classes
```tsx
// Mobile-first responsive design
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## Gemini CLI 連携ガイド

### 目的
ユーザーが **「Geminiと相談しながら進めて」** （または同義語）と指示した場合、Claude は以降のタスクを **Gemini CLI** と直接協調しながら進める。
Gemini から得た回答はそのまま提示し、Claude 自身の解説・統合も付け加えることで、両エージェントの知見を融合する。

### トリガー
- 正規表現: `/Gemini.*相談しながら/`
- 例:
  - 「Geminiと相談しながら進めて」
  - 「この件、Geminiと話しつつやりましょう」
  - 「gemini」

### 基本フロー
1. **PROMPT 生成**
   Claude はユーザーの要件を 1 つのテキストにまとめ、環境変数 `$PROMPT` に格納する。

2. **Gemini CLI 呼び出し**
   ```bash
   gemini <<EOF
   $PROMPT
   EOF
   ```