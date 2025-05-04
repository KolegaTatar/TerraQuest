# Etap 1: Budowanie frontendu
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Etap 2: Budowanie backendu
FROM node:18 AS backend-builder
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install --include=dev
COPY backend .
RUN npm run build

# Etap finalny
FROM node:18
WORKDIR /app

# Kopiujemy zbudowany backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/node_modules ./node_modules
COPY --from=backend-builder /app/backend/package.json .

# Kopiujemy zbudowany frontend
COPY --from=frontend-builder /app/frontend/dist ./public

# Kopiujemy dodatkowe zasoby
COPY backend/img ./img

EXPOSE 5000
CMD ["node", "dist/main.js"]