###
# Full-stack Docker image (frontend build + backend build)
# - Frontend entry: ./src/web/index.jsx -> output: ./dist/
# - Backend entry:  ./backend/src/index.ts -> output: ./backend/dist/index.js
# Prod start: node backend/dist/index.js (expects env vars at runtime)
###

# ---------- Frontend deps + build ----------
FROM node:18-alpine AS frontend-deps
WORKDIR /app/frontend
COPY package*.json ./
COPY babel.config.js webpack.config.js tsconfig.json ./
RUN npm ci --ignore-scripts

FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY --from=frontend-deps /app/frontend/node_modules ./node_modules
COPY package*.json ./
COPY babel.config.js webpack.config.js tsconfig.json ./
COPY public ./public
COPY src ./src
COPY App.tsx ./App.tsx
RUN npm run build

# ---------- Backend deps + build ----------
FROM node:18-alpine AS backend-deps
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --ignore-scripts

FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY --from=backend-deps /app/backend/node_modules ./node_modules
COPY backend ./
RUN npm run build

# ---------- Runtime ----------
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Backend runtime files
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/package*.json ./backend/

# Frontend static bundle
COPY --from=frontend-build /app/frontend/dist ./frontend-dist

# Expose API port
EXPOSE 4000

# Start backend (expects env vars provided at runtime)
CMD ["node", "backend/dist/index.js"]


