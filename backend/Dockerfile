# Użyj oficjalnego obrazu Node.js
FROM node:18 AS backend

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików package.json i package-lock.json
COPY package*.json ./

# Instalowanie wszystkich zależności, w tym devDependencies
RUN npm install --legacy-peer-deps

# Kopiowanie pozostałych plików źródłowych do kontenera
COPY . .

# Sprawdzenie wersji npm i vite (pomaga zweryfikować dostępność npm i vite)
RUN npm --version
RUN npx vite --version

# Uruchomienie kompilacji TypeScript
RUN echo "Uruchamianie kompilacji..." && npm run build

# Ustawienie portu 5000 (zdefiniowanego w backendzie)
EXPOSE 5000

# Uruchomienie aplikacji
CMD ["npm", "start"]
