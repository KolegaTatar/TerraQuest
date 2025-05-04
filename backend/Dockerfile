# Użyj oficjalnego obrazu Node.js jako bazowego obrazu
FROM node:18 AS base

# Ustaw katalog roboczy
WORKDIR /app

# Kopiowanie plików package.json i package-lock.json w celu instalacji zależności
COPY package*.json ./

# Instalowanie zależności
RUN npm install

# Etap 1: Budowanie aplikacji frontendowej (jeśli jest)
FROM base AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Etap 2: Budowanie aplikacji backendowej
FROM base AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Kopiowanie zbudowanego frontendu do katalogu public w backendzie (jeśli dotyczy)
COPY --from=frontend /app/frontend/build ./public

# Eksponowanie portu, jeśli backend działa na porcie 3000
EXPOSE 3000

# Uruchomienie backendu
CMD ["npm", "start"]
