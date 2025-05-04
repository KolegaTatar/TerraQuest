# Etap 1: Budowanie aplikacji frontendowej
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Etap 2: Budowanie aplikacji backendowej
FROM node:18 AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
COPY --from=frontend /app/frontend/build ./public
EXPOSE 3000
CMD ["npm", "start"]
