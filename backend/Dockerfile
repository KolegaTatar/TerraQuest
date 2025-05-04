# Użyj oficjalnego obrazu Node.js
FROM node:18 AS backend

WORKDIR /app

# Kopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalowanie wszystkich zależności (w tym devDependencies)
RUN npm install

# Kopiowanie pozostałych plików źródłowych do kontenera
COPY . .

# Uruchamianie kompilacji TypeScript (npm run build)
RUN npm run build

# Ustawienie portu 5000 (zdefiniowanego w backendzie)
EXPOSE 5000

# Uruchomienie aplikacji
CMD ["npm", "start"]
