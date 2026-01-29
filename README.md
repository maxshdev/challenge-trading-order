# 🧩 Monorepo – NestJS + NextJS + pnpm

Este proyecto es un **monorepo** configurado con **pnpm workspaces**, que contiene dos aplicaciones principales:

- **apps/api** → Backend con NestJS
- **apps/web** → Frontend con Next.js
- **packages/shared** → Módulos, tipos y utilidades compartidas entre ambas apps

## 📁 Estructura del proyecto

my-project/
├── apps/
│   ├── api/        # Backend NestJS
│   └── web/        # Frontend NextJS
├── packages/
│   └── shared/     # Código compartido (DTOs, tipos, utils, etc.)
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json

## 🚀 Requisitos

- Node.js 20+
- pnpm v8+
- PM2 (para producción)
- GitHub Actions habilitado para CI/CD

## ⚙️ Instalación

git clone https://github.com/<tu-usuario>/<tu-repo>.git
cd my-project
pnpm install

## 🧑‍💻 Desarrollo local

### API (NestJS)
pnpm --filter api dev

### Web (NextJS)
pnpm --filter web dev

O levantar ambas en paralelo:
pnpm dev

## 🏗️ Build de producción

pnpm --filter api build
pnpm --filter web build

## 📦 Despliegue (PM2 + GitHub Actions)

Cada aplicación tiene su pipeline independiente en GitHub Actions:
- .github/workflows/deploy-api.yml
- .github/workflows/deploy-web.yml

Cada uno se ejecuta solo cuando hay cambios en su respectiva carpeta (apps/api o apps/web).

En el servidor, las apps se manejan con PM2:

# API
cd ~/apps/api
pnpm install --prod
pm2 start dist/main.js --name api

# Web
cd ~/apps/web
pnpm install --prod
pm2 start "pnpm start --filter web" --name web

Para reiniciar después de un deploy:
pm2 restart api
pm2 restart web

## ⚡ Scripts útiles

Desde la raíz del monorepo:

| Comando | Descripción |
|----------|--------------|
| pnpm dev | Levanta todas las apps en modo desarrollo |
| pnpm build | Compila todas las apps |
| pnpm start | Inicia todas las apps compiladas |
| pnpm --filter api ... | Ejecuta un comando solo en la app api |
| pnpm --filter web ... | Ejecuta un comando solo en la app web |

## 🧠 Notas

- packages/shared permite compartir código (DTOs, validadores, tipos, etc.) entre api y web.
- Cada app tiene su propio package.json y sus dependencias aisladas.
- En producción, se recomienda mantener las rutas:
  ~/apps/api
  ~/apps/web
- Si usás GitHub Actions, asegurate de configurar los secretos:
  SERVER_HOST, SERVER_USER, SERVER_SSH_KEY

## 🧑‍🚀 Autor

Max Shetefec
Software Architect / Full Stack Developer
GitHub: https://github.com/maxshdev
LinkedIn: https://linkedin.com/in/maxshtefec

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Podés usarlo, modificarlo y distribuirlo libremente.

---