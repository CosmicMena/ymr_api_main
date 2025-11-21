# YMR System API

## Variáveis de ambiente
Defina as seguintes chaves no `.env` (exemplo):

```
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
PUBLIC_HOST=localhost
ENABLE_SWAGGER=false
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
JWT_SECRET=change_me_please
JWT_EXPIRES_IN=1h
THROTTLE_TTL=60
THROTTLE_LIMIT=100
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
```

## Healthcheck
- Liveness: `GET /api/v1/health/live`
- Readiness (inclui ping à BD): `GET /api/v1/health/ready`

## Arranque local
```
npm install
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

## Build e Produção
```
npm run build
npm run migrate:deploy
npm run start:prod
```

## Swagger
Ative com `ENABLE_SWAGGER=true` e aceda em `/api/docs`.
