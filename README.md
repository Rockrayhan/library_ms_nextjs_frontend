

<!-- page / file stucture -->

src/
 ├─ app/
 │   ├─ (public)/
 │   │    ├─ layout.tsx
 │   │    ├─ page.tsx                -> Home
 │   │    ├─ books/
 │   │    │    └─ page.tsx           -> All books
 │   │    ├─ subscription/
 │   │    │    └─ page.tsx           -> Subscription packages
 │   │
 │   ├─ dashboard/
 │   │    ├─ layout.tsx              -> shared dashboard layout (sidebar + navbar)
 │   │    ├─ admin/
 │   │    │    ├─ page.tsx           -> Admin dashboard
 │   │    │    ├─ users/ page.tsx
 │   │    │    ├─ subscriptions/ page.tsx
 │   │    │    └─ books/ page.tsx
 │   │    ├─ user/
 │   │    │    ├─ page.tsx           -> User dashboard
 │   │    │    ├─ subscription/ page.tsx
 │   │    │    └─ borrowed/ page.tsx
 │   │
 │   ├─ api/
 │   │    ├─ auth/
 │   │    │    ├─ login/route.ts
 │   │    │    └─ logout/route.ts
 │   │    └─ ...
 │
 ├─ components/
 │   ├─ ui/                           -> shadcn auto-generated
 │   ├─ navbar.tsx
 │   ├─ footer.tsx
 │   ├─ dashboard/
 │   │    ├─ sidebar.tsx
 │   │    └─ topbar.tsx
 │
 ├─ lib/
 │   ├─ auth.ts                       -> middleware-like auth check
 │   ├─ axios.ts                      -> axios instance
 │   └─ utils.ts
 │
 ├─ styles/
 │    └─ globals.css
