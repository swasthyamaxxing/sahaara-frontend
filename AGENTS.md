<!-- BEGIN:nextjs-agent-rules -->

# AGENTS.md

See chat content converted into markdown.

## Tech Stack
- Next.js 16.2.10
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- Axios
- Lucide React
- Sonner

## Folder Structure
```text
src/
├── app
├── components/
│   ├── shared
│   ├── ui
│   ├── auth
│   ├── dashboard
│   ├── profile
│   ├── medical-history
│   ├── reports
│   ├── medications
│   ├── appointments
│   ├── vitals
│   └── assessments
├── services/
│   ├── api
│   └── axiosInstance.ts
├── store
├── constants
├── lib
├── hooks
├── types
└── proxy.ts
```

Use service layer for API, Zustand only for global state, controlled forms with useState, Tailwind+shadcn, no direct axios in components, no any, reusable components, proxy.ts for auth.

<!-- END:nextjs-agent-rules -->