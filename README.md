# Vallarta WKND

Sitio de **Vallarta WKND**, tours en barco por Bahía de Banderas. Next.js, en español y en inglés (`/` y `/en`), sin CMS ni base de datos.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local
npm run dev                  # http://localhost:3000 (español) y /en (inglés)
```

## Comandos disponibles

| Comando                                   | Descripción                                             |
| ----------------------------------------- | ------------------------------------------------------- |
| `npm run dev`                             | Servidor de desarrollo.                                 |
| `npm run build`                           | Build de producción (todo estático).                    |
| `npm run start`                           | Sirve el build de producción.                           |
| `npm run lint`                            | ESLint.                                                 |
| `npm run typecheck`                       | `next typegen` + `tsc --noEmit`.                        |
| `npm run format` / `npm run format:check` | Prettier sobre el repo.                                 |
