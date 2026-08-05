# Urban Compact

Medusa v2 + Next.js storefront for **Urban Compact** — furniture sized for small apartments.

## Local

```bash
# infra (from parent medusa-stores folder)
docker compose up -d

cd apps/backend
cp .env.example .env   # adjust if needed
npx medusa develop --port 9002

# other terminal
cd apps/storefront
cp .env.example .env.local
# set NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY from Admin → Settings → API Keys
npm run dev
```

- Admin: http://localhost:9002/app
- Storefront: http://localhost:8002

### Seed
```bash
cd apps/backend
npx medusa exec ./src/scripts/seed-urban-compact-v1.ts
```

## Stack
- Medusa 2.18 + Postgres + Redis
- Next.js storefront (custom Urban Compact theme)
